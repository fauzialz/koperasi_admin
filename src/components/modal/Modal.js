import React from 'react';
import './Modal.scss'
import Button from '../button';

const InnerComponent = (props) => {
    return (
        <React.Fragment>
            <div className={props.compact? "modal-body body-compact": "modal-body"}>
                {/* 
                    children props can get everything thrown
                    between <Modal> and </Modal> 
                */}
                {props.children}
            </div>
            <div className="modal-footer">
                {!props.hideBtnL && <div className="modal-footer-left">
                    <Button rounded flat blue 
                    label={props.btnL || "Submit"}
                    onClick={!props.form? props.onBtnL : null}
                    onSubmit={props.form? props.onBtnL : null}
                    type={props.form? 'submit' : null}
                    />
                </div>}
                <div className="modal-footer-right">
                    <Button rounded depressed 
                    label={props.btnR || "Cancel"}
                    onClick={props.onBtnR}/>
                </div>
            </div>
        </React.Fragment>
    )
}

class Modal extends React.Component {
    render() {
        const { open, title, children, onBtnL, onBtnR, btnL, btnR, form, hideBtnL, compact } = this.props
        return (
            <React.Fragment>
                <div className={open? "modal-open": "modal-close"}>
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <div className="modal-header">
                                {title || "Base Modal"}
                            </div>
                            {form ? 
                                <form onSubmit={onBtnL}>
                                    <InnerComponent children={children} onBtnL={onBtnL} onBtnR={onBtnR} btnL={btnL} btnR={btnR} hideBtnL={hideBtnL} compact={compact} form />
                                </form>:
                                <InnerComponent children={children} onBtnL={onBtnL} onBtnR={onBtnR} btnL={btnL} btnR={btnR} hideBtnL={hideBtnL} compact={compact} />
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Modal