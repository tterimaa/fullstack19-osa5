import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

test('blog container has only title and author by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael',
    url: 'www.net',
    likes: 2
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library Michael'
  )
})

test('clicking blog container reveals all info', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Michael',
    url: 'www.net',
    likes: 2
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} onClick={mockHandler} />
  )
  const div = getByText('Component testing is done with react-testing-library Michael')
  fireEvent.click(div)

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library Michael',
    'www.net',
    'likes 2'
  )
})