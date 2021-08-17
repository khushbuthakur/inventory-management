import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Container, Row, Button, Col, Table, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLS } from '../../routes';
import displayToast from '../../utils/displayToast';

function ManagePurchaseOrder() {
    const [pos, setPos] = useState([]);
    const [currentPo, setCurrentPo] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setCurrentPo(null);
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        let isActive = true;

        if(isActive){
            fetchPos();
        }
        return () => {
            isActive = false;
        }
    }, []);

    const fetchPos = async () => {
        const url = URLS.GET_ALL_PURCHASE_ORDERS;
        axios.get(url)
              .then(function (response) {
                console.log(response);
                debugger;
                setPos(response.data);
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    const deletePoConfirmation = (b) =>{
        setCurrentPo(b);
        handleShow();
    }

    const deletePurchaseOrder = async () => {
        const url = URLS.DELETE_PURCHASE_ORDER + currentPo.id;
        // const data = {
        //     id : currentBuyer.id
        // };
        axios.delete(url)
              .then(function (response) {
                handleClose();
                // console.log(response);
                displayToast({type : "success", msg : "Purchase Order deleted successfully!"});
                fetchPos();
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    return (
        <Container className="container-main">  
            <Row className="container-main">
                <Col>
                    <Link to="/add-purchase-order">
                        <Button variant="primary">Add Purchase Order</Button>
                    </Link>
                </Col>
                <Col><h3>Purchase Order</h3></Col>
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
                    {pos.map((item, index) => {
                        const {id, products, paymentDueDate, paid, invoice, buyer, totalAmount} = item;
                        const {companyName} = buyer;

                        return (<tr key={id}>
                            <td>{index+1}</td>
                            <td>{companyName}</td>
                            <td>{products.length}</td>
                            <td>{totalAmount}</td>
                            <td>{paymentDueDate}</td>
                            <td>{paid ? 'Paid' : "Unpaid"}</td>
                            <td>
                                <Link to={`/edit-purchase-order/?id=${id}`}><Button variant="primary">Edit</Button>{' '}</Link>
                                <Button onClick={()=>deletePoConfirmation(item)} variant="danger">Delete</Button>
                            </td>
                        </tr>);
                    })}
                </tbody>
            </Table>
          </Row>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this Purchase Order?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="danger" onClick={deletePurchaseOrder}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    )
}

export default ManagePurchaseOrder;
