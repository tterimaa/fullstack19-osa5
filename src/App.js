import React, {useState, useEffect} from 'react';
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Blog from './components/Blog'
import './index.css'

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
    console.log('mounting')
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

const getBlogs = () => {
  blogService
    .getAll()
    .then(initialBlogs => setBlogs(initialBlogs))
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
    console.log(notificationText, type)
    const timeOutTime = 5000;

    const newMessage = {
      text: notificationText,
      type: type
    }
    const emptyMessage = {
      text: "",
      type: ""
    }
    setNotification(newMessage)
    setTimeout(() => {
      setNotification(emptyMessage)
    }, timeOutTime)
  }

  const loginForm = () => {
    return (
    <div>
    <h1>Log in to application</h1>
    <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <div>
          Title
          <input
          value={newBlogTitle}
          onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
          value={newBlogAuthor}
          onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
          value={newBlogUrl}
          onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    )
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

  const rows = () => blogs.map(blog =>
    <Blog
    blog={blog}
    />
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  return (
    <div>
      <Notification text={notification.text} type={notification.type} />

      {user === null ? 
      loginForm()
      : <div>
        <p>{user.name} logged in
          <button onClick={handleLogout}>Log out</button>
        </p>
        {blogForm()}
        <h1>Blogs</h1>
        <ul>
          {rows()}
        </ul>
        </div>
      }
    </div>
  );
}

export default App;
