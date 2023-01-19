import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { registerAction } from '../../store/users/register-slice'
import axios from '../../api/axios'

import { Form, Modal, Spinner, Widget } from '../../components'
import { REGEX } from '../../data/const'
import { REGISTER_FORM } from './const'
import { checkValidity } from '../../utils'

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const registerState = useSelector((state) => state.register)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(registerAction.clearForm())
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    let isValid = checkValidity(registerState, registerAction, dispatch, REGEX)

    if (registerState.password !== registerState.rePassword) {
      dispatch(registerAction.setError({ field: 'rePassword', value: true }))
      isValid = false
    }

    if (!isValid) {
      setIsLoading(false)
      return toast.error('Invalid data entry')
    }

    try {
      const response = await axios.post(
        '/api/register',
        JSON.stringify({
          username: registerState.username,
          password: registerState.password,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      setModalIsOpen(true)
      dispatch(registerAction.clearForm())
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsLoading(false)
      if (!err?.response) {
        toast.error('No server response')
      } else {
        toast.error(err.response.data?.message)
      }
    }
  }

  return (
    <section className='register'>
      <Widget title='Register'>
        <Spinner isLoading={isLoading} />
        <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <div className='modal__content--default'>
            <p className='text--center'>Registration success</p>
            <div className='modal__btn-wrapper'>
              <button
                className='btn btn-primary mt-4'
                onClick={() => setModalIsOpen(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
        <Form
          schema={REGISTER_FORM}
          state={registerState}
          action={registerAction}
          onSubmit={handleSubmit}
          isCancelable={false}
        />
      </Widget>
    </section>
  )
}

export default Register
