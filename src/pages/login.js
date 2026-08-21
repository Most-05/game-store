import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';  // Import CSS module for login styles

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate();

    const onLogin = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            doLogin();
        }
        setValidated(true);
    };

    const doLogin = async () => {
        try {
            const data1 = await getAuthenToken();
            const authToken = data1.data.auth_token;
            const data2 = await getAcessToken(authToken);

            // Save data to localStorage
            localStorage.setItem("access_token", data2.data.access_token);
            localStorage.setItem("user_id", data2.data.account_info.user_id);
            localStorage.setItem("user_name", data2.data.account_info.user_name);
            localStorage.setItem("first_name", data2.data.account_info.first_name);
            localStorage.setItem("last_name", data2.data.account_info.last_name);
            localStorage.setItem("email", data2.data.account_info.email);
            localStorage.setItem("role_id", data2.data.account_info.role_id);
            localStorage.setItem("role_name", data2.data.account_info.role_name);

            // Navigate to the home page
            navigate("/home", { replace: false });
        } catch (error) {
            setErrorMessage("Login failed. Please try again.");
        }
    };

    const getAuthenToken = async () => {
        const response = await fetch("http://localhost:8082/api/authen_request", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
            }),
        });
        const data = await response.json();
        return data;
    };

    const getAcessToken = async (authToken) => {
        var baseString = username + "&" + password;
        const response = await fetch("http://localhost:8082/api/access_request", {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                auth_token: authToken,
                auth_signature: baseString,
            }),
        });
        const data = await response.json();
        return data;
    };

    return (
        <div className={styles.loginBody}>
            <div className={styles.loginMain}>
                <Form noValidate validated={validated} onSubmit={onLogin}>
                    <Row>
                        <Form.Group controlId="username">
                            <Form.Label className={styles.loginLabel}>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.loginInput} // Using the CSS Module class
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group controlId="password">
                            <Form.Label className={styles.loginLabel}>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.loginInput} // Using the CSS Module class
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a password.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <Button variant="primary" type="submit" className={`${styles.loginButton} ${styles.loginPrimaryButton} w-100`}>
                        Login
                    </Button>

                    <Button variant="secondary" className={`${styles.loginButton} ${styles.loginSecondaryButton} w-100 mt-3`} onClick={() => navigate('/signup')}>
                        Sign up
                    </Button>
                </Form>
            </div>
        </div>
    );
}
