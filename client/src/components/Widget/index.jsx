const Widget = (props) => {
  const { title, children, errorMessage = '' } = props

  return (
    <section className='widget'>
      <div className='widget__container'>
        <p className='text--6 text--bold'>{title}</p>
        {errorMessage ? (
          <p className='text--danger mt-4'>{errorMessage}</p>
        ) : null}

        {children}
      </div>
    </section>
  )
}

export default Widget
