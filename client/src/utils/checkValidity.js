const checkValidity = (
  state,
  action,
  dispatch,
  validation = {},
  exceptions = ['error']
) => {
  let isValid = true

  for (const obj in state) {
    if (exceptions.includes(obj)) continue

    if (!state[obj]) {
      isValid = false
      dispatch(
        action.setError({
          field: `${obj}`,
          value: true,
        })
      )
    } else {
      const regex = validation[obj]
      if (regex && !regex.test(state[obj])) {
        isValid = false
        dispatch(
          action.setError({
            field: `${obj}`,
            value: true,
          })
        )
      } else {
        dispatch(
          action.setError({
            field: `${obj}`,
            value: false,
          })
        )
      }
    }
  }

  return isValid
}

export default checkValidity
