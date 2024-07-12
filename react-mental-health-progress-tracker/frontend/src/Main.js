import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogForm from './LogForm';
import LogChart from './LogChart';
import { Alert, Modal, Button } from 'react-bootstrap';

import './Main.css';

const Main = () => {
    const [logs, setLogs] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchLogs = async () => {
            try{
                const response = await axios.get('http://localhost:5000/api/logs', { withCredentials: true});
                setLogs(response.data);
            }catch(error){
                console.error('Error in fetching logs. Please try again', error);
            }
        }
        
        fetchLogs();

        const socket = new WebSocket('ws://localhost:5000');

        socket.onmessage = (event) => {
            const newLog = JSON.parse(event.data);
            setLogs((prevLogs) => [...prevLogs, newLog])
        };

        return () => socket.close();
    }, [])

    return (
        <div className="main_container">
            <h4>Mental Health Tracking Log</h4>
            <LogForm onNewLog={(newLog) => setLogs([...logs, newLog])} />
            <LogChart logs={logs} />
            <Alert variant="info">
                If you are facing mental health crisis, please contact a mental health professional or call the crisis hotline.
            </Alert>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Welcome to Mental Health Tracker</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Welcome! This tool helps you to track and log your mental health. Kindly fill out the daily log to monitor your progress.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowModal(false)}>Let's get started!</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Main;