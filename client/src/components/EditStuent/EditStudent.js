import React, { Component } from 'react'
import axios from 'axios'
import styles from './EditStudent.module.css'

export default class EditStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            hobby: ''
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/students/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    dob: response.data.dob,
                    hobby: response.data.hobby
                });
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })

    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    handleSubmit = e => {
        e.preventDefault();
        let updatedStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            hobby: this.state.hobby
        };
        axios.put('http://localhost:5000/api/students/' + this.props.match.params.id, updatedStudent)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div className={styles.container}>
                <h3 className={styles.textCenter}>Update Student</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="lastName">First Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    id="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="lastName">Last Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    id="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of birth: </label>
                        <input
                            className="form-control"
                            type="text"
                            name="dob"
                            id="dob"
                            value={this.state.dob}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hobby">Hobby: </label>
                        <textarea
                            className="form-control"
                            type="text"
                            name="hobby"
                            id="hobby"
                            value={this.state.hobby}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo: </label>
                        <input
                            className="form-control-file"
                            type="file"
                            name="photo"
                            id="photo"
                            onChange={this.fileSelectedHandler}
                        />
                    </div>
                    <input type="submit"
                        value="Update Student"
                        className="btn btn-primary" />
                </form>
            </div>
        )
    }
}
