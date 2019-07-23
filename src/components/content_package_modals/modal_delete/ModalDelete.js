import React, { useContext } from 'react'
import { AppContext } from '../../../global';
import HelperHttp from '../../../helper/HelperHttp';
import ConfigLocal from '../../../config/ConfigLocal';
import Modal from '../../modal';
import './ModalDelete.scss'

const ModalDelete = (props) => {
    const context = useContext(AppContext)
    const onYes = async () => {
        context.loadingSwitch()
        let res = await HelperHttp.delete(props.url, props.data.Id, props.data.Etag)
        context.loadingSwitch()
        if(res.status === 200 && res.success) {
            context.setNotif( 'Successfully delete ' + props.data.Name + ' from ' + props.tableName +'.', ConfigLocal.NOTIF.Success )
        }else{
            context.setNotif( res.message, ConfigLocal.NOTIF.Error )
        }
        props.close()
        props.reload(props.pageRows === 1 && props.currentPage!== 0? props.currentPage-1 : props.currentPage)
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