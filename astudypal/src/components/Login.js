import { Form, Button, Alert } from "react-bootstrap";
import { useAuth } from '../context/AuthContext';
import React, { useRef, useState } from 'react';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const { currentUser } = useAuth();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setSuccess("");
            await login(emailRef.current.value, passwordRef.current.value);
            setSuccess("You are loggin in 👏!!");
        } catch (e) {
            setError("Failed To Login, Your Account Doesn't Exist Or You Have The Wrong Password Email Combination.");
        }
    }

    return (
        <div className="login-div">
            <h1>Login</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" ref={emailRef}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password *</Form.Label>
                    <Form.Control type="password" ref={passwordRef}/>
                </Form.Group>
                <br />
                <Button type="submit" className="w-100" disabled={loading}>{loading ? "Submitting" : "Submit"}</Button>
            </Form>
        </div>
    )
}
