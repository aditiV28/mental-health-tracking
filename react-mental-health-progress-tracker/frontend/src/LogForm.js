import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import './LogForm.css';

const LogForm = ({ onNewLog }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        mood_rating: '', 
        anxiety_level: '', 
        sleep_hours: '', 
        sleep_quality: '', 
        sleep_disturbances: '', 
        physical_activity: '', 
        activity_duration: '', 
        social_interactions: '', 
        stress_levels: '', 
        symptoms: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/log', formData)
        .then(response => {
            onNewLog(response.data);
            setFormData({
                date: '',
                mood_rating: '', 
                anxiety_level: '', 
                sleep_hours: '', 
                sleep_quality: '', 
                sleep_disturbances: '', 
                physical_activity: '', 
                activity_duration: '', 
                social_interactions: '', 
                stress_levels: '', 
                symptoms: ''
            });
            setShowModal(true);
        }).catch(error => {
            console.error('There was an error while submitting the data. Please try again', error);
        });
    }

    return (
        <React.Fragment>
        <form className="log_form" onSubmit={handleSubmit}>
            <label for="date" className="form_label">Enter Date:</label>
            <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            className='form_element' 
            required />
            
            <label for="mood_rating" className="form_label">Enter Mood Rating:</label>
            <input 
            type="number" 
            name="mood_rating" 
            value={formData.mood_rating} 
            onChange={handleChange} 
            placeholder="Enter Mood Rating between (1-10)" 
            className='form_element' 
            required />

            <label for="anxiety_level" className="form_label">Enter Anxiety Level:</label>
            <input 
            type="number" 
            name="anxiety_level" 
            value={formData.anxiety_level} 
            onChange={handleChange} 
            placeholder="Enter Anxiety Level between (1-10)" 
            className='form_element' 
            required />

            <label for="sleep_hours" className="form_label">Enter Sleep Hours:</label>
            <input 
            type="number" 
            name="sleep_hours" 
            value={formData.sleep_hours} 
            onChange={handleChange} 
            placeholder="How many hours of sleep did you get?" 
            className='form_element' 
            required />

            <label for="sleep_quality" className="form_label">Enter Sleep Quality:</label>
            <input 
            type="text" 
            name="sleep_quality" 
            value={formData.sleep_quality} 
            onChange={handleChange} 
            placeholder="How was your Sleep Quality?" 
            className='form_element' 
            required />

            <label for="sleep_disturbances" className="form_label">Enter Sleep Disturbances:</label>
            <input 
            type="text" 
            name="sleep_disturbances" 
            value={formData.sleep_disturbances} 
            onChange={handleChange} 
            placeholder="Did you experience any Sleep Disturbances?" 
            className='form_element' 
            required />

            <label for="physical_activity" className="form_label">Enter Physical Activity:</label>
            <input 
            type="text" 
            name="physical_activity" 
            value={formData.physical_activity} 
            onChange={handleChange} 
            placeholder="Did you have any Physical Activity?" 
            className='form_element' 
            required />

            <label for="activity_duration" className="form_label">Enter Activity Duration:</label>
            <input 
            type="number" 
            name="activity_duration" 
            value={formData.activity_duration} 
            onChange={handleChange} 
            placeholder="What was the Activity Duration in (minutes)" 
            className='form_element' 
            required />

            <label for="social_interactions" className="form_label">Enter Social Interactions:</label>
            <input 
            type="number" 
            name="social_interactions" 
            value={formData.social_interactions} 
            onChange={handleChange} 
            placeholder="Enter Social Interactions between (1-10)?" 
            className='form_element' 
            required />

            <label for="stress_level" className="form_label">Enter Stress Level:</label>
            <input 
            type="number"
            name="stress_level" 
            value={formData.stress_level} 
            onChange={handleChange} 
            placeholder="Enter Stress Level between (1-10)" 
            className='form_element' 
            required />

            <label for="symptoms" className="form_label">Enter Symptoms:</label>
            <input 
            type="text" 
            name="symptoms" 
            value={formData.symptoms} 
            onChange={handleChange} 
            placeholder="Enter your current Symptoms" 
            className='form_element' 
            required />

            <Button variant="primary" type="submit">Submit</Button>
        </form>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Log submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>Your log has been submitted successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}

export default LogForm;
