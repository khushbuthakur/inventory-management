
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Container, Row, Button, Col, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLS } from '../../routes';
import displayToast from '../../utils/displayToast';
function ManageInvoice() {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        let isActive = true;

        if(isActive){
            fetchInvoices();
        }
        return () => {
            isActive = false;
        }
    }, []);

    const fetchInvoices = async () => {
        const url = URLS.GET_ALL_INVOICE;
        axios.get(url)
              .then(function (response) {
                // console.log(response);
                setInvoices(response.data);
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    return (
        <Container className="container-main">  
            <Row className="container-main">
                <Col><h3>Buyers Invoices</h3></Col>
            </Row>      
         <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Company Name</th>
                        <th>Total Products</th>
                        <th>Total Price</th>
                        <th>Payment Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((item, index) => {
                        const {id, products, paymentDueDate, paid, invoice, buyer = {}, totalAmount} = item;
                        let {companyName = ""} = buyer;

                        return (<tr key={id}>
                            <td>{index+1}</td>
                            <td>{companyName}</td>
                            <td>{products.length}</td>
                            <td>{totalAmount}</td>
                            <td>{paymentDueDate}</td>
                        </tr>);
                    })}
                </tbody>
            </Table>
          </Row>
          </Container>
    )
}

export default ManageInvoice
