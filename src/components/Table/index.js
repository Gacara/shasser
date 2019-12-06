import React from 'react';
import { Table } from 'react-bootstrap';

const Proba = () => (
  <Table className="custom-table" striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>Rencontres</th>
        <th>Sans Chroma</th>
        <th>Avec Chroma</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>1/4096</td>
        <td>1/1365</td>
      </tr>
      <tr>
        <td>20</td>
        <td>1/2048</td>
        <td>1/1024</td>
      </tr>
      <tr>
        <td>50</td>
        <td>1/1365</td>
        <td>1/819</td>
      </tr>
      <tr>
        <td>100</td>
        <td>1/1024</td>
        <td>1/682</td>
      </tr>
      <tr>
        <td>200</td>
        <td>1/819</td>
        <td>1/585</td>
      </tr>
      <tr>
        <td>500</td>
        <td>1/682</td>
        <td>1/512</td>
      </tr>
    </tbody>
  </Table>
);
export default Proba;

  



