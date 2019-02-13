import React from 'react'
import './Loading.scss'

class Loading extends React.Component {
    /* ACCESS:
        { this.state.youerState && <Loading />} <= this is common syntax
        yourState (you can change the name) will provide boolean value.
        Change the state for on/off the loading screen.
        ref: https://loading.io/css/
    */
    render() {
        return (
            <div className="Loading-mask">
                <div className="Loading-wrapper">
                    <div className="Loading" >
                        {/* this is he spinner */}
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading