import React from 'react';
import { NavLink } from 'react-router-dom';

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: 'no users',
      resources: 'no resources',
      current_user: 'no current_user',
      current_resource: 'no current resource',

    };

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getAllResources = this.getAllResources.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getResourceById = this.getResourceById.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
  }

  getAllUsers() {
    // gets all users from server
    this.setState({ users: 'users should be displayed' });
    return (
      <div>{this.state.users} </div>
    );
  }

  getAllResources() {
    // gets all resources from server
    this.setState({ resources: 'resources should be displayed' });
    return (
      <div>{this.state.resources} </div>
    );
  }

  getUserById(id) {
    // gets user by id
    this.setState({ current_user: 'user found' });
    return (
      <div>{this.state.current_user} </div>
    );
  }

  getResourceById(id) {
    // gets resource by id
    this.setState({ current_user: 'resource found' });
    return (
      <div>{this.state.current_resource} </div>
    );
  }

  deleteUser(id) {
    // deletes user
  }

  deleteResource(id) {
    // deletes resource
  }

  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>
        <button type="button" onClick={this.getAllUsers}>Get all users</button>
        <button type="button" onClick={this.getUserById}>Get user by ID</button>
        <button type="button" onClick={this.deleteUser}>Delete user</button>

        <button type="button" onClick={this.getAllResources}>Get all resources</button>
        <button type="button" onClick={this.getResourceById}>Get resource by ID</button>
        <button type="button" onClick={this.deleteResource}>Delete resource</button>

        <NavLink to="/signout">Sign Out</NavLink>
      </div>
    );
  }
}

export default AdminPanel;
