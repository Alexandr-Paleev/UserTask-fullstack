import React from 'react'

const UserList = ({users}) =>
users.map(user => <li key={user.id}> 
    <em>{user.id}</em> 
    <b>{user.firstname}</b> 
    {user.lastname} 
    {user.address} 
    {user.phone} 
    {/* <button>show tasks</button> */}
    </li>
)

export default UserList
