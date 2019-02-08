import React from 'react'
import Button from '@material-ui/core/Button'
import './Login.scss'
import Logo from '../../logo.svg'
import Input from '../../components/input'

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
                            />
                            {
                                this.state.username.length > 4 ?
                                    <Input
                                    password
                                    name="password"
                                    value={this.state.password}
                                    pipeline={this.textChange}
                                    />:''
                            }
                            {
                                this.state.password.length > 4 && this.state.username.length > 4 ?
                                    <Button variant="contained" color="default" fullWidth>
                                        Sign In
                                    </Button>: ''
                            }
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Login

