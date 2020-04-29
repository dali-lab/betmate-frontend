import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  fetchResources, createResource, fetchResourceByID, deleteResourceByID,
} from '../../actions/resourceActions';
import {
  fetchUsers, createUser, fetchUserByID, deleteUserByID,
} from '../../actions/userActions';
import SearchItem from '../../components/SearchItem';


class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id_get: '',
      resource_id_get: '',
      user_first_name_create: '',
      user_last_name_create: '',
      user_email_create: '',
      user_password_create: '',
      resource_title_create: '',
      resource_description_create: '',
      resource_value_create: '',

    };

    this.getAllUsers = this.getAllUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getAllResources = this.getAllResources.bind(this);
    this.createResource = this.createResource.bind(this);
    this.getResourceById = this.getResourceById.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
  }

  getAllUsers() {
    this.props.fetchUsers();
  }


  getUserById(id) {
    this.props.fetchUserByID(id);
    console.log(id);
  }

  getAllResources() {
    // gets all resources from server
    this.props.fetchResources();
  }

  getResourceById(id) {
    // gets resource by id
    this.props.fetchResourceByID(id);
    console.log(id);
  }

  createUser(firstName, lastName, email, password) {
    this.props.createUser(firstName, lastName, email, password);
  }

  createResource(title, description, value) {
    this.props.createResource(title, description, value);
  }

  deleteUser(id) {
    this.props.deleteUserByID(id);
    console.log(id);
  }

  deleteResource(id) {
    // deletes resource
    this.props.deleteResourceByID(id);
    console.log(id);
  }


  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>

        <button type="button" onClick={this.getAllUsers}>Get all users</button>

        <input type="text" placeholder="user id" value={this.state.user_id_get} onChange={e => this.setState({ user_id_get: e.target.value })} />
        <button type="button" onClick={e => this.getUserById(this.state.user_id_get)}> Submit </button>
        <button type="button" onClick={e => this.deleteUser(this.state.user_id_get)}>Delete user</button>
        <br />

        <button type="button" onClick={this.getAllResources}>Get all resources</button>

        <input type="text" placeholder="resource id" value={this.state.resource_id_get} onChange={e => this.setState({ resource_id_get: e.target.value })} />
        <button type="button" onClick={e => this.getResourceById(this.state.resource_id_get)}> Submit </button>
        <button type="button" onClick={e => this.deleteResource(this.state.resource_id_get)}>Delete resource</button>
        <br />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <p><b>Create resource:</b></p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> Title: </p>
              <input type="text" value={this.state.resource_title_create} onChange={e => this.setState({ resource_title_create: e.target.value })} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> Description: </p>
              <input type="text" value={this.state.resource_description_create} onChange={e => this.setState({ resource_description_create: e.target.value })} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> Value: </p>
              <input type="text" value={this.state.resource_value_create} onChange={e => this.setState({ resource_value_create: e.target.value })} />
            </div>
            <br />

            <button type="button" onClick={e => this.createResource(this.state.resource_title_create, this.state.resource_description_create, this.state.resource_value_create)}>create</button>

            <p> <b>Resources: </b></p>
            <br />

            <div> {this.props.results && this.props.results.length ? this.props.results.map((element) => {
              return <SearchItem key={element.id || element._id} displayObject={element} />;
            }) : null}
            </div>

            <p> <b>Selected resource: </b></p>
            <br />

            <div> {this.props.resource ? <SearchItem key={this.props.resource.id || this.props.resource._id} displayObject={this.props.resource} />
              : null}
            </div>
            <br />
          </div>
          <div style={{ width: '600px' }} />
          <div>

            <p><b>Create user:</b></p>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> First name: </p>
              <input type="text" value={this.state.user_first_name_create} onChange={e => this.setState({ user_first_name_create: e.target.value })} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> Last name: </p>
              <input type="text" value={this.state.user_last_name_create} onChange={e => this.setState({ user_last_name_create: e.target.value })} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> Email: </p>
              <input type="text" value={this.state.user_email_create} onChange={e => this.setState({ user_email_create: e.target.value })} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p> Password: </p>
              <input type="text" value={this.state.user_password_create} onChange={e => this.setState({ user_password_create: e.target.value })} />
            </div>
            <br />

            <button type="button"
              onClick={e => this.createUser(this.state.user_first_name_create, this.state.user_last_name_create, this.state.user_email_create,
                this.state.user_password_create)}
            >create
            </button>

            <p> <b> Users: </b> </p>
            <br />

            <div> {this.props.users && this.props.users.length ? this.props.users.map((element) => {
              return <SearchItem key={element.id || element._id} displayObject={element} />;
            }) : null}
            </div>

            <p> <b> Selected user: </b></p>
            <br />

            <div> {this.props.user ? <SearchItem key={this.props.user.id || this.props.user._id} displayObject={this.props.user} />
              : null}
            </div>

          </div>
        </div>
        <NavLink to="/signout">Sign Out</NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.data.resources,
  resource: state.data.resource,
  users: state.auth.users,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchResources, createResource, fetchResourceByID, deleteResourceByID, fetchUsers, createUser, fetchUserByID, deleteUserByID,
})(AdminPanel);
