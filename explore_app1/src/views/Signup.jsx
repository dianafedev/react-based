import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client'
import { useStateContext } from '../contexts/ContextProvider'

function Login() {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const [errors, setErros] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setUser, setToken } = useStateContext()

  const handleSignup = (ev) => {
    setLoading(true)
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    axiosClient
      .post('/signup', payload)
      .then(({ data }) => {
        setLoading(false)
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const response = err.response
        if (response && response.status === 422) {
          setLoading(false)
          setErros(response.data.errors)
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div>
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
        <h4 className="text-xl font-bold text-black">Signup for free</h4>
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p className="text-red-600 text-sm" key={key}>
                *{errors[key]}
              </p>
            ))}
          </div>
        )}
        {message && (
          <div className="alert">
            <p className="text-orange-600 text-sm">{message}</p>
          </div>
        )}
        <form className="flex flex-col gap-4 mt-6" onSubmit={handleSignup}>
          <input
            ref={nameRef}
            className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inse sm:text-sm sm:leading-6"
            type="text"
            placeholder="Full name"
          />
          <input
            ref={emailRef}
            className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inse sm:text-sm sm:leading-6"
            type="email"
            placeholder="E-mail"
          />
          <input
            ref={passwordRef}
            className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inse sm:text-sm sm:leading-6"
            type="password"
            placeholder="Password"
          />
          <input
            ref={passwordConfirmationRef}
            className="block w-full rounded-md border-0 py-1.5 px-4 text-gray-800 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inse sm:text-sm sm:leading-6"
            type="password"
            placeholder="Password Confirmation"
          />
          <button className="flex justify-center items-center w-full bg-slate-100 font-bold p-2 rounded-md hover:bg-slate-200">
            {loading && (
              <svg
                className="animate-spin mr-2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            Signup
          </button>
          <p className="text-sm text-gray-600">
            All Ready Registered?
            <Link to="/login">
              <span className="font-semibold ml-1">Sign in</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
