import React from 'react' 
import TextField from '@material-ui/core/TextField'
import './Login.css'

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
                <div className="Login-container">
                    <div className="Login-title">
                        Sign In 
                    </div>

                    <form>
                        {/* <input 
                            type="text"
                            name= "username"
                            placeholder="Username"
                            
                            value={this.state.username}
                            onChange={this.textChange}
                        /> */}
                        <TextField
                            label="Username"
                            name="username"
                            margin="dense"
                            fullWidth
                            value={this.state.username}
                            onChange={this.textChange}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login

