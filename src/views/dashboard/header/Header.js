import React from 'react'
import './Header.scss'
import Button from '../../../components/button';
import HelperCookie from '../../../helper/HelperCookie';
import ConfigLocal from '../../../config/ConfigLocal';
import { withRouter } from 'react-router-dom'
import ButtonBurger from '../../../components/button_burger';
import { AppContext } from '../../../global';

class Header extends React.Component {
    static contextType = AppContext

    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        HelperCookie.delete(ConfigLocal.USERNAME)
        HelperCookie.delete(ConfigLocal.NAVBAR)
        this.props.history.push('/')
    }

    onBurgerButtonClick = () => {
        this.context.setNavbarOpen(!this.context.navbarOpen)
    }

    render() {
        return (
            <AppContext.Consumer>
            { (context) => (
                <React.Fragment>
                    <div className="grid-header">
                        {/* DRAWER BUTTON */}
                        <div className="header-drawer" onClick={this.onBurgerButtonClick}>
                            <div className="header-wrapper">
                                {/* ICON */}
                                <div className={ context.navbarOpen ?
                                    "drawer-active" :
                                    "drawer"
                                }>
                                    <div className="drawer-icon">
                                        <ButtonBurger active={context.navbarOpen} />
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
            )}
            </AppContext.Consumer>
        )
    }
}

export default withRouter(Header)