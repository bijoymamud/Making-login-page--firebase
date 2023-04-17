import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';



const auth = getAuth(app);

const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');



    const handleSubmit = () => {
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        console.log(email, password);

        // create user in firebase

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);
                setError('');
                event.target.reset;
                setSuccess('User has created successfully')


            })
            .catch(error => {
                console.error(error.message);
                setError(error.message);
                setSuccess('');
            })

    };

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
            <p className="text-danger">{error}</p>
            <p className="text-success">{success}</p>
        </div>
    );
};

export default Register;