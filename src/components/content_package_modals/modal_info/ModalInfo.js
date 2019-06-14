import React from 'react'
import HelperString from '../../../helper/HelperString';
import Modal from '../../modal/Modal';
import './ModalInfo.scss'

const ModalInfo = (props) => {
    const marks = props.marks || []
    return (
        <Modal open={props.open} title={props.tableName? props.tableName + ' Data Info': 'Some Data Info'} onBtnR={props.close} btnR="Close" hideBtnL extraWidth>
            {props.keys.length !== 0 ?
                <table className="table-info">
                    <tbody>
                    {props.keys.map( e => {
                        return (
                            <React.Fragment key={e}>
                                <tr>
                                    <td className="info-key"><span> {marks.includes(e)?HelperString.toCapital(e)+' •': HelperString.toCapital(e)} </span> </td>
                                    {e !== 'IsActive'?
                                        <td className="info-props"> {e === 'Id'? <span className="info-id">{props.data[e]}</span> : props.data[e] || <span>Null</span>} </td>:
                                        <td className="info-props"> {props.data[e] ? <span className="info-active">True</span> : <span className="info-inactive">False</span>} </td>
                                    }
                                </tr>
                            </React.Fragment>
                        )
                    })}  
                    </tbody>
                </table>: null
            }
        </Modal>
    )
}

export default ModalInfo