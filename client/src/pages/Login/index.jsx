import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '../../store/login-slice'
import axios from '../../api/axios'
import useAuth from '../../hooks/useAuth'

import { Spinner } from '../../components'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const loginState = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth } = useAuth()
  const from = location.state?.from?.pathname || '/'

  const handleChange = (field, value) => {
    dispatch(loginAction.setInputField({ field, value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(
        '/api/login',
        JSON.stringify({
          username: loginState.username,
          password: loginState.password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      const accessToken = response?.data?.accessToken
      const username = response?.data?.username
      const roles = response?.data?.roles
      const id = response?.data?.id

      setAuth({ id, username, roles, accessToken })
      dispatch(loginAction.clearForm())
      setIsLoading(false)
      navigate(from, { replace: true })
    } catch (err) {
      setIsLoading(false)
      if (!err?.response) {
        dispatch(
          loginAction.setInputField({
            field: 'errorMessage',
            value: 'No server response',
          })
        )
      } else {
        dispatch(
          loginAction.setInputField({
            field: 'errorMessage',
            value: err.response.data?.message,
          })
        )
      }
    }
  }

  return (
    <section className='login'>
      <Spinner isLoading={isLoading} />
      <div className='login__container'>
        <p className='text--center text--bold text--8'>Sign In</p>
        {loginState.errorMessage ? (
          <p className='text--danger mt-4'>{loginState.errorMessage}</p>
        ) : null}
        <form className='login__form' onSubmit={handleSubmit}>
          <div className='login__input-wrapper'>
            <label htmlFor='username' className='text--light'>
              Username
            </label>
            <input
              id='username'
              type='text'
              className='login__input'
              placeholder='username'
              value={loginState.username}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </div>
          <div className='login__input-wrapper'>
            <label htmlFor='password' className='text--light'>
              Password
            </label>
            <input
              id='password'
              type='password'
              className='login__input'
              placeholder='password'
              value={loginState.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='btn btn-lg btn-primary text--bold mt-4'
          >
            Login
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login
