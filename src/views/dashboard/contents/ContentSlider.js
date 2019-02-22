import React from 'react'
import './ContentSlider.scss'

class ContentSlider extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="grid-content">
                    <div className="content-dummy-base">
                        <div className="content-dummy-wrapper">
                            <div className="content-dummy-title"></div>
                            <div className="content-dummy-table-header"></div>
                            <div className="content-dummy-table-data"></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ContentSlider