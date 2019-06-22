import React from 'react'
import HelperString from '../../../helper/HelperString';
import Modal from '../../modal/Modal';
import './ModalInfo.scss'
import moment from 'moment';

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
                                        <td className="info-props"> {e === 'Id'? 
                                            <span className="info-id">{props.data[e]}</span> :
                                            ( e === 'CreatedTime' || e === 'ModifiedTime') && props.data[e] ?
                                                <React.Fragment><span className="time-calender">{moment(props.data[e]).add(7, 'h').format('D MMM YY [at] H:mm A')}</span><span className="time-relative">- {moment(props.data[e]).add(7, 'h').fromNow()}</span></React.Fragment>:
                                                props.data[e] || <span className="null-info">Null</span>}
                                        </td>:

                                        <td className="info-props"> {props.data[e] ? 
                                            <span className="info-active">True</span> : 
                                            <span className="info-inactive">False</span>} 
                                        </td>
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