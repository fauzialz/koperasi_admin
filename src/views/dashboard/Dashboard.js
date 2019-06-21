import React from 'react'
import './Dashboard.scss'
import Header from './header';
import Navbar from './navbar';
import ContentSlider from '../contents';
import NotifBar from '../../components/notification_bar';
import Swipe from '../../components/swipe';

class Dashboard extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Swipe>
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
                </Swipe>                    
            </React.Fragment>
        )
    }
}

export default Dashboard