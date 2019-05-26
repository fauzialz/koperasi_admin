import React from 'react'
import './Dashboard.scss'
import Header from './header';
import Navbar from './navbar';
import ContentSlider from '../contents';
import { ProviderScope, AppContext } from '../../global';
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
                <ProviderScope>
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
                    
            
                </ProviderScope>
            </React.Fragment>
        )
    }
}

export default Dashboard