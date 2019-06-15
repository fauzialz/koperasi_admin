import React, { useContext } from 'react'
import { AppContext } from '../../../global';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigLocal from '../../../config/ConfigLocal';
import Modal from '../../modal';
import './ModalDelete.scss'

const ModalDelete = (props) => {
    const context = useContext(AppContext)
    const onYes = () => {
        context.loadingSwitch()
        HelperHttp.delete(props.url, props.data.Id, props.data.Etag, (res) => {
            if(res.status === 200 && res.success) {
                context.setNotif(
                    'Successfully delete ' + props.data.Name + ' from ' + props.tableName +'.', ConfigLocal.NOTIF.Success
                )
            }else{
                context.setNotif(
                    res.message, ConfigLocal.NOTIF.Error
                )
            }
            context.loadingSwitch()
            props.close()
            props.reload(false,props.currentPage)
        })
    }

    return (
        <Modal open={props.open} title={`Delete ${props.tableName} Data`} onBtnL={onYes} onBtnR={props.close} btnR="No" btnL="Yes" flip>
            <div className="delete-notif">
                Are you sure want to delete
                <div>
                    <b>{props.data.Name}</b>
                </div>
                from {props.tableName} data?
            </div>
        </Modal>
    )
}

export default ModalDelete