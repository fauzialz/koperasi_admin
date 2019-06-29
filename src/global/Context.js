//https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
import React from 'react'

const AppContext = React.createContext();

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
            loadingMini: false,
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
    setPhoneMode        = (status) => this.setState({phoneMode : status})
    setNavbarOpen       = (status) => this.setState({navbarOpen : status})
    loadingSwitch       = () =>       this.setState({loading : !this.state.loading})
    loadingMiniSwitch   = () =>       this.setState({loadingMini : !this.state.loadingMini})

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
                loadingMini: this.state.loadingMini,
                loadingMiniSwitch: this.loadingMiniSwitch,
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