import React from 'react';
import ModalForm from '../../../components/modal_form';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';
import { AppContext } from '../../../context_provider';
import ConfigLocal from '../../../config/ConfigLocal';

class NavbarEdit extends React.Component {
    static contextType = AppContext

    onSubmit = (data) => {
        let input = {
            Id: data.Id,
            Name: data.Name,
            Description: data.Description,
            Icon: data.Icon,
            Endpoint: data.Endpoint,
            Order: data.Order,
            ParentId: data.ParentId,
            Etag: data.Etag
        }
        this.props.loading()
        this.context.closeNotif()
        HelperHttp.request(ConfigApi.ROUTE.MENU, ConfigApi.METHODS.PUT, input,
            (success, response) => {
                this.props.loading()
                if(success){
                    this.props.hotReload()
                    setTimeout(() => {
                        this.context.setNotif('Data edited.',ConfigLocal.NOTIF.Success)
                    }, 800);
                }else(
                    alert(data.Etag)
                )
                this.props.onClose()
            }    
        )
    }

    render () {
        const { open, dataNow, onClose } = this.props
        const names = ['Name', 'Description', 'Icon', 'Endpoint']
        return (
            <React.Fragment>
                <ModalForm 
                    title="Navigation Menu Setting"
                    open={open} 
                    names={names}
                    dataNow={dataNow}
                    onSubmit={this.onSubmit}
                    onClose={onClose}
                    btnL="Edit"
                    focusIf="Name"
                />
            </React.Fragment>
        )
    }
}

export default NavbarEdit