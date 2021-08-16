import React from 'react'
import { Container, Row, Button, Col, Table } from 'react-bootstrap';

function ManageEmployee() {
    return (
        <Container className="container-main">  
            <Row className="container-main">
                <Col>
                    <Button variant="primary">Add New Employee</Button>
                </Col>
                <Col><h3>Employee</h3></Col>
            </Row>      
         <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Apple</td>
                        <td>10</td>
                        <td>
                            <Button variant="primary">Edit</Button>{' '}
                            <Button variant="danger">Delete</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
          </Row>
        </Container>
    )
}

export default ManageEmployee;
