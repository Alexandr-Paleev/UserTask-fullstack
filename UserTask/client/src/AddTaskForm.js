import React, {Component} from 'react'
import axios from 'axios'
import './AddForm.css'

class AddTaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      inputValues: { title: "", description: "", address: "", startTime: "", EndTime: "", user_: 0 },
      pageTitle: "React components",
      showTasks: false,
      newTask: {}
    };
  }

  handleChange = event => {
    this.setState({
      inputValues: {...this.state.inputValues, [event.target.name]: event.target.value}
    })
  }

  handleSubmit = event => {
    axios.post(this.props.task_service_url, { 
        title: this.state.inputValues.title, 
        description: this.state.inputValues.description, 
        address: this.state.inputValues.address, 
        startTime: this.state.inputValues.startTime, 
        EndTime: this.state.inputValues.EndTime, 
        user_: this.state.inputValues.user_
    })
      .then(r => console.log(r.data))
      .catch(e => console.log(e));

    event.preventDefault();
  }

  deleteTask = async (id) => {
    const result = await axios.delete(`${this.props.task_service_url}/${id}`);
    return result.data;
  }

  render = () => {
    const title = 'Task'
    return (
      <div className="wrapper">
      <h1>{title}</h1>
        <form style={{ background: 'lightgrey', padding: 10, marginBottom: 10 }} onSubmit={this.handleSubmit}>
            <div className="form-row">
                <div className="form-group col-md-2">
                    <label>Title</label>
                    <input className="form-control" type="text" name="title" onChange={this.handleChange} />
                </div>

                <div className="form-group col-md-2">
                    <label>description</label>
                    <input className="form-control" type="text" name="description" onChange={this.handleChange} />
                </div>

                <div className="form-group col-md-2">
                    <label>address</label>
                    <input className="form-control" type="text" name="address" onChange={this.handleChange} />
                </div>

                <div className="form-group col-md-1">
                    <label>Start</label>
                    <input className="form-control" type="text" name="startTime" onChange={this.handleChange} />
                </div>

                <div className="form-group col-md-1">
                    <label>End</label>
                    <input className="form-control" type="text" name="EndTime" onChange={this.handleChange} />
                </div>

                <div className="form-group col-md-2">
                    <label>User_name</label>
                    <select className="form-control" name="user_" onChange={this.handleChange}>
                        {/* <option defaultValue>...</option> */}
                        <option value="1">Test</option>
                        <option value="2">Second</option>
                        <option value="3">Third</option>
                        <option value="14">fourth</option>
                        <option value="15">fifth</option>
                    </select>
                </div>
        
                <input 
                  type="submit" 
                  className="btn btn-primary form-group col-md-2" 
                  style={{ marginTop: 33 }}
                  onSubmit={this.handleSubmit}
                  value="Add task"
                />
            </div>
        </form>
      </div>
    )
  }
}

export default AddTaskForm