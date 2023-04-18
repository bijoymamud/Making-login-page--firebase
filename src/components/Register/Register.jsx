import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import app from '../../firebase/firebase.config';



const auth = getAuth(app);

const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleSubmit = () => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        // create user in firebase

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                // event.target.reset();
                setSuccess('User has created successfully')
                sendverificationEmail(result.user);


            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
                setSuccess('');
            })

    };

    const sendverificationEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert("Please verify your email address")
            })

    }

    const handleEmailChange = (event) => {
        console.log(event.target.value);

    }

    const handlePasswordBlur = (event) => {
        console.log(event.target.value);


    }
    return (
        <div>
            <h3>Please Register</h3>

            <form onSubmit={handleSubmit}>

                <input onBlur={handleEmailChange} type="email" name='email' id='email' placeholder='Your email address' required />

                <br />

                <input onBlur={handlePasswordBlur} type="password" name='password' id='password' placeholder='Enter your password' required />
                <br />

                <input type="submit" value='Register' />

            </form>
            <p><small>Already have an account? Please <Link to="/login">Log in</Link> </small></p>
            <p className="text-danger">{error}</p>
            <p className="text-success">{success}</p>
        </div>
    );
};

export default Register;