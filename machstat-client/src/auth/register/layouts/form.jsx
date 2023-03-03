import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from '../../../_components'
import { useService } from '../context/service';

export default function RegisterForm() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const retypePasswordRef = useRef();
    const { currentUser, authErrorMessages, authSuccessMessages, authLogin, authRegister } = useService();

    const callRegister = () => {
        authRegister(nameRef.current.value, emailRef.current.value, passwordRef.current.value, retypePasswordRef.current.value);
    }

    return (

        <div className='max-w-xs mx-auto'>
            <Card className="p-2">
                <Card.Header>Register</Card.Header>
                <Card.Body>
                    <div className='mt-3'>
                        <label htmlFor="name" className='block text-sm'>Name</label>
                        <input type="text" id="name" ref={nameRef} className='border rounded-md px-1 h-7 w-full' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="email" className='block text-sm'>Email</label>
                        <input type="text" id="email" ref={emailRef} className='border rounded-md px-1 h-7 w-full' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="password" className='block text-sm'>Password</label>
                        <input type="password" id="username" ref={passwordRef} className='border rounded-md px-1 h-7 w-full' />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor="password_confirmation" className='block text-sm'>Retype Password</label>
                        <input type="password" id="password_confirmation" ref={retypePasswordRef} className='border rounded-md px-1 h-7 w-full' />
                    </div>
                    <Button caption="Register" name="register" onClick={() => callRegister()} key="register" className="rounded-md mt-3 w-full" />
                </Card.Body>
            </Card>
            <div className='mt-6'>
                Already have an account? <Link to="/login" className='text-blue-500 underline'>Log In</Link>
            </div>
        </div>

    )
}
