import React from 'react'
import './Dashboard.scss'
import Button from '../../components/button';
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal'

class Dashboard extends React.Component {
    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="grid-base">
                {/* HEADER */}
                <div className="header-right-component">
                    <Button onClick={this.signOut} label="Sign Out" depressed/>
                </div>
                <div className="grid-header" />

                {/* NAVBAR */}
                <div className="grid-navbar">
                    <div className="navbar">
                        
                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid-content">

                </div>
            </div>
        )
    }
}

export default Dashboard