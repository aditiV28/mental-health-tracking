import React from 'react';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LogChart = ({logs}) => {
    const dates = logs.map(log => log.date);
    const moodRatings = logs.map(log => log.mood_rating);
    const anxietyLevels = logs.map(log => log.anxiety_level);
    const sleepHours = logs.map(log => log.sleep_hours);

    const data = {
        labels: dates,
        datasets: [
           {
                label: 'Mood Rating',
                data: moodRatings,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Anxiety Levels',
                data: anxietyLevels,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Sleep Hours',
                data: sleepHours,
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
                fill: false
            },
        ]
    };

    return <Line data={data}></Line>
}

export default LogChart;
