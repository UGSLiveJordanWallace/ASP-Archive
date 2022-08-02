import { Link } from 'react-router-dom';
import React from 'react';

export default function WelcomePage() {
    return (
        <div className="welcome-page-div">
            <h1>AStudyPal</h1>
            <span className="main-device">
                <Link to="/asp-login-authentication">
                    Login
                </Link>
                <a href="https://asp-signup.netlify.app" target="__blank">
                    Signup
                </a>
            </span>
            <div className="copyright-logo">
                <p>&copy; Created By Jordan Wallace</p>
            </div>
        </div>
    )
}
