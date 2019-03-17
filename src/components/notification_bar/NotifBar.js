import React from 'react'
import './NotifBar.scss'
import { AppContext } from '../../context_provider';
import Icon from '../icon';

class NotifBar extends React.Component {
    
    render() {  
        return (
            <AppContext.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="notifbar-base">
                            <div className={context.notif.msg? 
                                "notifbar "+context.notif.status :
                                "notifbar-off"
                            }>
                                <div className="notifbar-text">
                                    {context.notif.msg}
                                </div>
                                {context.notif.msg?
                                    <div className="notifbar-button">
                                        <Icon 
                                            iconName= "close"
                                            title1= "Close Notification"
                                            verysmall
                                            onClick={ () => context.closeNotif()}
                                        />
                                    </div>: null
                                }
                            </div>
                        </div>
                    </React.Fragment>
                )}
            </AppContext.Consumer>
        )
    }
}

export default NotifBar