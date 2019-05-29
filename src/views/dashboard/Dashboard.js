import React from 'react'
import './Dashboard.scss'
import Header from './header';
import Navbar from './navbar';
import ContentSlider from '../contents';
import { AppContext } from '../../global';
import NotifBar from '../../components/notification_bar';

class Dashboard extends React.Component {
    static contextType = AppContext
    
    checkDimention = () => {
        if (window.innerWidth <= 485) {
            this.context.setNavbarOpen(false)
        }
    }

    componentDidMount() {
        this.checkDimention()
    }

    render() {
        return (
            <React.Fragment>
                <div>

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
            </React.Fragment>
        )
    }
}

export default Dashboard