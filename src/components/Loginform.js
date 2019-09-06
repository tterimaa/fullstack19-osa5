import React from 'react'
import PropTypes from 'prop-types'
import CustomInput from './CustomInput'

const Loginform = ({
  handleLogin,
  username,
  password
}) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <CustomInput
            {...username}
          />
        </div>
        <div>
          password
          <CustomInput
            {...password}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Loginform.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired
}

export default Loginform