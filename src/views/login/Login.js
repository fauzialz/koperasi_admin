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
        HelperHttp.request('SIGN_IN', 'post', this.state.formdata,
        (succes, response) => {
            if(succes){
                this.setState({
                    loading : false,
                    msg: response.Message
                })
                HelperCookie.set(ConfigLocal.TOKEN, response.Result.token, response.Result.expires)
                this.props.history.push('/dashboard')
            }else{
                this.setState({
                    loading : false,
                    msg : response,
                    errStyle : 'error'
                })
                setTimeout(() => {
                    this.setState({errStyle: "afterError"})
                }, 2000);
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

                <div className="Login-container shadow">

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

