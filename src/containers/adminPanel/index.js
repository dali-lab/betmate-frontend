import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  fetchResources, createResource, fetchResourceByID, updateResourceByID, deleteResourceByID,
} from '../../actions/resourceActions';
import {
  fetchUsers, createUser, fetchUserByID, updateUserByID, deleteUserByID,
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

      user_id_create: '',
      user_first_name_update: '',
      user_last_name_update: '',
      user_email_update: '',
      user_password_update: '',

      resource_title_create: '',
      resource_description_create: '',
      resource_value_create: '',

      resource_id_update: '',
      resource_title_update: '',
      resource_description_update: '',
      resource_value_update: '',

    };

    this.getAllUsers = this.getAllUsers.bind(this);
    this.createUser = this.createUser.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.getAllResources = this.getAllResources.bind(this);
    this.updateResource = this.updateResource.bind(this);
    this.createResource = this.createResource.bind(this);
    this.getResourceById = this.getResourceById.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
  }

  getAllUsers(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.fetchUsers();
  }


  getUserById(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.props.fetchUserByID(id);
  }

  getAllResources(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.fetchResources();
  }

  getResourceById(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.props.fetchResourceByID(id);
  }

  updateUser(e, id, update) {
    e.preventDefault();
    e.stopPropagation();

    this.props.updateUserByID(id, update);
  }

  updateResource(e, id, update) {
    e.preventDefault();
    e.stopPropagation();

    this.props.updateResourceByID(id, update);
  }

  createUser(e, firstName, lastName, email, password) {
    e.preventDefault();
    e.stopPropagation();

    this.props.createUser(firstName, lastName, email, password);
  }

  createResource(e, title, description, value) {
    e.preventDefault();
    e.stopPropagation();

    this.props.createResource(title, description, value);
  }

  deleteUser(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.props.deleteUserByID(id).then(() => {
      this.props.fetchUserByID();
    });
  }

  deleteResource(e, id) {
    e.preventDefault();
    e.stopPropagation();

    this.props.deleteResourceByID(id).then(() => {
      this.props.fetchResourceByID();
    });
  }


  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>
        <NavLink to="/signout">Sign Out</NavLink>
        <br /><br />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ width: '400px' }}>
            <button type="button" onClick={this.getAllResources}>Get All Resources</button><br /><br />

            <input type="text" placeholder="Resource ID" value={this.state.resource_id_get} onChange={e => this.setState({ resource_id_get: e.target.value })} /><br />
            <button type="button" onClick={e => this.getResourceById(e, this.state.resource_id_get)}>Get Resource</button><br />
            <button type="button" onClick={e => this.deleteResource(e, this.state.resource_id_get)}>Delete Resource</button><br />

            <p><b>Create resource</b></p>
            <form onSubmit={e => this.createResource(
              e, this.state.resource_title_create, this.state.resource_description_create, this.state.resource_value_create,
            )}
            >
              <input type="text" placeholder="Title" value={this.state.resource_title_create} onChange={e => this.setState({ resource_title_create: e.target.value })} /><br />
              <input type="text" placeholder="Description" value={this.state.resource_description_create} onChange={e => this.setState({ resource_description_create: e.target.value })} /><br />
              <input type="text" placeholder="Value" value={this.state.resource_value_create} onChange={e => this.setState({ resource_value_create: e.target.value })} /><br />
              <input type="submit" value="Create Resource" />
            </form>
            <br />

            <div>
              <p><b>Update resource</b></p>

              <form onSubmit={e => this.updateResource(
                e, this.state.resource_id_update,
                {
                  title: this.state.resource_title_update,
                  description: this.state.resource_description_update,
                  value: this.state.resource_value_update,
                },
              )}
              >
                <input type="text" placeholder="Resource ID" value={this.state.resource_id_update} onChange={e => this.setState({ resource_id_update: e.target.value })} /><br />
                <input type="text" placeholder="Title" value={this.state.resource_title_update} onChange={e => this.setState({ resource_title_update: e.target.value })} /><br />
                <input type="text" placeholder="Description" value={this.state.resource_description_update} onChange={e => this.setState({ resource_description_update: e.target.value })} /><br />
                <input type="text" placeholder="Value" value={this.state.resource_value_update} onChange={e => this.setState({ resource_value_update: e.target.value })} /><br />
                <input type="submit" value="Update Resource" />
              </form>
            </div>

            <p><b>Selected resource:</b></p>
            <div>
              {this.props.resource && Object.keys(this.props.resource).length !== 0
                ? <SearchItem key={this.props.resource.id || this.props.resource._id} displayObject={this.props.resource} />
                : null}
            </div>

            <p><b>Resources:</b></p>
            <div>
              { Array.isArray(this.props.results) && this.props.results.length
                ? this.props.results.map((element) => {
                  return <SearchItem key={element.id || element._id} displayObject={element} />;
                }) : null }
            </div>
          </div>

          <div style={{ width: '200px' }} />

          <div style={{ width: '400px' }}>
            <button type="button" onClick={this.getAllUsers}>Get All Users</button><br /><br />

            <input type="text" placeholder="User ID" value={this.state.user_id_get} onChange={e => this.setState({ user_id_get: e.target.value })} /><br />
            <button type="button" onClick={e => this.getUserById(e, this.state.user_id_get)}>Get User</button><br />
            <button type="button" onClick={e => this.deleteUser(e, this.state.user_id_get)}>Delete User</button>
            <br />

            <p><b>Create user</b></p>
            <form onSubmit={e => this.createUser(
              e,
              this.state.user_first_name_create,
              this.state.user_last_name_create,
              this.state.user_email_create,
              this.state.user_password_create,
            )}
            >
              <input type="text" placeholder="First Name" value={this.state.user_first_name_create} onChange={e => this.setState({ user_first_name_create: e.target.value })} /><br />
              <input type="text" placeholder="Last Name" value={this.state.user_last_name_create} onChange={e => this.setState({ user_last_name_create: e.target.value })} /><br />
              <input type="text" placeholder="Email" value={this.state.user_email_create} onChange={e => this.setState({ user_email_create: e.target.value })} /><br />
              <input type="password" placeholder="Password" value={this.state.user_password_create} onChange={e => this.setState({ user_password_create: e.target.value })} /><br />
              <input type="submit" value="Create User" />
            </form>

            <div>
              <p><b>Update user</b></p>

              <form onSubmit={e => this.updateUser(
                e, this.state.user_id_create,
                {
                  first_name: this.state.user_first_name_update,
                  last_name: this.state.user_last_name_update,
                  email: this.state.user_email_update,
                  password: this.state.user_password_update,
                },
              )}
              >
                <input type="text" placeholder="User ID" value={this.state.user_id_create} onChange={e => this.setState({ user_id_create: e.target.value })} /><br />
                <input type="text" placeholder="First Name" value={this.state.user_first_name_update} onChange={e => this.setState({ user_first_name_update: e.target.value })} /><br />
                <input type="text" placeholder="Last Name" value={this.state.user_last_name_update} onChange={e => this.setState({ user_last_name_update: e.target.value })} /><br />
                <input type="text" placeholder="Email" value={this.state.user_email_update} onChange={e => this.setState({ user_email_update: e.target.value })} /><br />
                <input type="password" placeholder="Password" value={this.state.user_password_update} onChange={e => this.setState({ user_password_update: e.target.value })} /><br />
                <input type="submit" value="Update User" />
              </form>
            </div>

            <p><b>Selected user:</b></p>
            <div> {this.props.user && Object.keys(this.props.user).length !== 0
              ? <SearchItem key={this.props.user.id || this.props.user._id} displayObject={this.props.user} />
              : null}
            </div>

            <p><b>Users:</b></p>
            <div> {Array.isArray(this.props.users) && this.props.users.length ? this.props.users.map((element) => {
              return <SearchItem key={element.id || element._id} displayObject={element} />;
            }) : null}
            </div>
          </div>
        </div>
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
  fetchResources, createResource, fetchResourceByID, updateResourceByID, deleteResourceByID, fetchUsers, createUser, fetchUserByID, updateUserByID, deleteUserByID,
})(AdminPanel);
