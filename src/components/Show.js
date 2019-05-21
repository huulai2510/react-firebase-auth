import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }
  
  componentDidUpdate() {
    if (!firebase.getCurrentUsername()) {
      this.props.history.replace("/login");
      return null;
    }

  }

  componentDidMount() {
    const ref = firebase.db.collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete = id => {
    firebase.db.collection('boards').doc(id).delete().then(() => {
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  logout = async () => {
    await firebase.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading mt-3">
          <h3 className="panel-title d-inline-block">POST DETAILS</h3>
            <button
              className="btn btn-outline-primary btn-sm ml-2 mb-2"
              onClick={this.logout}
            >
              log out
            </button>
            <br/>
          <Link to="/" className="btn btn-primary my-3">Board List</Link>
            <h3 className="panel-title">
              {this.state.board.title}
            </h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.board.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;
            <button onClick={() => this.delete(this.state.key)} className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;