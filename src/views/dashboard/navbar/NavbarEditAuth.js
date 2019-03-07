import React from 'react';
import ModalFrame from '../../../components/modal_frame';
import Input from '../../../components/input';
import HelperCookie from '../../../helper/HelperCookie';
import ConfigLocal from '../../../config/ConfigLocal';
import ConfigApi from '../../../config/ConfigApi';
import HelperHttp from '../../../helper/HelperHttp'

class NavbarEditAuth extends React.Component {
    state = {
        password : ''
    }
    
    textChange= e => {
        this.setState({password:e.target.value})
    }

    onSubmit = () => {
        this.props.loading()
        let formdata = {
            username : HelperCookie.get(ConfigLocal.USERNAME),
            password : this.state.password
        }
        debugger
        HelperHttp.request(ConfigApi.ROUTE.SIGN_IN, ConfigApi.METHODS.POST, formdata,
        (success, response) => {
            this.props.loading()
            if(success){
                this.props.editSession()
            }
            this.onClose()
        })
    }

    onClose = () => {
        this.setState({password: ''})
        this.props.onClose()
    }

    render () {
        const { open } = this.props
        return (
            <ModalFrame 
                title="Authentication" 
                open={open} 
                onBtnR={this.onClose}
                onBtnL={this.onSubmit}
            >
                Enter your password to edit the navigation menu.
                <Input
                    passVisibility
                    fluid
                    name="password"
                    value={this.state.password}
                    onChange={this.textChange}
                />
            </ModalFrame>
        )
    }
}

export default NavbarEditAuth