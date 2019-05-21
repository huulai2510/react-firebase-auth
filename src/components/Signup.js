import React, { Component } from "react";
import firebase from "../Firebase";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: ""
  };

   componentDidUpdate() {
    if (firebase.getCurrentUsername()) {
      this.props.history.replace("/");
      return null;
    }
  }

  render() {
    return (
      <div className="container mt-5 mx-auto row">
        <div className="panel panel-default col-6 mx-auto">
          <div className="panel-heading">
            <h3 className="panel-title text-center">SIGN UP</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.onRegister}
                >
                  Sign up
                </button>
                <Link
                  type="button"
                  className="btn btn-primary ml-2"
                  to="/login"
                >
                  Have an account?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  onRegister = async () => {
    let { name, email, password } = this.state;
    try {
      await firebase.register(name, email, password);
      this.props.history.replace("/");
    } catch (error) {
      alert(error.message);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
}

export default Signup;
