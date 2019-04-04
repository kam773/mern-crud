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
            imageUrl: ''
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    handlePictureUpload = (file) => {
        axios.get('http://localhost:5000/api/students/uploads')
            .then(res => {
                let formData = new FormData();
                formData.append("signature", res.data.payload.signature)
                formData.append("api_key", process.env.API_KEY);
                formData.append("timestamp", res.data.payload.timestamp)
                formData.append("file", file[0]);
                console.log(res);
                fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData
                }).then((response) => {
                    this.setState({
                        imageUrl: response.data.secure_url
                    })
                })

            }).catch(err => console.log('Get credentials Error---------', err));
    }
    handleSubmit = e => {
        e.preventDefault();
        let newStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            hobby: this.state.hobby,
            imageUrl: this.state.imageUrl

        }
        axios.post('http://localhost:5000/api/students', newStudent)
            .then(res => console.log(res.data));

        this.setState({
            firstName: '',
            lastName: '',
            dob: '',
            hobby: '',
            imageUrl: ''
        })

        this.props.history.push('/');
    }
    render() {
        return (
            <div className={styles.container} >
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
                                    name="imageUrl"
                                    id="photo"
                                    onChange={this.handlePictureUpload}
                                />
                            </div>
                            <div className="col">

                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={this.handleSubmit}>Create Student</button>
                </form>
            </div>
        )
    }
}


