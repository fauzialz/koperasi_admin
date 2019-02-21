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
            <div className="grid-base scrollbar">
                {/* HEADER */}
                <div className="header-menu">
                    <div className="header-menu-wrapper">
                        <Button onClick={this.signOut} label="Sign Out" depressed/>
                    </div>
                </div>
                <div className="grid-header" />

                {/* NAVBAR */}
                <div className="grid-navbar">
                    <div className="navbar">
                        
                    </div>
                </div>

                {/* CONTENT */}
                <div className="grid-content">
                    <div className="content-dummy-base">
                        <div className="content-dummy-wrapper">
                            <div className="content-dummy-title"></div>
                            <div className="content-dummy-table-header"></div>
                            <div className="content-dummy-table-data"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard