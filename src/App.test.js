import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

const user = {
  username: 'tester',
  token: '1231231214',
  name: 'Donald Tester'
}

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blogContainer')
    expect(blogs.length).toBe(0)
  })
})