import React from 'react'
import './Dashboard.scss'
import Header from './header';
import Navbar from './navbar';
import ContentSlider from '../contents';
import NotifBar from '../../components/notification_bar';
import Swipe from 'react-easy-swipe';
import { AppContext } from '../../global';

class Dashboard extends React.Component {
    static contextType = AppContext 
    onSwipeRight = () => {
        this.context.setNavbarOpen(true)
    }
    onSwipeLeft = () => {
        this.context.setNavbarOpen(false)
    }
    
    render() {
        return (
            <React.Fragment>
                <Swipe
                    onSwipeRight={this.onSwipeRight}
                    onSwipeLeft={this.onSwipeLeft}
                >
                    <div className="wrapper-core">

                        {/* NAVBAR */}
                        <Navbar
                            history = {this.props.history}
                            match= {this.props.match}
                            />

                        <NotifBar/>

                        {/* HEADER */}
                        <Header />
                            
                        {/* CONTENT */}
                        <ContentSlider />     
                    
                    </div>
                </Swipe>
            </React.Fragment>
        )
    }
}

export default Dashboard