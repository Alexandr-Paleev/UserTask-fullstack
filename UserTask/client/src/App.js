import React, { Component } from 'react';
import UserList from './UserList'
import AddUserForm from './AddUserForm'
import TaskList from './TaskList'
import AddTaskForm from './AddTaskForm'
import axios from 'axios'
import './App.css';


const USER_SERVICE_URL = 'http://localhost:5000/user'
const TASK_SERVICE_URL = 'http://localhost:5000/task'

class App extends Component {
  constructor(props) {
    super(props);
    // this.timer = null;
    this.state = {
      isFetching: false,
      users: ['1'],
      tasks: ['1']
    };
  }
  render() {
    const title = 'User list'
    return (
      <div className="App-row">
        <div className='AppUserList'>
          <h2>{title}</h2>
          <p>{this.state.isFetching ? 'Fetching users...' : ''}</p>
          <button onClick={this.fetchUsers} >get allUsers</button>
          <UserList users={this.state.users} />
          <button onClick={this.fetchTasksWithFetch} >show tasks</button>
          <AddUserForm user_service_url={USER_SERVICE_URL}/>
        </div>
        <div className='AppTaskList'>
          <h2>Task list</h2>
          <p>{this.state.isFetching ? 'Fetching tasks...' : ''}</p>
          <TaskList tasks={this.state.tasks} taskForRemoveId={this.props.taskForRemoveId}/>
          <AddTaskForm task_service_url={TASK_SERVICE_URL} />
        </div>        
      </div>
    );
  }

  // componentDidMount() {
  //   this.fetchUsers()
  //   this.timer = setInterval(() => this.fetchUsers(), 10000);
  // }

  // componentWillUnmount() {
  //   this.timer = null;
  // }

  fetchUsers = () => {
    this.setState({...this.state, isFetching: true})
    axios.get(USER_SERVICE_URL)
      .then(response => {
        this.setState({users: response.data, isFetching: false})
      })
      .catch(e => console.log(e));
  }

  fetchTasksWithFetch = () => {
    this.setState({...this.state, isFetching: true})
    fetch(TASK_SERVICE_URL)
      .then(response => response.json())
      .then(result => this.setState({tasks: result, isFetching: false}))
      .catch(e => console.log(e));
  }

  taskForRemoveId = (event) => {
    const id = event.currentTarget.dataset.myId;
    this.state.tasks = this.state.tasks.filter((task) => {
      return task.id !== this.taskForRemoveId;
    });
  }
}

export default App
