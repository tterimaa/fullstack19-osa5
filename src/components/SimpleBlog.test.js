import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael',
    likes: 2
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael',
    likes: 2
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  const titlediv = component.container.querySelector('.titleAndAuthor')
  expect(titlediv).toHaveTextContent(
    'Component testing is done with react-testing-library Michael'
  )

  const likesdiv = component.container.querySelector('.likes')
  expect(likesdiv).toHaveTextContent(
    'blog has 2 likes'
  )


})