import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { registerAction } from '../../store/users/register-slice'
import axios from '../../api/axios'

import { Modal, Spinner, Widget } from '../../components'
import { REGEX } from '../../data/const'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const registerState = useSelector((state) => state.register)
  const { username, password, rePassword, errorMessage, error } = registerState
  const isEmpty = !username || !password || !rePassword
  const isError = error.username || error.password || error.rePassword
  const dispatch = useDispatch()

  useEffect(() => {
    if (username) {
      dispatch(
        registerAction.setError({
          field: 'username',
          value: !REGEX.username.test(username),
        })
      )
    }

    if (password) {
      dispatch(
        registerAction.setError({
          field: 'password',
          value: !REGEX.password.test(password),
        })
      )
    }

    dispatch(
      registerAction.setError({
        field: 'rePassword',
        value: password !== rePassword,
      })
    )
  }, [registerState])

  const handleChange = (field, value) => {
    dispatch(registerAction.setInputField({ field, value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    for (const properties in error) {
      if (error[properties]) {
        setIsLoading(false)
        return
      }
    }

    try {
      const response = await axios.post(
        '/api/register',
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      console.log(response)
      setModalIsOpen(true)
      dispatch(registerAction.clearForm())
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      if (!err?.response) {
        dispatch(
          registerAction.setInputField({
            field: 'errorMessage',
            value: 'No server response',
          })
        )
      } else {
        dispatch(
          registerAction.setInputField({
            field: 'errorMessage',
            value: err.response?.data?.message,
          })
        )
      }
    }
  }

  return (
    <section className='register'>
      <Widget title='Register' errorMessage={errorMessage}>
        <Spinner isLoading={isLoading} />
        <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <div className='modal__content--default'>
            <p className='text--center'>Registration success</p>
            <button
              className='btn btn-primary mt-4'
              onClick={() => setModalIsOpen(false)}
            >
              Ok
            </button>
          </div>
        </Modal>
        <form className='register__form' onSubmit={handleSubmit}>
          <div className='register__form-wrapper'>
            <div className='register__input-wrapper'>
              <label htmlFor='username' className='text--light'>
                Username
              </label>
              <input
                id='username'
                type='text'
                className={`register__input${
                  error.username ? ' register__input--error' : ''
                }`}
                placeholder='username'
                value={username}
                onChange={(e) => handleChange('username', e.target.value)}
              />
            </div>

            {error.username ? (
              <p className='text--light text--3'>
                4 to 24 alphanumeric no space (a-z A-Z 0-9).
              </p>
            ) : null}

            <div className='register__input-wrapper'>
              <label htmlFor='password' className='text--light'>
                Password
              </label>
              <input
                id='password'
                type='password'
                className={`register__input${
                  error.password ? ' register__input--error' : ''
                }`}
                placeholder='password'
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>

            {error.password ? (
              <p className='text--light text--3'>
                5 to 24 characters. Must include uppercase and lowercase
                letters, a number.
              </p>
            ) : null}

            <div className='register__input-wrapper'>
              <label htmlFor='re-password' className='text--light'>
                Re-type Password
              </label>
              <input
                id='re-password'
                type='password'
                className={`register__input${
                  error.rePassword ? ' register__input--error' : ''
                }`}
                placeholder='re-type password'
                value={rePassword}
                onChange={(e) => handleChange('rePassword', e.target.value)}
              />
            </div>

            {error.rePassword ? (
              <p className='text--light text--3'>
                Must match with the password field
              </p>
            ) : null}
          </div>

          <button
            type='submit'
            className={`btn text--bold mt-4${
              isEmpty || isError ? ' btn-disabled' : ' btn-primary'
            }`}
            disabled={isEmpty || isError}
          >
            Register
          </button>
        </form>
      </Widget>
    </section>
  )
}

export default Register
