import React from 'react'
import Form from '../components/Form'


const Register = () => {
  return (
      <div>
          <Form route='/api/user/register/' method='register' />
      </div>
  )
}

export default Register