import React, { Component } from "react";
import firebase from "../Firebase"
import { Link } from "react-router-dom"

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidUpdate() {
    if (firebase.getCurrentUsername()) {
      this.props.history.replace("/");
      return null;
    }
  }

  render() {
    return (
      <div className="container mt-5 row mx-auto">
        <div className="panel panel-default col-6 mx-auto">
          <div className="panel-heading">
            <h3 className="panel-title text-center">LOG IN</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
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
              <div className="text-center">
                <button type="button" className="btn btn-success" onClick={this.login}>
                  Log in
                </button>
                <Link type="button" className="btn btn-primary ml-2" to="/signup">
                  New to Project?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  login = async () => {
		try {
			await firebase.login(this.state.email, this.state.password)
			this.props.history.replace('/')
		} catch(error) {
			alert(error.message)
		}
	}
}

export default Login;
