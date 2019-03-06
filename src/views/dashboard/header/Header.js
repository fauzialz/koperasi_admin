import React from 'react'
import './Header.scss'
import Button from '../../../components/button';
import Icon from '../../../components/icon';
import HelperCookie from '../../../helper/HelperCookie';
import ConfigLocal from '../../../config/ConfigLocal';
import { withRouter } from 'react-router-dom'


class Header extends React.Component {
    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        HelperCookie.delete(ConfigLocal.USERNAME)
        this.props.history.push('/')
    }

    render() {
        return (
            <React.Fragment>
                <div className="grid-header">
                    {/* DRAWER BUTTON */}
                    <div className="header-drawer">
                        <div className="header-wrapper">
                            {/* ICON */}
                            <div className={ this.props.open ?
                                "drawer-active" :
                                "drawer"
                            }>
                                <div className="drawer-icon">
                                    <Icon 
                                        iconName="menu"
                                        onClick={this.props.onClick}
                                        title1="Navigation Bar"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT MENU */}
                    <div className="header-menu">
                        <div className="header-wrapper">
                            <Button onClick={this.signOut} label="Sign Out" depressed/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(Header)