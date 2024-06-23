// src/App.js

import React, { useState, useEffect } from 'react';
import { Container, Table } from '@mantine/core';
import { processData } from './dataProcessor';

function App() {
  const [yearTable, setYearTable] = useState([]);
  const [cropTable, setCropTable] = useState([]);

  useEffect(() => {
    fetch('/agriculture_data.json')
      .then(response => response.json())
      .then(data => {
        const { yearTable, cropTable } = processData(data);
        setYearTable(yearTable);
        setCropTable(cropTable);
      });
  }, []);

  return (
    <Container>
      <h1>Indian Agriculture Analytics</h1>
      <h2>Yearly Crop Production</h2>
      <Table border={{}}>
        <thead>
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production</th>
            <th>Crop with Minimum Production</th>
          </tr>
        </thead>
        <tbody>
          {yearTable.map(row => (
            <tr key={row.year}>
              <td>{row.year}</td>
              <td>{row.maxCrop}</td>
              <td>{row.minCrop}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h2>Crop Averages (1950-2020)</h2>
      <Table border={{}}>
        <thead>
          <tr>
            <th>Crop</th>
            <th>Average Yield</th>
            <th>Average Cultivation Area</th>
          </tr>
        </thead>
        <tbody>
          {cropTable.map(row => (
            <tr key={row.crop}>
              <td>{row.crop}</td>
              <td>{row.averageYield}</td>
              <td>{row.averageArea}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
