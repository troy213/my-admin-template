import ReactDOM from 'react-dom'

const Spinner = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }

  return ReactDOM.createPortal(
    <div className='spinner-container'>
      <div className='spinner'></div>
    </div>,
    document.getElementById('loading-portal')
  )
}

export default Spinner
