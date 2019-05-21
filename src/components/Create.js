import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.db.collection('boards');
    this.state = {
      title: '',
      description: '',
      author: ''
    };
  }
  onChange = e => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = e => {
    e.preventDefault();

    const { title, description, author } = this.state;

    this.ref.add({
      title,
      description,
      author
    }).then(docRef => {
      this.setState({
        title: '',
        description: '',
        author: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  logout = async () => {
    await firebase.logout();
    this.props.history.push("/");
  };

  render() {
    const { title, description, author } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading mt-3">
            <h3 className="panel-title d-inline-block">
              ADD POST
            </h3>
            <button
              className="btn btn-outline-primary btn-sm ml-2 mb-2"
              onClick={this.logout}
            >
              log out
            </button>
          </div>
          <div className="panel-body">
            <h4><Link to="/" className="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea className="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3" value={description}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="author">Author:</label>
                <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;