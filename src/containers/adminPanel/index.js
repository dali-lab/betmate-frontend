import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchResources, fetchResourceByID, deleteResourceByID } from '../../actions/resourceActions';
import { fetchUsers, fetchUserByID, deleteUserByID } from '../../actions/userActions';
import SearchItem from '../../components/SearchItem';


class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id_get: '',
      resource_id_get: '',

    };

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.getAllResources = this.getAllResources.bind(this);
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

  deleteUser(id) {
    this.props.deleteUserByID(id, {});
    console.log(id);
  }

  deleteResource(id) {
    // deletes resource
    this.props.deleteResourceByID(id, {});
    console.log(id);
  }


  render() {
    return (
      <div>
        <div>Welcome to the admin panel!</div>

        <button type="button" onClick={this.getAllUsers}>Get all users</button>

        <input type="text" value={this.state.user_id_get} onChange={e => this.setState({ user_id_get: e.target.value })} />
        <button type="button" onClick={e => this.getUserById(this.state.user_id_get)}> Submit </button>
        <button type="button" onClick={e => this.deleteUser(this.state.user_id_get)}>Delete user</button>
        <br />

        <button type="button" onClick={this.getAllResources}>Get all resources</button>

        <input type="text" value={this.state.resource_id_get} onChange={e => this.setState({ resource_id_get: e.target.value })} />
        <button type="button" onClick={e => this.getResourceById(this.state.resource_id_get)}> Submit </button>
        <button type="button" onClick={e => this.deleteResource(this.state.resource_id_get)}>Delete resource</button>
        <br />


        <p> Resources: </p>
        <br />

        <div> {this.props.results && this.props.results.length ? this.props.results.map((element) => {
          return <SearchItem key={element.id || element._id} displayObject={element} />;
        }) : null}
        </div>

        <p> Selected resource: </p>
        <br />

        <div> {this.props.resource ? <SearchItem key={this.props.resource.id || this.props.resource._id} displayObject={this.props.resource} />
          : null}
        </div>
        <br />

        <p> Users: </p>
        <br />

        <div> {this.props.users && this.props.users.length ? this.props.users.map((element) => {
          return <SearchItem key={element.id || element._id} displayObject={element} />;
        }) : null}
        </div>

        <p> Selected user: </p>
        <br />

        <div> {this.props.user ? <SearchItem key={this.props.user.id || this.props.user._id} displayObject={this.props.user} />
          : null}
        </div>

        <NavLink to="/signout">Sign Out</NavLink>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.data.resources,
  resource: state.data.resource,
  users: state.data.users,
  user: state.data.user,
});

export default connect(mapStateToProps, {
  fetchResources, fetchResourceByID, deleteResourceByID, fetchUsers, fetchUserByID, deleteUserByID,
})(AdminPanel);
