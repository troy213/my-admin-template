import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { editUserAction } from '../../../store/users/edit-user-slice'

import { Form, Modal, Spinner, Widget } from '../../../components'
import { checkValidity } from '../../../utils'
import { REGEX } from '../../../data/const'

const EDIT_USER_FORM = [
  {
    id: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'username',
    helperText: '4 to 24 alphanumeric no space (a-z A-Z 0-9).',
  },
  {
    id: 'roles',
    label: 'Roles',
    type: 'dropdown-enum',
    options: [
      {
        value: 1,
      },
      {
        value: 2,
      },
    ],
    enumData: {
      1: 'Admin',
      2: 'Staff',
    },
  },
]

const UserDetail = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const editUserState = useSelector((state) => state.editUser)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const rootPath = `/${location.pathname.split('/')[1]}`
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsersId = async () => {
      try {
        const response = await axiosPrivate.get(`/api/users/${id}`, {
          signal: controller.signal,
        })

        if (response?.data?.data.length === 0) {
          navigate(rootPath)
        }

        setIsLoading(false)
        if (isMounted) {
          dispatch(editUserAction.setData(response.data.data[0]))
        }
      } catch (err) {
        console.error('Users Error: ', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsersId()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleCancel = () => {
    navigate(rootPath)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = checkValidity(editUserState, editUserAction, dispatch, {
      username: REGEX.username,
    })

    if (!isValid) return

    try {
      const response = await axiosPrivate.put(
        '/api/users',
        JSON.stringify({
          id: editUserState.id,
          username: editUserState.username,
          roles: editUserState.roles,
        }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      toast.success('Update success!')
      navigate(rootPath)
    } catch (err) {
      if (!err?.response) {
        toast.error('No Server Response')
      } else {
        toast.error(err.response?.data?.message)
      }
    }
  }

  return (
    <section className='user-detail'>
      <Widget title='Edit user'>
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
        <Form
          schema={EDIT_USER_FORM}
          state={editUserState}
          action={editUserAction}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Widget>
    </section>
  )
}

export default UserDetail
