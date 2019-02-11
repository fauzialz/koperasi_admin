import React from 'react'
import './Login.scss'
import Logo from '../../logo.svg'
import Input from '../../components/input'
import Button from '../../components/button'
import config from '../../config/api.config'
import axios from 'axios'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username : '',
            password : ''
        }
    }

    textChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = () => {
        let option = {
            url: config.API_URL + config.ROUT.sign_in,
            method: "post",
            headers: {
                "Content-Type": config.HEADER.conten_type,
                "ApplicationCode": config.HEADER.application_code
            },
            data: {
                Username: this.state.username,
                Password: this.state.password
            }
        }
        debugger
        axios(option)
        .then(res => {
            console.log(res)
            debugger
        })
        .catch(err => {
            console.log(err)
            debugger
        })
    }

    render() {
        return (
            <div className="Login-base">
                <div className="Login-title">
                    <div><img src={Logo} className="App-logo" alt="logo" /></div>
                    Bee-mart
                </div>
                <div className="Login-container shadow">
                    <div className="Login-container-title">
                        Sign In to continue
                    </div>
                    <div className="Login-content">
                        <form>
                            <Input
                                name="username"
                                value={this.state.username}
                                pipeline={this.textChange}
                                fluid
                            />
                            {
                                this.state.username.length > 4 ?
                                    <Input
                                        passVisibility
                                        fluid
                                        name="password"
                                        value={this.state.password}
                                        pipeline={this.textChange}
                                    />:''
                            }
                            {
                                this.state.password.length > 4 && this.state.username.length > 4 ?
                                    <Button 
                                        fluid
                                        label="Sign In"
                                        pipeline={this.onSubmit}
                                    />: ''
                            }
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Login

