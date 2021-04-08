/* eslint-disable react/sort-comp */
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { generateFrontendErrorMessage } from '../../constants';

import ActionTypes from '../../actions';
import { createErrorSelector, createLoadingSelector } from '../../actions/requestActions';
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
    this.createResource = this.createResource.bind(this);
    this.getResourceById = this.getResourceById.bind(this);
    this.updateResource = this.updateResource.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
  }

  // User handler functions

  getAllUsers(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.fetchUsers();
  }

  createUser(e, firstName, lastName, email, password) {
    e.preventDefault();
    e.stopPropagation();

    this.props.createUser(firstName, lastName, email, password);
  }

  getUserById(e, id) {
    e.preventDefault();
    e.stopPropagation();

    if (id) { this.props.fetchUserByID(id); }
  }

  updateUser(e, id, update) {
    e.preventDefault();
    e.stopPropagation();

    if (id) { this.props.updateUserByID(id, update); }
  }

  deleteUser(e, id) {
    e.preventDefault();
    e.stopPropagation();

    if (id) { this.props.deleteUserByID(id); }
  }

  // Resource handler functions

  getAllResources(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.fetchResources();
  }

  getResourceById(e, id) {
    e.preventDefault();
    e.stopPropagation();

    if (id) { this.props.fetchResourceByID(id); }
  }

  updateResource(e, id, update) {
    e.preventDefault();
    e.stopPropagation();

    if (id) { this.props.updateResourceByID(id, update); }
  }

  createResource(e, title, description, value) {
    e.preventDefault();
    e.stopPropagation();

    this.props.createResource(title, description, value);
  }

  deleteResource(e, id) {
    e.preventDefault();
    e.stopPropagation();

    if (id) { this.props.deleteResourceByID(id); }
  }

  // NOTE: Form inputs not validated in frontend
  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>
        <NavLink to="/signout">Sign Out</NavLink>
        <br /><br />

        {/* Container for main user/resource flex box */}
        <div style={{ display: 'flex', flexDirection: 'row' }}>

          {/* Resource Container */}
          <div style={{ width: '400px' }}>

            {/* High-level Resource Operations */}
            <button type="button" onClick={this.getAllResources}>Get All Resources</button><br /><br />

            <input type="text" placeholder="Resource ID" value={this.state.resource_id_get} onChange={(e) => this.setState({ resource_id_get: e.target.value })} /><br />
            <button type="button" onClick={(e) => this.getResourceById(e, this.state.resource_id_get)}>Get Resource</button><br />
            <button type="button" onClick={(e) => this.deleteResource(e, this.state.resource_id_get)}>Delete Resource</button><br />

            {/* Create Resource Form */}
            <p><b>Create Resource</b></p>
            <form onSubmit={(e) => this.createResource(
              e, this.state.resource_title_create, this.state.resource_description_create, this.state.resource_value_create,
            )}
            >
              <input type="text" placeholder="Title" value={this.state.resource_title_create} onChange={(e) => this.setState({ resource_title_create: e.target.value })} /><br />
              <input type="text" placeholder="Description" value={this.state.resource_description_create} onChange={(e) => this.setState({ resource_description_create: e.target.value })} /><br />
              <input type="text" placeholder="Value" value={this.state.resource_value_create} onChange={(e) => this.setState({ resource_value_create: e.target.value })} /><br />
              <input type="submit" value="Create Resource" />
            </form>
            <br />

            {/* Update Resource Form */}
            <p><b>Update Resource</b></p>

            <form onSubmit={(e) => this.updateResource(
              e, this.state.resource_id_update,
              {
                title: this.state.resource_title_update || undefined,
                description: this.state.resource_description_update || undefined,
                value: this.state.resource_value_update || undefined,
              },
            )}
            >
              <input type="text" placeholder="Resource ID" value={this.state.resource_id_update} onChange={(e) => this.setState({ resource_id_update: e.target.value })} /><br />
              <input type="text" placeholder="Title" value={this.state.resource_title_update} onChange={(e) => this.setState({ resource_title_update: e.target.value })} /><br />
              <input type="text" placeholder="Description" value={this.state.resource_description_update} onChange={(e) => this.setState({ resource_description_update: e.target.value })} /><br />
              <input type="text" placeholder="Value" value={this.state.resource_value_update} onChange={(e) => this.setState({ resource_value_update: e.target.value })} /><br />
              <input type="submit" value="Update Resource" />
            </form>

            {/* Shows result of fetchResources() action */}
            <p><b>Resources:</b></p>
            <div>{this.props.resourceIsLoading ? 'Loading data...'
              : (generateFrontendErrorMessage(this.props.resourceErrorMessage)
              || Object.values(this.props.resources).map((element) => <SearchItem key={element.id || element._id} displayObject={element} />))}
            </div>
          </div>

          {/* Spacer */}
          <div style={{ width: '200px' }} />

          {/* User Container */}
          <div style={{ width: '400px' }}>

            {/* High-level User Operations */}
            <button type="button" onClick={this.getAllUsers}>Get All Users</button><br /><br />

            <input type="text" placeholder="User ID" value={this.state.user_id_get} onChange={(e) => this.setState({ user_id_get: e.target.value })} /><br />
            <button type="button" onClick={(e) => this.getUserById(e, this.state.user_id_get)}>Get User</button><br />
            <button type="button" onClick={(e) => this.deleteUser(e, this.state.user_id_get)}>Delete User</button>
            <br />

            {/* Create User Form */}
            <p><b>Create User</b></p>
            <form onSubmit={(e) => this.createUser(
              e,
              this.state.user_first_name_create,
              this.state.user_last_name_create,
              this.state.user_email_create,
              this.state.user_password_create,
            )}
            >
              <input type="text" placeholder="First Name" value={this.state.user_first_name_create} onChange={(e) => this.setState({ user_first_name_create: e.target.value })} /><br />
              <input type="text" placeholder="Last Name" value={this.state.user_last_name_create} onChange={(e) => this.setState({ user_last_name_create: e.target.value })} /><br />
              <input type="text" placeholder="Email" value={this.state.user_email_create} onChange={(e) => this.setState({ user_email_create: e.target.value })} /><br />
              <input type="password" placeholder="Password" value={this.state.user_password_create} onChange={(e) => this.setState({ user_password_create: e.target.value })} /><br />
              <input type="submit" value="Create User" />
            </form>

            {/* Update User Form */}
            <p><b>Update User</b></p>

            <form onSubmit={(e) => this.updateUser(
              e, this.state.user_id_create,
              {
                first_name: this.state.user_first_name_update || undefined,
                last_name: this.state.user_last_name_update || undefined,
                email: this.state.user_email_update || undefined,
                password: this.state.user_password_update || undefined,
              },
            )}
            >
              <input type="text" placeholder="User ID" value={this.state.user_id_create} onChange={(e) => this.setState({ user_id_create: e.target.value })} /><br />
              <input type="text" placeholder="First Name" value={this.state.user_first_name_update} onChange={(e) => this.setState({ user_first_name_update: e.target.value })} /><br />
              <input type="text" placeholder="Last Name" value={this.state.user_last_name_update} onChange={(e) => this.setState({ user_last_name_update: e.target.value })} /><br />
              <input type="text" placeholder="Email" value={this.state.user_email_update} onChange={(e) => this.setState({ user_email_update: e.target.value })} /><br />
              <input type="password" placeholder="Password" value={this.state.user_password_update} onChange={(e) => this.setState({ user_password_update: e.target.value })} /><br />
              <input type="submit" value="Update User" />
            </form>

            {/* Shows result of fetchUsers() action */}
            <p><b>Users:</b></p>
            <div>
              {this.props.userIsLoading ? 'Loading data...'
                : (generateFrontendErrorMessage(this.props.userErrorMessage)
                || Object.values(this.props.users).map((element) => <SearchItem key={element.id || element._id} displayObject={element} />))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const userSelectorActions = [ActionTypes.FETCH_USER, ActionTypes.FETCH_USERS, ActionTypes.DELETE_USER];
const resourceSelectorActions = [ActionTypes.FETCH_RESOURCE, ActionTypes.FETCH_RESOURCES, ActionTypes.DELETE_RESOURCE];

const mapStateToProps = (state) => ({
  resourceIsLoading: createLoadingSelector(resourceSelectorActions)(state),
  resourceErrorMessage: createErrorSelector(resourceSelectorActions)(state),
  userIsLoading: createLoadingSelector(userSelectorActions)(state),
  userErrorMessage: createErrorSelector(userSelectorActions)(state),

  resources: state.resource.resources,
  users: state.auth.users,
});

export default connect(mapStateToProps, {
  fetchResources, createResource, fetchResourceByID, updateResourceByID, deleteResourceByID, fetchUsers, createUser, fetchUserByID, updateUserByID, deleteUserByID,
})(AdminPanel);
