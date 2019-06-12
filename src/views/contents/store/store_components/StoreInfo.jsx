import React from 'react'
import Modal from '../../../../components/modal'
import './StoreComponents.scss'
import HelperString from '../../../../helper/HelperString';

const StoreInfo = (props) => {
    const marks = props.marks || []
    return (
        <Modal open={props.open} title={`Store Info`} onBtnR={props.close} btnR="Close" hideBtnL extraWidth>
            {props.keys.length !== 0 ?
                <table className="table-info">
                    <tbody>
                    {props.keys.map( e => {
                        return (
                            <React.Fragment key={e}>
                                <tr>
                                    <td className="info-key"><span> {marks.includes(e)?HelperString.toCapital(e)+' •': HelperString.toCapital(e)} </span> </td>
                                    {e !== 'IsActive'?
                                        <td className="info-props"> {e === 'Id'? <span className="info-id">{props.rowData[e]}</span> : props.rowData[e] || <span>Null</span>} </td>:
                                        <td className="info-props"> {props.rowData[e] ? <span className="info-active">True</span> : <span className="info-inactive">False</span>} </td>
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

export default StoreInfo