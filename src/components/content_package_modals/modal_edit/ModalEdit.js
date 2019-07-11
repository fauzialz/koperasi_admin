import React from 'react'
import { AppContext } from '../../../global';
import HelperHttp from '../../../helper/HelperHttp';
import ModelComponents from '../../../model/ModelComponents';
import ConfigLocal from '../../../config/ConfigLocal';
import ModalForm from '../../modal_form';

const ModalEdit = (props) => {
    const context = React.useContext(AppContext)
    const onSubmit = async (data) => {
        window.event.preventDefault()
        context.loadingSwitch()
        let res = await HelperHttp.put(props.url, data.Id, data.Etag, ModelComponents[props.tableName](data))
        context.loadingSwitch()
        if(res.status === 200 && res.success) {
            context.setNotif( `${props.tableName} data successfully edited.`, ConfigLocal.NOTIF.Success )
        }else{
            context.setNotif( res.message, ConfigLocal.NOTIF.Error )
        }
        props.close()
        props.reload(props.currentPage)
    }
    return (
        <ModalForm
            title={`Edit ${props.tableName} Data`}
            dataNow={props.data}
            open={props.open}
            onSubmit={onSubmit}
            onClose={props.close}
            focusIf={props.names[0]}
            names={props.names}
        />
    )
}

export default ModalEdit