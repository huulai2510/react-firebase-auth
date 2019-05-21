import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import firebase from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.db.collection("boards");
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
  }

  logout = async () => {
    await firebase.logout();
    this.props.history.push("/");
  };

  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc,
        title,
        description,
        author
      });
    });
    this.setState({
      boards
    });
  };

  componentDidUpdate() {
    if (!firebase.getCurrentUsername()) {
      this.props.history.replace("/login");
      return null;
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading mt-3">
            <h3 className="panel-title d-inline-block">POST LIST</h3>
            <button
              className="btn btn-outline-primary btn-sm ml-2 mb-2"
              onClick={this.logout}
            >
              log out
            </button>
          </div>
          <div className="panel-body">
            <Link to="/create" className="btn btn-primary mb-2">
              Add Post
            </Link>
            <table className="table table-stripe text-center">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map((board, index) => (
                  <tr key={index}>
                    <td>
                      <Link to={`/show/${board.key}`}>{board.title}</Link>
                    </td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
}

export default App;
