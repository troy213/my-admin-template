import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { changePasswordAction } from '../../store/users/change-password-slice'

import { Form, Modal, Spinner, Widget } from '../../components'
import { REGEX } from '../../data/const'
import { CHANGE_PASSWORD_FORM } from './const'
import { checkValidity } from '../../utils'

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const { auth } = useAuth()
  const logout = useLogout()
  const axiosPrivate = useAxiosPrivate()
  const changePasswordState = useSelector((state) => state.changePassword)
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      dispatch(changePasswordAction.clearForm())
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    let isValid = checkValidity(
      changePasswordState,
      changePasswordAction,
      dispatch,
      { newPassword: REGEX.password }
    )

    if (changePasswordState.newPassword !== changePasswordState.rePassword) {
      dispatch(
        changePasswordAction.setError({ field: 'rePassword', value: true })
      )
      isValid = false
    }

    if (!isValid) {
      setIsLoading(false)
      return toast.error('Invalid data entry')
    }

    try {
      const response = await axiosPrivate.put(
        '/api/users/change-password',
        JSON.stringify({
          id: auth.id,
          oldPassword: changePasswordState.oldPassword,
          newPassword: changePasswordState.newPassword,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      setIsLoading(false)
      setModalIsOpen(true)
    } catch (err) {
      setIsLoading(false)
      if (!err?.response) {
        toast.error('No Server Response')
      } else {
        toast.error(err.response.data?.message)
      }
    }
  }

  return (
    <section className='change-password'>
      <Widget title='Change Password'>
        <Spinner isLoading={isLoading} />
        <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
          <div className='modal__content--default'>
            <p>The password has been successfully changed.</p>

            <div className='modal__btn-wrapper'>
              <button
                className='btn btn-primary'
                onClick={async () => await logout()}
              >
                Ok
              </button>
            </div>
          </div>
        </Modal>
        <Form
          schema={CHANGE_PASSWORD_FORM}
          state={changePasswordState}
          action={changePasswordAction}
          onSubmit={handleSubmit}
          isCancelable={false}
        />
      </Widget>
    </section>
  )
}

export default ChangePassword
