import React from 'react';
import Input from '../../../components/input';
import HelperCookie from '../../../helper/HelperCookie';
import ConfigLocal from '../../../config/ConfigLocal';
import ConfigApi from '../../../config/ConfigApi';
import HelperHttp from '../../../helper/HelperHttp'
import Modal from '../../../components/modal';
import { AppContext } from '../../../global';

class NavbarEditAuth extends React.Component {
    static contextType = AppContext

    state = {
        password : ''
    }
    
    textChange= e => {
        this.setState({password:e.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.loading()
        this.context.closeNotif()
        let formdata = {
            username : HelperCookie.get(ConfigLocal.USERNAME),
            password : this.state.password
        }
        HelperHttp.request(ConfigApi.ROUTE.SIGN_IN, ConfigApi.METHODS.POST, formdata,
        (success, response) => {
            this.props.loading()
            if(success){
                this.props.editSession()
                this.context.setNotif('Password correct. You can edit navigation menu.',ConfigLocal.NOTIF.Success)
            }else{
                this.context.setNotif('Password incorrect. Access denied!',ConfigLocal.NOTIF.Error)
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
            <Modal
                title="Authentication" 
                open={open} 
                onBtnR={this.onClose}
                onBtnL={this.onSubmit}
                form
                compact
            >
                Enter your password to edit the navigation menu.
                <Input
                    passVisibility
                    fluid
                    name="password"
                    value={this.state.password}
                    onChange={this.textChange}
                    autoFocus
                    focusEvery={open}
                />
            </Modal>
        )
    }
}

export default NavbarEditAuth