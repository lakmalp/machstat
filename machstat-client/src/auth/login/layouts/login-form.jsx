import { useRef } from "react"
import { Link  } from "react-router-dom";
import { Button, Card } from "../../../_components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useService } from '../context/login-service';

export default function LoginForm(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { currentUser, errorCodes, errors,authErrorMessages, authSuccessMessages, authLogin } = useService();

    const login = (e) => {
        authLogin(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <div className="max-w-sm mx-auto pt-6">
            <div className="flex justify-center py-3 mb-3">
                <h1 className="text-3xl font-inter font-bold">Machine<span className="text-pink-700 uppercase ml-1 px-2 border rounded-full bg-white shadow-inner">Stat</span></h1>
                </div>
            <h2 className="font-inter text-2xl font-bold text-gray-800 text-center pb-6">Sign in to your account</h2>
            <Card className="p-5 bg-white rounded-lg shadow">
                <Card.Body>
                    <form>
                        <div className=''>
                            <label className="block text-sm font-inter font-semibold text-gray-700">Username</label>
                            <input ref={emailRef} type="text" name="email" className="px-2 h-8 mt-1 border rounded-md w-full font-inter text-gray-500 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200" autoFocus />
                        </div>
                        <div className='mt-6'>
                            <label className="block text-sm font-inter font-semibold text-gray-700">Password</label>
                            <input ref={passwordRef} type="password" name="password" className="px-2 h-8 mt-1 border rounded-md w-full font-inter text-gray-500 focus:outline-1 outline-pink-400 focus:ring-2 ring-gray-200" />
                        </div>
                        <div className='mt-6 flex justify-between items-center'>
                            <div className="flex items-center">
                                <input id="remember" type="checkbox" className="" />
                                <label htmlFor="remember" className=" font-inter text-sm pl-2">Remember me</label>
                            </div>
                            <Link to="" className="font-inter text-sm font-semibold text-pink-600">Forgot your password?</Link>
                        </div>
                        <div className='mt-6 flex justify-center items-center'>
                            <Button caption="Login" name="login" onClick={() => login()} key="login" className="w-64 shadow px-6 h-8" />
                        </div>
                        <hr className="mt-8" />
                        <div className="-mt-2 mb-6 flex justify-center text-xs text-gray-600 font-inter"><span className="bg-white px-2">Alternatively, you can log in with</span></div>
                        <div className='flex justify-center items-center'>
                            <button className="w-32 border text-center mr-2 py-1 rounded text-gray-500 hover:text-blue-500"><FontAwesomeIcon icon={faFacebook} className="text-xl" /></button>
                            <button className="w-32 border text-center mr-2 py-1 rounded text-gray-500 hover:text-sky-400"><FontAwesomeIcon icon={faTwitter} className="text-xl" /></button>
                            <button className="w-32 border text-center ml-2 py-1 rounded text-gray-500 hover:text-red-600"><FontAwesomeIcon icon={faGoogle} className="text-xl" /></button>
                        </div>
                        <div className='mt-6 flex justify-center items-center'>
                            <div className="font-inter leading-none text-xs pr-3">Don't have an account? <Link to="/register" className='text-pink-500 underline '>Register</Link></div>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    )
}