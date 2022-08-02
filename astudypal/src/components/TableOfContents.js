import SearchBar from './service-components/SearchBar';
import { useAuth } from '../context/AuthContext';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from "react-router-dom";
import { Form } from 'react-bootstrap';

export default function TableOfContents() {
    const { logout } = useAuth();
    const [searchResult, setSearchResult] = useState([]);
    const searchTitle = useRef();
    const classList = ["Math", "Science", "History", "Foreign Languages", "English", "Student Resources"];

    function handleSearch(e) {
        e.preventDefault();

        let suggestions = [];
        let temp = [];
        temp = classList.filter((data) => {
            return data.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase());
        });

        if (e.target.value !== "") {
            temp.forEach(element => {
                suggestions.push(element);
            });
        }

        return setSearchResult(suggestions);
    }

    async function awakeServer() {
        return await fetch("http://localhost:8080/");
    }

    useEffect(() => {
        return awakeServer();
    }, [])

    return (
        <div className="table-of-contents-div">
            <nav>
                <h1>Table Of Contents</h1>
                <li><Link to="/table-of-contents/math-class" className="class-link">Math</Link></li>
                <li><Link to="/table-of-contents/science-class" className="class-link">Science</Link></li>
                <li><Link to="/table-of-contents/history-class" className="class-link">History</Link></li>
                <li><Link to="/table-of-contents/english-class" className="class-link">English</Link></li>
                <li><Link to="/table-of-contents/foreign-languages-class" className="class-link">Foreign Languages</Link></li>
                <li><Link to="/table-of-contents/student-resources" className="class-link">Student Resources</Link></li>
                <li><button onClick={logout}>Logout</button></li>
            </nav>
            <div className="table-of-contents-body">
                <Form>
                    <Form.Group>
                        <Form.Control type="text" className="table-of-contents-form-control" ref={searchTitle} onChange={(e) => {
                            handleSearch(e);
                        }}/>
                        {searchResult.length > 0 && <SearchBar result={searchResult}/>}
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
