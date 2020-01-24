import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducers/authReducer';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLogin = () => {
        const { loginUser } = this.props;
        const { username, password } = this.state;

        loginUser({ username, password })
    }

    render() {
        if (this.props.user_id) {
            return <Redirect to="/home" />
        }
        return (
            <div>
                <input name="username" placeholder="Username" value={this.state.username} onChange={this.handleChange}/>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.handleLogin}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id
    }
}

export default connect(mapStateToProps, { loginUser })(Login);