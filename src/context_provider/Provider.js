import React from 'react'

const AppContext = React.createContext();

class ProviderScope extends React.Component {
    state = {
        notif : {
            msg : '',
            status : ''
        }
    }

    deleteNotif = () => {
        const temp = {
            msg : '',
            state : ''
        }
        this.setState({
            notif: temp
        })
    }

    setNotif = (msg, status) => {
        let statusChange = ''
        const temp = {
            msg : msg,
            status : status
        }
        this.setState({
            notif: temp
        })
    
        switch(status) {
            case 'success':
                statusChange = 'afterSuccess'
                break
            case 'error':
                statusChange = 'afterError'
                break
            case 'alert':
                statusChange = 'afterAlert'
                break
            default:
                statusChange = status
        }
        
        temp.status = statusChange
        setTimeout(() => {
            this.setState({notif : temp})
        }, 2000)
        setTimeout(() => {
            this.deleteNotif()
        }, 6000);
    }

    render() {
        return (
            <AppContext.Provider value={{
                notif : this.state.notif,
                closeNotif : this.deleteNotif,
                setNotif: this.setNotif
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export {
    AppContext,
    ProviderScope,
}