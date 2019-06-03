import React, { useContext } from 'react'
import Modal from '../../../../components/modal';
import './StoreComponents.scss'
import { AppContext } from '../../../../global';
import HelperHttp from '../../../../helper/HelperHttp';
import ConfigApi from '../../../../config/ConfigApi';
import ConfigLocal from '../../../../config/ConfigLocal';

const StoreDelete = (props) => {
    const context = useContext(AppContext)
    const onYes = () => {
        context.loadingSwitch()
        HelperHttp.delete(ConfigApi.ROUTE.STORE, props.rowData.Id, props.rowData.Etag, (res) => {
            if(res.status === 200 && res.success) {
                context.setNotif(
                    'Successfully delete ' + props.rowData.Name + '\'s row data.', ConfigLocal.NOTIF.Success
                )
            }else{
                context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
            context.loadingSwitch()
            props.close()
            props.reload()
        })
    } 

    return (
        <Modal open={props.open} title="Delete Store Data" onBtnL={onYes} onBtnR={props.close} btnR="No" btnL="Yes" flip>
            <div className="delete-notif">Are you sure want to delete
            <div><b>{props.rowData.Name}</b></div>
            from Store data?</div>
        </Modal>
    )
}

export default StoreDelete