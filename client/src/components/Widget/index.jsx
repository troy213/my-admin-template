const Widget = (props) => {
  const { title, children, errorMessage = '' } = props

  return (
    <div className='widget'>
      <div className='widget__container'>
        <p className='text--6 text--bold'>{title}</p>
        {errorMessage ? (
          <p className='text--danger mt-4'>{errorMessage}</p>
        ) : null}

        {children}
      </div>
    </div>
  )
}

export default Widget
