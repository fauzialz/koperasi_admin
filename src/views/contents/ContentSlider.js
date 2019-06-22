import React from 'react'
import './ContentSlider.scss'
import { RouterTierTwo } from '../../Router';
import { AppContext } from '../../global';

class ContentSlider extends React.Component {
    render() {
        return (
            <AppContext.Consumer>
            { (context) => (
                <React.Fragment>
                    <div className={context.navbarOpen ? "content-navbar-open" : "content-navbar-close"}>
                        <RouterTierTwo />
                    </div>
                </React.Fragment>
            )}
            </AppContext.Consumer>
        )
    }
}

export default ContentSlider