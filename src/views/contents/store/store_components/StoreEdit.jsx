import React from 'react'
import ModalForm from '../../../../components/modal_form';
import ConfigLocal from '../../../../config/ConfigLocal';
import { AppContext } from '../../../../global';
import HelperHttp from '../../../../helper/HelperHttp';
import ConfigApi from '../../../../config/ConfigApi';
import { storeModel } from '../../../../model/ModelComponents';

const StoreEdit = (props) => {
    const context = React.useContext(AppContext)
    const onSubmit = (data) => {
        window.event.preventDefault()
        context.loadingSwitch()

        HelperHttp.put(ConfigApi.ROUTE.STORE, data.Id, data.Etag, storeModel(data), (res) => {
            context.loadingSwitch()
            if(res.status === 200 && res.success) {
                context.setNotif(
                    'Store data edited.', ConfigLocal.NOTIF.Success
                )
            }else{
                context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
            props.close()
            props.reload(false)
        })

    }

    return (
        <ModalForm
            title="Edit Store Data"
            dataNow={props.rowData}
            open={props.open}
            onSubmit={onSubmit}
            onClose={props.close}
            focusIf="Name"
            names={ConfigLocal.COMPONENTS.StoreInputNames}
        />
    )
}

export default StoreEdit