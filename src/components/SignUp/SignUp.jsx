import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [sucess, setSucess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photo = e.target.photourl.value
        const terms = e.target.terms.checked
        console.log(email, password, name, photo, terms)

        // Reset error message
        setErrorMessage('');
        setSucess(false);

        if (!terms) {
            setErrorMessage('Please accept our terms and conditions')
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password at least 6 character or longer');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At least one Upper case, one lower case, one number, one special character.')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setSucess(true);

                // send verification email address
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log("verification email sent")
                    })
                // Update a user's profile
                const profile = {
                    displayName : name,
                    photoURL : photo
                }
                updateProfile(auth.currentUser, profile)
                .then(() => {
                    console.log('user profile updated')
                })
                .catch(error => console.log('user profile update error'))
            })
            .catch(error => {
                console.log('ERRRO', error.message)
                setErrorMessage(error.message)
                setSucess(false);
            })

    }

    return (

        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl mt-8">
            <h1 className="text-3xl text-center font-bold">Sign Up</h1>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name='name' placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" name='photourl' placeholder="photo url" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder="password"
                        className="input input-bordered" required />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setShowPassword(!showPassword)
                        }}
                        className='btn btn-xs absolute right-2 top-12'>
                        {
                            showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                        }
                    </button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="cursor-pointer label justify-start gap-3">
                        <input type="checkbox" name='terms' className="checkbox checkbox-info" />
                        <span className="label-text">Accept Our Terms and Condition</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-block btn-primary btn-accent font-bold text-lg">Sign Up</button>
                </div>
                <p>Already have an accout? Please <Link to='/login'>Login</Link></p>

                {
                    errorMessage && <p className='text-red-600'>{errorMessage}</p>
                }
                {
                    sucess && <p className='text-lime-500'>{'Sign up sucessfull'}</p>
                }
            </form>



        </div>

    );
};

export default SignUp;