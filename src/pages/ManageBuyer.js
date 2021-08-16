import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Container, Row, Button, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLS } from '../routes';
import displayToast from '../utils/displayToast';

function ManageBuyer() {
    const [buyers, setBuyers] = useState([]);

    useEffect(() => {
        let isActive = true;

        if(isActive){
            fetchBuyers();
        }
        return () => {
            isActive = false;
        }
    }, []);

    const fetchBuyers = async () => {
        const url = URLS.GET_ALL_BUYERS;
        debugger;
        axios.get(url)
              .then(function (response) {
                  debugger;
                console.log(response);
                setBuyers(response.data);
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
                    <Link to="/add-buyer">
                        <Button variant="primary">Add New Buyer</Button>
                    </Link>
                </Col>
                <Col><h3>Buyer</h3></Col>
            </Row>      
         <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sr. No.</th>
                        <th>Owner Name</th>
                        <th>Company Name</th>
                        <th>Zipcode</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                {buyers.map((buyer, index) => {
                    const {id, ownerName, companyName, zipcode} = buyer;

                    return (<tr key={id}>
                        <td>{index+1}</td>
                        <td>{ownerName}</td>
                        <td>{companyName}</td>
                        <td>{zipcode}</td>
                        <td>
                            <Link to={`/edit-buyer/?id=${id}`}><Button variant="primary">Edit</Button>{' '}</Link>
                            <Button variant="danger">Delete</Button>
                        </td>
                    </tr>);
                })}
                    
                </tbody>
            </Table>
          </Row>
        </Container>
    )
}

export default ManageBuyer;
