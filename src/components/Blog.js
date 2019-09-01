import React, { useState } from 'react'
const Blog = ({
  blog,
  likeHandler,
  removeHandler,
  showRemove }) => {
  const [info, setInfo] = useState(false)

  const showIfUsersBlog = { display: showRemove ? '' : 'none' }

  const toggleInfo = () => {
    setInfo(!info)
  }
  const handleLike = (e) => {
    e.stopPropagation()
    likeHandler(blog)
  }

  return (
    <div onClick={toggleInfo} className='blogContainer'>
      {info
        ? <div>
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <p>likes {blog.likes}<button onClick={(e) => handleLike(e)}>like</button></p>
          <button style={showIfUsersBlog} onClick={() => removeHandler(blog)}>remove</button>
        </div>
        : <div>
          {blog.title} {blog.author}
        </div>}
    </div>
  )
}

export default Blog