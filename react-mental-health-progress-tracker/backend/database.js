const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE mental_health_status_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT,
        mood_rating INTEGER,
        anxiety_level INTEGER,
        sleep_hours REAL,
        sleep_quality TEXT,
        sleep_disturbances TEXT,
        physical_activity TEXT,
        activity_duration REAL,
        social_interactions INTEGER,
        stress_levels INTEGER,
        symptoms TEXT
    )`)
});

module.exports = db;