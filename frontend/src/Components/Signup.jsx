import React, { useState } from "react";
import './Signup.css';
import {useNavigate} from "react-router-dom";


export default function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })

        const data = await response.json();

        if (data.message === "Signup Successful") {
            alert("Sign Up Successfully");
            navigate("/login");
        } else {
            alert("Invalid " + data.message);
        }


    }

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <td>
                                <input type="text" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>Password</th>
                            <td>
                                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                            </td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>
                                <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button type="submit" className="signup-btn" >Sign Up</button>
            </form>
        </div>
    );
}
