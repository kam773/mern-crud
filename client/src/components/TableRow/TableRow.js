import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TableRow extends Component {
    onDeleteClick = () => {
        axios.delete('http://localhost:5000/api/students/' + this.props.student._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <tr>
                <td>
                    {this.props.student.firstName}
                </td>
                <td>
                    {this.props.student.lastName}
                </td>
                <td>
                    {this.props.student.dob}
                </td>
                <td>
                    {this.props.student.hobby}
                </td>
                <th colSpan="2">
                    <img src={`https://via.placeholder.com/40/40`} alt="Avatar" />
                </th>
                <td>
                    <Link to={"/edit/" + this.props.student._id} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button onClick={this.onDeleteClick} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        )
    }
}
