import React from 'react'
import './Login.scss'
import Logo from '../../logo.svg'
import Input from '../../components/input'
import Button from '../../components/button'
import HelperHTTP from '../../helper/HelperHTTP';

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
        HelperHTTP.request('SIGN_IN', 'post', this.state, (succes, response) => {
            if(succes){
                console.log(response)
                debugger
            }else{
                console.log(response) //response will be filled with error massage
            }
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

