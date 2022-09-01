import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


const DonutChart = ({ data }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);
    return (
        <Doughnut data={data} className='home_chart' />
    )
}

export default DonutChart