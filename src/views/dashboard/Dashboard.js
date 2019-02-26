import React from 'react'
import './Dashboard.scss'
/* import Button from '../../components/button'; */
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal'
import Header from './header';
import Navbar from './navbar';
import ContentSlider from './contents';

class Dashboard extends React.Component {
    state = {
        drawer : false
    }

    signOut = () => {
        HelperCookie.delete(ConfigLocal.TOKEN)
        this.props.history.push('/')
    }

    drawerHandler = () => {
        this.setState({
            drawer : !this.state.drawer
        })
    }

    render() {
        return (
            <React.Fragment>

            {/* HEADER */}
            <Header />

            {/* NAVBAR */}
            <Navbar
                open= {this.state.drawer}
                onClick= {this.drawerHandler}    
            />

            {/* CONTENT */}
            <ContentSlider 
                open= {this.state.drawer}
            />     
            
            </React.Fragment>
        )
    }
}

export default Dashboard