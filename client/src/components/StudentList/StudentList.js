import React, { Component } from 'react'
import TableRow from '../TableRow/TableRow'
import axios from 'axios'
import styles from './StudentList.module.css'

export default class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: []
        };
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/students/')
            .then(response => {
                this.setState({ students: response.data });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    componentDidUpdate() {
        axios.get('http://localhost:5000/api/students/')
            .then(response => {
                this.setState({ students: response.data });
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    tabRow() {
        return this.state.students.map(function (data, i) {
            return <TableRow student={data} key={i} />;
        });
    }
    render() {
        if (!this.state.students.length) {
            return (
                <div className={styles.empty}>
                    <h1>List is Empty</h1>
                </div>
            )
        } else {
            return (
                <div>
                    <h3 className={styles.header}>List of Students</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date of Birth</th>
                                <th>Hobby</th>
                                <th>Photo</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tabRow()}
                        </tbody>
                    </table>
                </div >
            )
        }

    }
}
