//https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
import React from 'react'

const AppContext = React.createContext();

class ProviderScope extends React.Component {
    state = {
        notif : {
            msg : 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            status : ''
        },
        count : 0,
        interval : ''
    }

    timer = () => {
        let count = this.state.count + 1
        if (count <= 10) {
            this.setState({count:count})
        }else{
            this.deleteNotif()
        }
    }

    deleteNotif = () => {
        const temp = {
            msg : '',
            state : ''
        }
        this.setState({
            notif: temp,
            count : 0
        })
        clearInterval(this.state.interval)
    }

    setNotif = (msg, status) => {
        const temp = {
            msg : msg,
            status : status
        }
        this.setState({
            notif: temp,
            count : 0
        })
        let interval = setInterval(() => {
            this.timer()
        }, 500)
        this.setState({interval:interval})
    }

    render() {
        return (
            <AppContext.Provider value={{
                notif : this.state.notif,
                closeNotif : this.deleteNotif,
                setNotif: this.setNotif,
                seconds: this.state.count
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