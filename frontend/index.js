import React from 'react';
import ReactDOM from 'react-dom';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import Chart3 from './components/Chart3';

const root1 = document.getElementById('react-chart1');
if (root1) {
    ReactDOM.render(<Chart1 />, root1);
}

const root2 = document.getElementById('react-chart2');
if (root2) {
    ReactDOM.render(<Chart2 />, root2);
}

const root3 = document.getElementById('react-chart3');
if (root3) {
    ReactDOM.render(<Chart3 />, root3);
}
