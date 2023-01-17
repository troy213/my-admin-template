const Table = (props) => {
  const { schema, handleDelete, data = [] } = props
  const { header, body } = schema

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
                return <td key={index}>{content[properties]}</td>
              })}
              <td>
                <div className='table__btn-wrapper'>
                  <button className='btn btn-sm btn-warning'>Edit</button>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => handleDelete(id)}
                  >
                    Delete
                  </button>
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
