import React from 'react'
import './Login.scss'
import Logo from '../../logo.svg'
import Input from '../../components/input'
import Button from '../../components/button'
import HelperHttp from '../../helper/HelperHttp'
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal';
import ConfigApi from '../../config/ConfigApi';
import { AppContext } from '../../global';

class Login extends React.Component {
    static contextType = AppContext
    constructor() {
        super()
        this.state = {
            formdata: {
                username : '',
                password : ''
            },
            msg: '',
            errStyle: 'afterError'
        }
    }

    textChange = e => {
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    onSubmit = async () => {
        window.event.preventDefault()
        this.context.loadingSwitch()
        let res = await HelperHttp.post(ConfigApi.ROUTE.SIGN_IN, this.state.formdata)
        this.context.loadingSwitch()
        if(res.success) {
            debugger
            HelperCookie.set(ConfigLocal.TOKEN, res.data.Token, res.data.Expires)
            HelperCookie.set(ConfigLocal.USERNAME, res.data.Username,  res.data.Expires)
            HelperCookie.set(ConfigLocal.NAVBAR, true)
            this.props.history.push('/dashboard')
        } else {
            console.log(res)
            this.setState({ msg: res.message, errStyle : 'error' })
            setTimeout(() => {
                this.setState({errStyle: "afterError"})
            }, 1000);
        }
    }

    componentDidMount(){
        if(HelperCookie.get(ConfigLocal.TOKEN)){
            this.props.history.push('/dashboard')
        }else{
            localStorage.removeItem(ConfigLocal.LOCSTORE.Navbar)
            localStorage.removeItem('ruulzIndex')
        }
    }

    render() {
        return (
            <div className="Login-base">
                
                <div className="Login-center">

                    <div className="Login-title">
                        <div><img src={Logo} className="App-logo" alt="logo" /></div>
                        Bee-mart
                    </div>

                    <div className="Login-container">

                        <div className={this.state.msg? this.state.errStyle : "neutral"}>
                            {this.state.msg || "Login to continue"}
                        </div>
                        
                        <div className="Login-content">
                            <form onSubmit={this.onSubmit}>
                                <Input
                                    name="username"
                                    value={this.state.formdata.username}
                                    onChange={this.textChange}
                                    fluid
                                />
                                {
                                    this.state.formdata.username.length > 4 ?
                                        <Input
                                            passVisibility
                                            fluid
                                            name="password"
                                            value={this.state.formdata.password}
                                            onChange={this.textChange}
                                        />:''
                                }
                                {
                                    this.state.formdata.password.length > 4 &&
                                    this.state.formdata.username.length > 4 ?
                                        <div className="button-gap">
                                            <Button 
                                                fluid
                                                type="submit"
                                                label="Login"
                                                onSubmit={this.onSubmit}
                                            />
                                        </div>: ''
                                }
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

