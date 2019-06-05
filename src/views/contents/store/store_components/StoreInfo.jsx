import React from 'react'
import Modal from '../../../../components/modal'
import './StoreComponents.scss'

const StoreInfo = (props) => {
    return (
        <Modal open={props.open} title={`Store Info`} onBtnR={props.close} btnR="Close" hideBtnL>
            <table className="table-info">
                <tbody>
                {props.keys.map( e => {
                    return (
                        <React.Fragment key={e}>
                            <tr>
                                <td className="info-key"> {e} </td>
                                {e !== 'IsActive'?
                                    <td className="info-props"> {e === 'Id'? <span className="info-id">{props.rowData[e]}</span> : props.rowData[e] || <span>Null</span>} </td>:
                                    <td className="info-props"> {props.rowData[e] ? <span className="info-active">True</span> : <span className="info-inactive">False</span>} </td>
                                }
                            </tr>
                        </React.Fragment>
                    )
                })}  
                </tbody>
            </table>
        </Modal>
    )
}

export default StoreInfo