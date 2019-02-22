import React from 'react'
import './Header.scss'
import Button from '../../../components/button';
import HelperCookie from '../../../helper/HelperCookie';
import ConfigLocal from '../../../config/ConfigLocal';
import { withRouter } from 'react-router-dom'

class Header extends React.Component {
    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <div className="header-menu">
                    <div className="header-menu-wrapper">
                        <Button onClick={this.signOut} label="Sign Out" depressed/>
                    </div>
                </div>
                <div className="grid-header" />
            </React.Fragment>
        )
    }
}

export default withRouter(Header)