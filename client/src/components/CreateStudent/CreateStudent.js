import React, { Component } from 'react'
import axios from 'axios';
import styles from './CreateStudent.module.css';

export default class CreateStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            hobby: '',
            file: null
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    // fileChangeHandler = e => {
    //     this.setState({ file: e.target.files[0] })
    // }
    // uploadHandler = (file) => {
    //     const data = new FormData();
    //     data.append('file', file);

    //     return fetch('http://localhost:5000/api/students', {
    //         mode: 'no-cors',
    //         method: 'POST',
    //         body: data
    //     }).then((response) => {
    //         console.log(response.data);
    //     })
    // }
    handleSubmit = e => {
        e.preventDefault();
        let newStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            hobby: this.state.hobby
        }
        axios.post('http://localhost:5000/api/students', newStudent)
            .then(res => console.log(res.data));

        // this.uploadHandler(this.state.file).then((response) => {
        //     console.log(response.data);
        // })

        this.setState({
            firstName: '',
            lastName: '',
            dob: '',
            hobby: ''
        })

        this.props.history.push('/');
    }
    render() {
        return (
            <div className={styles.container}>
                <h1 className={styles.textCenter}>Create Student</h1>
                <form>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="lastName">First Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="First name"
                                    name="firstName"
                                    id="firstName"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="lastName">Last Name: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Last name"
                                    name="lastName"
                                    id="lastName"
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
                            placeholder="DD/MM/YYYY"
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
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo">Photo: </label>
                        <div className="row">
                            <div className="col">
                                <input
                                    className="form-control-file"
                                    type="file"
                                    name="photo"
                                    id="photo"
                                    onChange={this.fileChangeHandler}
                                />
                            </div>
                            <div className="col">
                                {/* <button onClick={this.uploadHandler}>Upload</button> */}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Create Student</button>
                </form>
            </div>
        )
    }
}


