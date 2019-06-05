import React from 'react'
import ModalForm from '../../../../components/modal_form';
import HelperHttp from '../../../../helper/HelperHttp';
import ConfigApi from '../../../../config/ConfigApi';
import { AppContext } from '../../../../global';
import ConfigLocal from '../../../../config/ConfigLocal';

class StoreAdd extends React.Component {
    static contextType = AppContext
    state = {
        child : React.createRef()
    }
    
    onSubmit = (data) => {
        window.event.preventDefault()
        this.context.loadingSwitch()

        HelperHttp.post(ConfigApi.ROUTE.STORE, data, (res) => {
            if(res.status === 200 && res.success) {
                this.props.reload()
                this.context.setNotif(
                    'New Store added.', ConfigLocal.NOTIF.Success
                )
            }else{
                this.context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
            this.context.loadingSwitch()
            this.state.child.current.clearInput()
            this.props.close()
        })
    }
    
    render() {
        return (
            <ModalForm 
                ref={this.state.child}
                title="Create New Store"
                open={this.props.open} 
                onSubmit={this.onSubmit}
                onClose={this.props.close}
                focusIf="Name"
                names={ConfigLocal.COMPONENTS.StoreInputNames}
            />
        )
    }
}

export default StoreAdd