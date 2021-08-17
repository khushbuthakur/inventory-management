import React, {useReducer, useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Card, Button, FloatingLabel, Table } from 'react-bootstrap';
import { URLS } from '../../routes';
import displayToast from '../../utils/displayToast';
import { validateInputField } from '../../utils/validations';
import { useHistory, useLocation } from 'react-router';

const initialState = {
    selectedProducts : [],
    paymentDate: '',
    price : 0,
    id : -1,
    buyerId : null,
};

const reducer = (state, action) =>{
    switch(action.type){
        case 'ADD_PRODUCT':
            return{
                ...state,
                selectedProducts : [...state.selectedProducts, action.product]
            }

        case 'DELETE_PRODUCT':
            return {
                ...state,
                selectedProducts : state.selectedProducts.filter(p => p.id !== action.product.id)
            }    

        case 'RESET':
            return initialState;    

            default:
                return state;
    }
}

function AddPurchaseOrder() {

    const [productList, setProductList] = useState([]);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [buyers, setBuyers] = useState([]);
    const [currentBuyer, setCurrentBuyer] = useState(null);
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const {selectedProducts} = state;

    const fetchProducts = async () => {
        const url = URLS.GET_ALL_PRODUCTS;
        axios.get(url)
              .then(function (response) {
                setProductList(response.data);
                fetchBuyers();
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    const fetchBuyers = async () => {
        const url = URLS.GET_ALL_BUYERS;
        axios.get(url)
              .then(function (response) {
                // console.log(response);
                setBuyers(response.data);
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "error", msg : "Oops! Something went wrong"});
              });
    }

    useEffect(() => {
        let isActive = true;

        if(isActive){
            fetchProducts();
        }

        return () => {
            isActive = false;
        }
    }, []);
    

    const handleProductChangne = (e) =>{
        setCurrentProduct(e.target.value);
    }

    const addProduct = (e) =>{
        e.preventDefault();
        if(currentProduct){
            if(selectedProducts.findIndex(p => p.id == currentProduct) === -1){
                const product = productList.find(i => i.id == currentProduct);
                dispatch({type: 'ADD_PRODUCT', product});
            }else{
                displayToast({type : "error", msg : "Product already added in list!"});
            }
        }else{
            displayToast({type : "error", msg : "Please select a product!"});
        }
    }

    const deleteProduct = (p) =>{
        dispatch({type: 'DELETE_PRODUCT', p});
    }

    const handleQuantityChange = (e, product) =>{
        const quantity = e.target.value;
        const productList = selectedProducts.map(i => {

            if(i.id == product.id){
                return {...i, selectedQuantity : quantity};
            }
            return i;
        });
        dispatch({type: 'UPDATE_QUANTITY', productList});
    }

    const handleBuyerChangne = (e) =>{
        setCurrentBuyer(e.target.value);
    }

    return (
        <React.Fragment>
            <Container fluid="lg">
                <Row className="container-main">
                    <Col lg={6}>
                        <h3 className="center-align">Add Purchase Order</h3>
                    </Col>
                </Row>
                
                <Row className="container-main">
                    <Col md={{span : 10, offset : 1}}>
                        <Card>
                            <Card.Body>
                                <Form onSubmit={addProduct}>
                                
                            <Row>
                                <Col lg={6}>
                                        <FloatingLabel controlId="floatingSelect" label="Seelct Buyer">
                                                <Form.Select aria-label="Buyer List" onChange={handleBuyerChangne}>
                                                <option value="" selected disabled>Select a Buyer</option>
                                                    {buyers.map(b =>{
                                                        return <option key={b.id} value={b.id}>{b.companyName} - {b.ownerName}</option>
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                    <Col lg={5}>
                                        <FloatingLabel controlId="floatingSelect" label="Seelct Products">
                                            <Form.Select aria-label="Product List" onChange={handleProductChangne}>
                                            <option value="" selected disabled>Select a Product</option>
                                                {productList.map(product =>{
                                                    return <option key={product.id} value={product.id}>{product.productName}</option>
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col lg={1}>
                                        <Button variant="primary" type="submit">Add</Button>
                                    </Col>

                                    
                                </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                            <br/>
            <Card>
                <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sr. No.</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Available Quantity</th>
                                    <th>Quantity</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {selectedProducts.map((product, index) => {
                                    const {id, productName, quantity, price = 0, selectedQuantity = 0} = product;

                                    return (<tr key={id}>
                                        <td>{index+1}</td>
                                        <td>{productName}</td>
                                        <td>{price}</td>
                                        <td>{quantity}</td>
                                        <th>
                                            <Form.Group className="mb-3" controlId="formBasicQuantity">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control type="number" value={selectedQuantity} 
                                                    onChange={(e)=>handleQuantityChange(e, product)} placeholder="Enter Quantity" />
                                            </Form.Group>
                                        </th>
                                        <td>
                                            <Button onClick={()=>deleteProduct(product)} variant="danger">Delete</Button>
                                        </td>
                                    </tr>);
                                })}             
                                </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddPurchaseOrder
