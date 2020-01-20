import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../redux/reducers/authReducer';
import { logoutUser } from '../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getSession();
    }

    render() {
        const { first_name } = this.props;
        return(
            <div className="NavBar-container">
                <div>DisneyBounders District</div>
                <ul>
                    <li>Hi, {first_name}</li>
                    <li>
                        <Link to="/home">
                            <button>Home</button>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addadisneybound">
                            <button>Add a DisneyBound</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={`bounder/${this.props.username}`}>
                            <button>My Profile</button>
                        </Link>
                    </li>
                        <Link to="/">
                            <button onClick={this.props.logoutUser}>See ya real soon</button>
                        </Link>
                </ul>
            </div> 
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.authReducer.user_id,
        username: reduxState.authReducer.username,
        first_name: reduxState.authReducer.first_name
    }
}

export default connect(mapStateToProps, { getSession, logoutUser })(NavBar);