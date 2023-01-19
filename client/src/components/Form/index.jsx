import DatePicker from 'react-datepicker'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'

const Form = (props) => {
  const {
    schema,
    state,
    action,
    onSubmit,
    onCancel,
    submitLabel = 'Submit',
    isCancelable = true,
  } = props
  const dispatch = useDispatch()

  const handleChange = (field, value, validation = '') => {
    if (validation) {
      if (validation.test(value)) {
        dispatch(action.setInputField({ field, value }))
      }
    } else {
      dispatch(action.setInputField({ field, value }))
    }
  }

  return (
    <form className='form' onSubmit={onSubmit}>
      <div className='form__form-wrapper'>
        {schema.map((field, fieldIndex) => {
          const {
            id,
            label,
            type,
            placeholder = '',
            validation = '',
            helperText = "This field can't be empty",
            dateFormat = 'dd/MM/yyyy',
            isMonthPicker = false,
          } = field

          return (
            <div key={fieldIndex} className='form__input-wrapper'>
              <label htmlFor={id} className='text--light text--3'>
                {label}
              </label>

              {type === 'date' ? (
                <DatePicker
                  id={id}
                  selected={state[id] && new Date(state[id])}
                  onChange={(date) => handleChange(id, date.toISOString())}
                  className={`form__input${
                    state.error[id] ? ' form__input--error' : ''
                  }`}
                  placeholderText={placeholder}
                  dateFormat={dateFormat}
                  maxDate={new Date()}
                  showMonthYearPicker={isMonthPicker}
                />
              ) : null}

              {type === 'dropdown' ? (
                <select
                  id={id}
                  onChange={(e) => handleChange(id, e.target.value)}
                  value={state[id]}
                  className={`form__input${
                    state.error[id] ? ' form__input--error' : ''
                  }`}
                >
                  <option value=''>- select -</option>
                  {field.options.map((option, index) => {
                    return (
                      <option value={option.value} key={index}>
                        {option.value}
                      </option>
                    )
                  })}
                </select>
              ) : null}

              {type === 'dropdown-enum' ? (
                <select
                  id={id}
                  onChange={(e) => handleChange(id, e.target.value)}
                  value={state[id]}
                  className={`form__input${
                    state.error[id] ? ' form__input--error' : ''
                  }`}
                >
                  <option value=''>- select -</option>
                  {field.options.map((option, index) => {
                    return (
                      <option value={option.value} key={index}>
                        {field.enumData[option.value]}
                      </option>
                    )
                  })}
                </select>
              ) : null}

              {type === 'text' ? (
                <input
                  type='text'
                  id={id}
                  value={state[id]}
                  onChange={(e) => handleChange(id, e.target.value, validation)}
                  className={`form__input${
                    state.error[id] ? ' form__input--error' : ''
                  }`}
                  placeholder={placeholder}
                />
              ) : null}

              {type === 'number' ? (
                <input
                  type='number'
                  id={id}
                  value={state[id]}
                  onChange={(e) => handleChange(id, e.target.value, validation)}
                  className={`form__input${
                    state.error[id] ? ' form__input--error' : ''
                  }`}
                  placeholder={placeholder}
                />
              ) : null}

              {type === 'password' ? (
                <input
                  type='password'
                  id={id}
                  value={state[id]}
                  onChange={(e) => handleChange(id, e.target.value, validation)}
                  className={`form__input${
                    state.error[id] ? ' form__input--error' : ''
                  }`}
                  placeholder={placeholder}
                />
              ) : null}

              {state.error[id] ? (
                <p className='text--light text--3 text--danger mt-2'>
                  {helperText}
                </p>
              ) : null}
            </div>
          )
        })}
      </div>

      <div className='form__btn-wrapper mt-4'>
        <button type='submit' className='btn btn-primary'>
          {submitLabel}
        </button>

        {isCancelable ? (
          <button className='btn btn-primary-outline' onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}

export default Form
