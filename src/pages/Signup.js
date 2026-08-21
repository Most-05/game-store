import React, { useState } from 'react';
import { Form, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './singup.module.css';  // นำเข้าไฟล์ CSS Module

export default function SignUp() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();  

    const onSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doSignUp();
        }
        setValidated(true);
    };

    const doSignUp = async () => {
        try {
            const response = await fetch("http://localhost:8082/add_user", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: username,
                    user_pwd: password,
                    first_name: firstname,
                    last_name: lastname,
                    email: email,
                }),
            });

            const data = await response.json();
            if (data.message === "User added successfully") {
                alert("Sign Up successful");
                navigate("/");  // Navigate back to login page after successful sign-up
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            alert("Error during signup. Please try again.");
        }
    };

    return (
        <div className={styles.signupbody1}>
            <div className={`${styles.main} container m-auto`}>
            <div className={styles.signup}>
                <Form noValidate validated={validated} onSubmit={onSubmit}>
                    <Row>
                        <Form.Group controlId="username">
                            <Form.Label className={styles.label}>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.input}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group controlId="password">
                            <Form.Label className={styles.label}>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group controlId="firstname">
                            <Form.Label className={styles.label}>First Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter first name"
                                onChange={(e) => setFirstname(e.target.value)}
                                className={styles.input}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group controlId="lastname">
                            <Form.Label className={styles.label}>Last Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter last name"
                                onChange={(e) => setLastname(e.target.value)}
                                className={styles.input}
                            />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group controlId="email">
                            <Form.Label className={styles.label}>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit" className={styles.button}>
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
        </div>
        
    );
}
