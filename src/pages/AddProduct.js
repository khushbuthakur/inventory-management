import React from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';

function AddProduct() {
    return (
        <React.Fragment>
            <Container fluid="lg">
                <Row className="container-main">
                    <Col>
                        <h3>Add Product</h3>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddProduct;
