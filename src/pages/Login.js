import React, {useReducer} from 'react'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import '../styles/Login.scss';

const initialState = {
    userName: '',
    password: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_NAME':
            return {
                ...initialState,
                userName: action.userName
            };

        case 'USER_PASSWORD':
            return {
                ...initialState,
                password: action.password
            };
        default:
            return state;
    }
};

function Login() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleUserNameChange = (event) => {
        dispatch({
            type: 'USER_NAME',
            userName: event.target.value
        });
    };

    const handlePasswordChange = (event) => {
        dispatch({
            type: 'USER_PASSWORD',
            userName: event.target.value
        });
    };

    const{userName, password} = state;

    const submitForm = () =>{
        if (userName.length > 0 && password.length > 0) {
            console.log('Login Successful!');
        }
    }    

    return (
        <Container className="login-bg">
            <Row>
                <Col md={{span : 8, offset : 2}}>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" controlId="formBasicUserName">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control 
                                value={userName} 
                                onChange={handleUserNameChange}
                                type="text" placeholder="Enter user name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                value={password} 
                                type="password" 
                                placeholder="Password"
                                onChange={handlePasswordChange} 
                                />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
