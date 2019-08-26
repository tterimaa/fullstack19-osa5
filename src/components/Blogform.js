import React from 'react'

const blogForm = ({
  submit,
  changeTitle,
  changeAuthor,
  changeUrl,
  titleValue,
  authorValue,
  urlValue
}) => {
  return (
    <form onSubmit={submit}>
      <div>
          Title
        <input
          value={titleValue}
          onChange={({ target }) => changeTitle(target.value)}
        />
      </div>
      <div>
          Author
        <input
          value={authorValue}
          onChange={({ target }) => changeAuthor(target.value)}
        />
      </div>
      <div>
          Url
        <input
          value={urlValue}
          onChange={({ target }) => changeUrl(target.value)}
        />
      </div>
      <button type='submit'>Save</button>
    </form>
  )
}

export default blogForm