import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.config';

const auth = getAuth(app)

const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();


    const handleLogin = (event) => {

        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        //Validation

        setError('');
        setSuccess('');

        if (!/(?=.*[A-Z].*[A-Z]) /.test(password)) {

            setError("Please use at least two uppercase")
            return;

        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError("Please use a special case letter")
            return;
        }

        else if (password.length < 6) {
            setError("Password must be 6 characters long ");
            return
        }

        signInWithEmailAndPassword(auth, password, email)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                if (!loggedUser.emailVerified) {
                    alert('You did not verify your email')
                };
                setSuccess('User Login successfully');
                setError('')

            })
            .catch(error => {
                setError(error.message);
            })



    }

    const handleResetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            alert('Please provide your email address')

        }
        sendPasswordResetEmail(auth, email)
            .then(result => {
                alert('Please check your email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    return (
        <div className='w-25 mx-auto mt-5' >
            <h3>This is login</h3>

            <form onSubmit={handleLogin}>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="text" className="form-control" ref={emailRef} name='email' id="username" placeholder="Enter email" required />
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name='password' id="password" placeholder="Enter password" required />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label mb-2" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p><small>New to this website? Please <Link to="/register"
                >Register</Link></small></p>
                <p className='text-danger'>{error}</p>
                <p className='text-success'>{success}</p>
            </form>
            <p><small>Forget Password? Please <button onClick={handleResetPassword} className='btn btn-primary'>Reset Password</button></small></p>
        </div>
    );
};

export default Login;