import React from 'react'
import { useState } from 'react'
//import { useContext } from 'react'
import { UserDataContext } from './UserDataContext.js';

const UserContext = ({children}) => {

  const [user, setuser] = useState({
    email: '',
    fullname: {
        firstname: '',
        lastname: ''
    }
  })
  return (
    <div>
      <UserDataContext.Provider value={[user, setuser]}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
