import React from 'react'
import './Navbar.scss'
import HelperHttp from '../../../helper/HelperHttp'
import ConfigApi from '../../../config/ConfigApi';

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
                        aasdasdasdasdasdasd
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar