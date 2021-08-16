import React, {useReducer} from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import '../styles/Login.scss';
import displayToast from '../utils/displayToast';
import { validateInputField } from '../utils/validations';
import axios from 'axios';
import { URLS } from '../routes';

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

    const submitForm = (e) =>{
        e.preventDefault();
        
        if (validateInputField({field : userName, fieldName : "user name"}) && 
            validateInputField({field : password, fieldName : "password"})) {
            const body = {userName, password};

            axios.post(URLS.VERIFY_USER, body)
              .then(function (response) {
                console.log(response);
                displayToast({type : "success", msg : "Login Successful!"});
              })
              .catch(function (error) {
                console.log(error);
                displayToast({type : "success", msg : "Login Successful!"});
              });

        }else{
           // displayToast({type : "error", msg : "Login Failed!"});
        }
    }    

    return (
        <div className="login-bg">
            <Row className="login--row">
                <Col md={{span : 8, offset : 2}}>
                    <h3>Login</h3>
                    <br/>
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
        </div>
    );
}

export default Login;
