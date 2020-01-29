import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSession } from '../../redux/reducers/authReducer';
import { logoutUser } from '../../redux/reducers/authReducer';
import { Link } from 'react-router-dom';
import header_logo from '../../stylesheets/design_elements/disneybounders-district-logo-white.png'

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            menuStatus: 'drop-down-menu'
        }
    }

    componentDidMount() {
        this.props.getSession();
    }

    handleClick = () => {
        if (this.state.menuStatus === 'drop-down-menu-open') {
            this.setState({ menuStatus: 'drop-down-menu-closed' })
        } else {
            this.setState({ menuStatus: 'drop-down-menu-open' })
        }
    }

    render() {
        const { first_name } = this.props;
        return (
            <div className="nav-bar-container">
                <img id="nav-bar-logo" alt="DisneyBounders District" src={header_logo} />
                <div id="greeting">
                    {this.props.user_id ?
                        <div>
                            Hi, {first_name}
                        </div>
                        : null}
                </div>
                <ul>
                    <li className="list-item">
                        <Link to="/home">
                            <button className="nav-bar-button">Hall Closet</button>
                        </Link>
                    </li>
                    <li className="list-item">
                        <Link to={`bounder/${this.props.username}`}>
                            <button className="nav-bar-button">Your Closet</button>
                        </Link>
                    </li>
                    <li className="list-item">
                        <Link to="/addadisneybound">
                            <button className="nav-bar-button">Hang a DisneyBound</button>
                        </Link>
                    </li>
                    <li className="list-item">
                        <Link to="/">
                            <button className="nav-bar-button">Login</button>
                        </Link>
                    </li>
                    <li className="list-item">
                        <Link to="/">
                            <button className="nav-bar-button" onClick={this.props.logoutUser}>See 'Ya Real Soon</button>
                        </Link>
                    </li>
                    <li>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                            <button className="hamburger-menu-button"
                                onClick={this.handleClick}
                                ><i class="fa fa-bars"></i></button>
                        </li>
                        <ul className={this.state.menuStatus}>
                            <li>Hall Closet</li>
                            <li>Your Closet</li>
                            <li>Hang A DisneyBound</li>
                            <li>Login</li>
                            <li>See 'Ya Real Soon!</li>
                        </ul>
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