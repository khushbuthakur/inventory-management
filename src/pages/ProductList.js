import React from 'react'
import {Table} from 'react-bootstrap';
import { Container, Row, Button } from 'react-bootstrap';

function ProductList() {
    return (
        <Container>
            <Row>
                <h3>Products</h3>
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

export default ProductList;
