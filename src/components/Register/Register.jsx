import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from 'react';
import app from '../../firebase/firebase.config';



const auth = getAuth(app);

const Register = () => {

    const [email, setEmail] = useState('');



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

            })
            .catch(error => {
                console.log("Error", error.message);
            })

    };

    const handleEmailChange = (event) => {
        console.log(event.target.value);
        setEmail(event.target.value);
    }

    const handlePasswordBlur = (event) => {
        console.log(event.target.value);


    }
    return (
        <div>
            <h3>Please Register</h3>

            <form onSubmit={handleSubmit}>

                <input onBlur={handleEmailChange} type="email" name='email' id='email' placeholder='Your email address' />

                <br />

                <input onBlur={handlePasswordBlur} type="password" name='password' id='password' placeholder='Enter your password' />
                <br />

                <input type="submit" value='Register' />

            </form>
        </div>
    );
};

export default Register;