//https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
import React/* , { useState } */ from 'react'

const AppContext = React.createContext();

/* const ProviderScope = (props) => {
    const [ notifBar, setNotifBar ] = useState({
        notif : {
            msg : '',
            status : ''
        },
        count : 0,
        interval : ''
    })
    var localCount = 0;
    // const { setNotif, deleteNotif, data } = NotifBarController()

    const timer = () => {
        localCount++
        if (localCount <= 10) {
            setNotifBar(notifBar => ({...notifBar, count : localCount}))
            console.log(localCount)
        }else{
            deleteNotif()
        }
    }

    const deleteNotif = () => {
        const temp = {
            msg : '',
            state : ''
        }
        debugger
        setNotifBar({...notifBar, notif : temp, count : 0})
        localCount = 0
        debugger
        clearInterval(notifBar.interval)
    }

    const setNotif = (msg, status) => {
        const temp = {
            msg : msg,
            status : status
        }
        let interval = setInterval(() => {
            timer(0)
        }, 500)
        debugger
        setNotifBar({...notifBar, notif : temp, count : 0, interval: interval})
        
        debugger
    }

    return (
        <AppContext.Provider value={{
            notif : notifBar.notif,
            seconds: notifBar.count,
            setNotif: setNotif,
            closeNotif : deleteNotif
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
 */
class ProviderScope extends React.Component {

    constructor(props) {
        super(props) 
        this.state ={
            phoneMode : window.innerWidth <= 485 ? true: false,
            navbarOpen: window.innerWidth <= 485 ? false: true,
            notif : {
                msg : '',
                status : ''
            },
            count : 0,
            interval : '',
            loading: false,
        }
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
    setPhoneMode = (status) => {
        this.setState({phoneMode : status})
    }
    setNavbarOpen = (status) => {
        this.setState({navbarOpen : status})
    }
    loadingSwitch = () => {
        this.setState({loading : !this.state.loading})
    }

    render() {
        return (
            <AppContext.Provider value={{
                phoneMode: this.state.phoneMode,
                setPhoneMode: this.setPhoneMode,
                navbarOpen: this.state.navbarOpen,
                setNavbarOpen: this.setNavbarOpen,
                notif : this.state.notif,
                closeNotif : this.deleteNotif,
                setNotif: this.setNotif,
                seconds: this.state.count,
                loading: this.state.loading,
                loadingSwitch: this.loadingSwitch,
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