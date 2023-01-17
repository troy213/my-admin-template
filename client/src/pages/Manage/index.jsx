import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { Spinner, Modal, Table, Widget } from '../../components'

const USER_TABLE_SCHEMA = {
  header: ['No', 'Username', 'Roles', 'Action'],
  body: ['username', 'roles'],
}

const Manage = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/api/users', {
          signal: controller.signal,
        })

        if (response?.data?.data?.length > 0) {
          setIsLoading(false)
        }
        isMounted && setUsers(response?.data?.data)
      } catch (err) {
        console.error('Users Error: ', err)
        navigate('/login', { state: { from: location }, replace: true })
      }
    }

    getUsers()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/api/users/${id}`)

      const newData = users.filter((user) => user.id !== id)
      setModalIsOpen(true)
      setUsers(newData)
    } catch (err) {
      if (!err?.response) {
        console.error(err)
      } else {
        console.error(err)
      }
    }
  }

  return (
    <Widget title='Manage'>
      <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div className='modal__content--default'>
          <p>User has been deleted successfully!</p>
          <button
            className='btn btn-sm btn-primary'
            onClick={() => setModalIsOpen(false)}
          >
            Ok
          </button>
        </div>
      </Modal>
      <Spinner isLoading={isLoading} />
      <Table
        schema={USER_TABLE_SCHEMA}
        data={users}
        handleDelete={handleDelete}
      />
    </Widget>
  )
}

export default Manage
