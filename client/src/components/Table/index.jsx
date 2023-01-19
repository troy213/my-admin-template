import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Table = (props) => {
  const { schema, handleDelete, data = [] } = props
  const { header, body } = schema

  const { auth } = useAuth()
  const location = useLocation()

  if (!data.length)
    return <p className='text--center text--light'>There is no data</p>

  return (
    <table className='table'>
      <thead>
        <tr>
          {header.map((head, index) => {
            return <th key={index}>{head}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((content, index) => {
          const { id } = content

          return (
            <tr key={index}>
              <td>{index + 1}</td>
              {body.map((properties, index) => {
                const { field, isEnum = false, enumData = null } = properties
                return (
                  <td key={index}>
                    {isEnum ? enumData[content[field]] : content[field]}
                  </td>
                )
              })}
              <td>
                <div className='table__btn-wrapper'>
                  <Link to={`${location.pathname}/${id}`}>
                    <button className='btn btn-warning'>Edit</button>
                  </Link>
                  {auth.id !== id ? (
                    <button
                      className='btn btn-danger'
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
