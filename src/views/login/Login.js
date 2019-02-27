import React from 'react'
import './Login.scss'
import Logo from '../../logo.svg'
import Input from '../../components/input'
import Button from '../../components/button'
import Loading from '../../components/loading'
import HelperHttp from '../../helper/HelperHttp'
import HelperCookie from '../../helper/HelperCookie'
import ConfigLocal from '../../config/ConfigLocal';
import ConfigApi from '../../config/ConfigApi';

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            formdata: {
                username : '',
                password : ''
            },
            loading: false,
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

    onSubmit = () => {
        this.setState({loading : true})
        HelperHttp.request(ConfigApi.ROUTE.SIGN_IN, ConfigApi.METHODS.POST, this.state.formdata,
        (succes, response) => {
            this.setState({
                loading : false,
                msg: response.Message
            })
            if(succes){
                HelperCookie.set(ConfigLocal.TOKEN, response.Result.Token, response.Result.Expires)
                this.props.history.push('/dashboard')
            }else{
                this.setState({
                    errStyle : 'error'
                })
                setTimeout(() => {
                    this.setState({errStyle: "afterError"})
                }, 1000);
            }
        })
    }

    componentDidMount(){
        if(HelperCookie.get(ConfigLocal.TOKEN)){
            this.props.history.push('/dashboard')
        } 
    }

    render() {
        return (
            <div className="Login-base">
                
                {this.state.loading && <Loading />}
                
                <div className="Login-title">
                    <div><img src={Logo} className="App-logo" alt="logo" /></div>
                    Bee-mart
                </div>

                <div className="Login-container">

                    <div className={this.state.msg? this.state.errStyle : "neutral"}>
                        {this.state.msg || "Sign In to continue"}
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
                                this.state.formdata.password.length > 4 &&
                                this.state.formdata.username.length > 4 ?
                                    <div className="button-gap">
                                        <Button 
                                            fluid
                                            label="Sign In"
                                            onClick={this.onSubmit}
                                        />
                                    </div>: ''
                            }
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

