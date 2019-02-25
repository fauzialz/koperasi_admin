import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';
import Icon from '../../../components/icon';

class Navbar extends React.Component {
    state = {
        navList : []
    }

    getNavigationList = () => {
        HelperHttp.request(ConfigApi.ROUTE.MENU, ConfigApi.METHODS.GET, {},
            (success, response) => {
                if(success){
                    let list = response.Result
                    this.setState({
                        navList : list
                    })
                }
            }
        )
    }    

    componentDidMount() {
        this.getNavigationList()
    }

    render() {
        return (
            <React.Fragment>
                <div className="grid-navbar">
                    <div className="navbar">
                        <div className="navbar-tile">
                            <div className="navbar-icon">
                                <Icon 
                                    iconName="home"
                                />
                            </div>
                        </div>
                        <div className="navbar-tile">
                            <div className="navbar-icon">
                                <Icon 
                                    iconName="dashboard"
                                />
                            </div>
                        </div>
                        <div className="navbar-tile">
                            <div className="navbar-icon">
                                <Icon 
                                    iconName="settings"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar