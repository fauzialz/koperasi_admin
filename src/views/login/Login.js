import React from 'react'
import './Login.scss'
import Logo from '../../logo.svg'
import Input from '../../components/input'
import Button from '../../components/button'
import Loading from '../../components/loading'
import HelperHttp from '../../helper/HelperHttp'
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            formdata: {
                username : '',
                password : ''
            },
            loading: false
        }
    }

    textChange = e => {
        let tmp=this.state.formdata
        tmp[e.target.name]=e.target.value
        this.setState({
            formdata:tmp
        })
    }

    onSubmit = () => {
        this.setState({loading : true})
        HelperHttp.request('SIGN_IN', 'post', this.state.formdata, (succes, response) => {
            if(succes){
                this.setState({loading : false})
                HelperCookie.setItem(
                    ConfigLocal.STORAGE.TOKEN,
                    response.Result.Token,
                    response.Result.Expires
                )
                debugger
                alert(response.Message)
            }else{
                this.setState({loading : false})
                alert(response) //response will be filled with error massage
            }
        })
    }

    render() {
        return (
            <div className="Login-base">
                
                {this.state.loading && <Loading />}
                
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
                                this.state.formdata.password.length > 4 && this.state.formdata.username.length > 4 ?
                                    <Button 
                                        fluid
                                        label="Sign In"
                                        onClick={this.onSubmit}
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

