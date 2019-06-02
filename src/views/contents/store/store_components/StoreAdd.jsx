import React from 'react'
import ModalForm from '../../../../components/modal_form';
import HelperHttp from '../../../../helper/HelperHttp';
import ConfigApi from '../../../../config/ConfigApi';
import { AppContext } from '../../../../global';
import ConfigLocal from '../../../../config/ConfigLocal';

class StoreAdd extends React.Component {
    static contextType = AppContext
    state = {
        names : ['Name', 'Address', 'Telephone', 'Email']
    }
    
    onSubmit = (data) => {
        window.event.preventDefault()

        HelperHttp.post(ConfigApi.ROUTE.STORE, data, (res) => {
            if(res.status === 200 && res.success) {
                this.props.reload()
                this.context.setNotif(
                    'New Store added.', ConfigLocal.NOTIF.Success
                )
            }
            this.props.close()
        })
    }
    
    render() {
        return (
            <ModalForm 
                title="Create New Store"
                open={this.props.open} 
                onSubmit={this.onSubmit}
                onClose={this.props.close}
                focusIf="Name"
                names={this.state.names}
            />
        )
    }
}

export default StoreAdd