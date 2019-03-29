import React from 'react'
import './NotifBar.scss'
import { AppContext } from '../../context_provider';

class NotifBar extends React.Component {
    state = {
        hover: false
    }
    hoverOn = () => {
        this.setState({
            hover: true
        })
    }
    hoverOff = () => {
        this.setState({
            hover: false
        })
    }
    render() {  
        return (
            <AppContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="notifbar-base">
                            <div onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}
                                onClick={() => context.closeNotif()}
                                className={context.notif.msg? 
                                    "notifbar "+context.notif.status :
                                    "notifbar-off"
                                }
                            >
                                <div className="notifbar-text">
                                    {this.state.hover ? 
                                        "Click to close this notification."
                                        : context.notif.msg}
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </AppContext.Consumer>
        )
    }
}

export default NotifBar