import React from 'react' 
/* import TextField from '@material-ui/core/TextField'
import InputBase from '@material-ui/core/InputBase'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
 */
import Button from '@material-ui/core/Button'
import './Login.scss'
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
                <div className="Login-container shadow">
                    <div className="Login-title">
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
                                this.state.username.length > 5 ?
                                    <Input
                                    name="password"
                                    value={this.state.password}
                                    pipeline={this.textChange}
                                    />:''
                            }
                            {
                                this.state.password.length > 5 && this.state.username.length > 5 ?
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

