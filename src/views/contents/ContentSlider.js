import React from 'react'
import './ContentSlider.scss'
import { RouterTierTwo } from '../../Router';

class ContentSlider extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="content-base">
                    <div className={this.props.open ? "content-navbar-open" : "content-navbar-close"}>
                        <div className="content-square">
                            <div className="content-socket">
                            
                                {/* CONTENT SWITCHER */}
                                {/* <div className="content-dummy-wrapper">
                                    <div className="content-dummy-title"></div>
                                    <div className="content-dummy-table-header"></div>
                                    <div className="content-dummy-table-data"></div>
                                </div> */}
                                <RouterTierTwo />

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ContentSlider