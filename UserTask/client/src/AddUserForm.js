import React, {Component} from 'react'
import axios from 'axios'
import './AddForm.css'

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      inputValues: { firstname: "", lastname: "", address: "", phone: "", city_: 0 },
      pageTitle: "React components",
      showUsers: false,
      newUser: {}
    };
  }

  handleChange = event => {
    this.setState({
      inputValues: {...this.state.inputValues, [event.target.name]: event.target.value}
    })
  }

  handleSubmit = event => {
    axios.post(this.props.user_service_url, { firstname: this.state.inputValues.firstname, lastname: this.state.inputValues.lastname, address: this.state.inputValues.address, phone: this.state.inputValues.phone, city_: this.state.inputValues.city_})
      .then(r => alert(r.data))
      .catch(e => console.log(e));

    event.preventDefault();
  }

  render = () => {
    return (
      <form className='AddUserForm' onSubmit={this.handleSubmit}>
        <label>User firstname</label>
        <input className="Add-text" type="text" name="firstname" onChange={this.handleChange} /><br/>
        <label>User lastname</label>
        <input className="Add-text" type="text" name="lastname" onChange={this.handleChange} /><br/>
        <label>User address</label>
        <input className="Add-text" type="text" name="address" onChange={this.handleChange} /><br/>
        <label>User phone</label>
        <input className="Add-text" type="text" name="phone" onChange={this.handleChange} /><br/>
        <label>User city_id</label>
        <select className="Add-text" type="number" name="city_" onChange={this.handleChange} >
            {/* <option defaultValue>...</option> */}
            <option value="1">Kharkov</option>
            <option value="2">Chicago</option>
            <option value="3">Kiev</option>
        </select><br/>
        <input className="Add-button" type="submit" value="Add User" />
      </form>
    )
  }
}

export default AddUserForm
