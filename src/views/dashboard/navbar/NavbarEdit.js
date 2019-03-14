import React from 'react';
import ModalForm from '../../../components/modal_form';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigApi from '../../../config/ConfigApi';

class NavbarEdit extends React.Component {

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
        HelperHttp.request(ConfigApi.ROUTE.MENU, ConfigApi.METHODS.PUT, input,
            (success, response) => {
                debugger
                this.props.loading()
                if(success){
                    alert('DATA EDITED')
                    this.props.hotReload()
                }else(
                    alert(data.Etag)
                )
                this.props.onClose()
            }    
        )
    }

    render () {
        const { open, dataNow, onClose } = this.props
        const names = ['Id', 'Code', 'Name', 'Description', 'Icon']
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