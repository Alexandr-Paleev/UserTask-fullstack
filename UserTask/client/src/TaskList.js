import React from 'react'

const TaskList = ({tasks}) =>
tasks.map(task => <li key={task.id}>
    {task.id} 
    <b>{task.title}</b>
    {task.description} 
    {task.address}  
    {task.startTime}  
    {task.EndTime} 
    {/* <button className='btn btn-danger' onClick={() => { taskForRemoveId(task.id) }} id={task.id}>
        Delete
    </button> */}
    </li>
)

export default TaskList