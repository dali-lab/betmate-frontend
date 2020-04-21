import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchResources } from '../../actions';

function getResourceById(id) {
  // gets resource by id
  console.log(id);
}

function getUserById(id) {
  // gets user by id
  console.log(id);
}

class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id_get: '',
      resource_id_get: '',
      // users: 'no users',
      // resources: 'no resources',
      // current_user: 'no current_user',
      // current_resource: 'no current resource',

    };

    // this.getAllUsers = this.getAllUsers.bind(this);
    this.getAllResources = this.getAllResources.bind(this);
    // this.getResourceById = this.getResourceById.bind(this);
    // this.deleteUser = this.deleteUser.bind(this);
    // this.deleteResource = this.deleteResource.bind(this);
  }

  // getAllUsers() {
  //   // gets all users from server
  //   console.log('get all users');
  //   // this.setState({ users: 'users should be displayed' });
  //   // return (
  //   //   <div>{this.state.users} </div>
  //   // );
  // }

  getAllResources() {
    // gets all resources from server
    this.props.fetchResources();
  }

  // deleteUser(id) {
  //   // deletes user
  // }
  //
  // deleteResource(id) {
  //   // deletes resource
  // }


  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>

        <button type="button" onClick={this.getAllUsers}>Get all users</button>

        <input type="text" value={this.state.user_id_get} onChange={e => this.setState({ user_id_get: e.target.value })} />
        <button type="button" onClick={e => getUserById(this.state.user_id_get)}> Submit </button>
        <button type="button" onClick={this.deleteUser}>Delete user</button>
        <br />

        <button type="button" onClick={this.getAllResources}>Get all resources</button>

        <input type="text" value={this.state.resource_id_get} onChange={e => this.setState({ resource_id_get: e.target.value })} />
        <button type="button" onClick={e => getResourceById(this.state.resource_id_get)}> Submit </button>
        <button type="button" onClick={this.deleteResource}>Delete resource</button>
        <br />


        <div>{this.props.fetch || ''}</div>

        <NavLink to="/signout">Sign Out</NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetch: state.data.data,
});

export default connect(mapStateToProps, { fetchResources })(AdminPanel);
