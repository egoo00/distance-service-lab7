import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';

function App() {
  const [distances, setDistances] = useState([]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [newDistance, setNewDistance] = useState('');

  useEffect(() => {
    fetchDistances();
  }, []);

  const fetchDistances = async () => {
    const response = await axios.get('/api/distance', { params: { from: 'Minsk', to: 'Warsaw' } });
    setDistances([response.data]);
  };

  const addDistance = async () => {
    const response = await axios.post('/api/distance', null, { params: { from, to } });
    setDistances([...distances, response.data]);
    setFrom(''); setTo('');
  };

  const deleteDistance = async (from, to) => {
    await axios.delete('/api/distance', { params: { from, to } });
    setDistances(distances.filter(d => d.from !== from || d.to !== to));
  };

  const updateDistance = async (from, to) => {
    const response = await axios.put('/api/distance', null, { params: { from, to, newDistance } });
    setDistances(distances.map(d => d.from === from && d.to === to ? response.data : d));
    setNewDistance('');
  };

  return (
      <Container className="mt-4">
        <h1>Distance Calculator</h1>
        <Row className="mb-3">
          <Col>
            <Form.Control placeholder="From" value={from} onChange={e => setFrom(e.target.value)} />
          </Col>
          <Col>
            <Form.Control placeholder="To" value={to} onChange={e => setTo(e.target.value)} />
          </Col>
          <Col>
            <Button onClick={addDistance}>Add Distance</Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Distance (km)</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {distances.map((d, i) => (
              <tr key={i}>
                <td>{d.from}</td>
                <td>{d.to}</td>
                <td>
                  <Form.Control
                      value={newDistance || d.distance}
                      onChange={e => setNewDistance(e.target.value)}
                  />
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteDistance(d.from, d.to)}>Delete</Button>
                  <Button variant="warning" onClick={() => updateDistance(d.from, d.to)}>Update</Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>
      </Container>
  );
}

export default App;