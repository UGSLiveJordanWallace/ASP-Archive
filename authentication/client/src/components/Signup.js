import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Card, Form, Button, Alert } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export default function Signup() {
  const emailRef = useRef();
  const classRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [logged, setLogged] = useState("");
  const [loading, setLoading] = useState(false);
  
  const firebase_config = {
    apiKey: "AIzaSyArCz_1AfGkI5mAxpOwcjPg7jb3i-TlE6s",
    authDomain: "authorize-class.firebaseapp.com",
    projectId: "authorize-class",
    storageBucket: "authorize-class.appspot.com",
    messagingSenderId: "1058705439988",
    appId: "1:1058705439988:web:3e0ad725691a40916732a1",
    measurementId: "G-FG58QXTD3Z"
  };
  const app = initializeApp(firebase_config);
  const db = getFirestore();
  
  async function handleSignup(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    if (passwordRef.current.value.length <= 6) {
      return setError("Password is too short!");
    }
    
    try {
      setError("");
      setLogged("");
      setLoading(true);
      
      const docRef = await addDoc(collection(db, "users"), {
        email: emailRef.current.value,
        classVerification: classRef.current.value,
        username: usernameRef.current.value
      });

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
      
    } catch (e) {
      setLogged("");
      return setError("Failed to create an account " + e);
    }
    

    setLoading(false);
    return setLogged("Successfully signed up");
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="text-center">Signup</h1>
          {error && <Alert variant="danger" className="text-center">{error}</Alert>}
          {logged && <Alert variant="success" className="text-center">{logged}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" ref={usernameRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Class: </Form.Label>
              <Form.Control as="select" ref={classRef}>
                <option>student</option>
                <option>teacher</option>
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordRef} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">Signup</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
