const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
require('dotenv').config();
require('./passport');
const WebSocket = require('ws');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

const database = new sqlite3.Database(path.join(__dirname, 'data', 'database.sqlite'), (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json());

app.use(expressSession({
    name: 'session',
    secret: [process.env.SESSION_SECRET],
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      }
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email']})
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('http://localhost:3000');
    }
);

const ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        req.next();
    }
    res.status(401).json({error: 'User is unauthorized'});
}

app.get('/api/current_user', (req,res) => {
    res.send(req.user);
});

app.get('/api/logout', (req, res) => {
    req.logout();
    res.send({ success: true });
  });

app.post('/api/log', (req, res) => {
    const { date, 
        mood_rating, 
        anxiety_level, 
        sleep_hours, 
        sleep_quality, 
        sleep_disturbances, 
        physical_activity, 
        activity_duration, 
        social_interactions, 
        stress_levels, 
        symptoms } = req.body;
        
        const statement = db.prepare(`INSERT INTO mental_health_status_log (
            date, 
            mood_rating, 
            anxiety_level, 
            sleep_hours, 
            sleep_quality, 
            sleep_disturbances, 
            physical_activity, 
            activity_duration, 
            social_interactions, 
            stress_levels, 
            symptoms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        
        statement.run(
            date, 
            mood_rating, 
            anxiety_level, 
            sleep_hours, 
            sleep_quality, 
            sleep_disturbances, 
            physical_activity, 
            activity_duration, 
            social_interactions, 
            stress_levels, 
            symptoms, function(err){
                if(err)
                    return res.status(500).json({error: err.message});

                const log = {id: this.lastID, ...req.body}
                broadcastNewLog(log);

                res.status(200).json(log);
            });
        statement.finalize();
});

app.get('/api/logs', (req, res) => {
    db.all('SELECT * FROM mental_health_status_log', (err, rows) => {
        if(err)
            return res.status(500).json({error: err.message});

        res.json(rows);
    });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on PORT ${PORT}`);
})

const web_socket_server = new WebSocket.Server({ server });

function broadcastNewLog(log){
    web_socket_server.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN)
            client.send(JSON.stringify(log));
    });
}