import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">STUDENT MANAGER</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Students</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Create Student</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
