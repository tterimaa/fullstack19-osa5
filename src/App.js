import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Toggleable from './components/Togglable'
import './index.css'
import Loginform from './components/Loginform'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notification, setNotification] = useState({
    text: '',
    type: ''
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    blogs.sort((a,b) => b.likes - a.likes)
    setBlogs(blogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      showNotification('log in successfull', 'success')
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
      showNotification('wrong credentials', 'error')
    }
  }

  const showNotification = (notificationText, type) => {
    const timeOutTime = 5000

    const newMessage = {
      text: notificationText,
      type: type
    }
    const emptyMessage = {
      text: '',
      type: ''
    }
    setNotification(newMessage)
    setTimeout(() => {
      setNotification(emptyMessage)
    }, timeOutTime)
  }

  const addBlog = event => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    blogService
      .add(newBlog)
      .then(() => {
        getBlogs()
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        showNotification(`blog ${newBlog.title} by ${newBlog.author} added`, 'success')
      })
  }

  const handleLike = async blog => {
    await blogService.like(blog)
    getBlogs()
  }

  const removeBlog = async blog => {
    await blogService.remove(blog)
    getBlogs()
  }

  const rows = () => {
    return blogs.map(blog =>
      <Blog
        blog={blog}
        key={blog.id}
        likeHandler={handleLike}
        removeHandler={removeBlog}
        showRemove={user.id === blog.user.id ? true : false}
      />
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  return (
    <div>
      <Notification text={notification.text} type={notification.type} />

      {user === null ?
        <Loginform
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        : <div>
          <p>{user.name} logged in
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Toggleable buttonLabel='new blog'>
            <Blogform
              submit={addBlog}
              changeTitle={setNewBlogTitle}
              changeAuthor={setNewBlogAuthor}
              changeUrl={setNewBlogUrl}
              titleValue={newBlogTitle}
              authorValue={newBlogAuthor}
              urlValue={newBlogUrl}
            />
          </Toggleable>
          <h1>Blogs</h1>
          <ul>
            {rows()}
          </ul>
        </div>
      }
    </div>
  )
}

export default App
