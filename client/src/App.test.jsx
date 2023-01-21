import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { MemoryRouter } from 'react-router-dom'

describe('App', () => {
  test('renders login page', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: MemoryRouter, initialEntries: ['/login'] }
    )

    // check if login page is rendered
    const loginTitle = await waitFor(() => screen.getByText(/login/i))
    expect(loginTitle).toBeInTheDocument()
  })
})
