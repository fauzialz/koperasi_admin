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

class MiddleComponent extends React.Component {
    closeHandler = (e) => {
        e.stopPropagation()
    }

    render() {
        const { title, children, onBtnL, onBtnR, btnL, btnR, form, hideBtnL, compact } = this.props
        return(
            <div className="modal-container" onClick={this.closeHandler}>
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
        )
    }
}

class Modal extends React.Component {
    
    closeHandler = (e) => {
        this.props.onBtnR()
    }

    render() {
        const { open, title, children, onBtnL, btnL, btnR, form, hideBtnL, compact } = this.props
        return (
            <React.Fragment>
                {open && <div className="modal-open" onClick={this.closeHandler}>
                    <div className="modal-wrapper">
                        <MiddleComponent 
                            children={children} onBtnL={onBtnL} 
                            onBtnR={this.closeHandler} btnL={btnL} btnR={btnR}
                            hideBtnL={hideBtnL} compact={compact}
                            form={form} title={title} 
                        />
                        {/* <div className="modal-container">
                            <div className="modal-header">
                                {title || "Base Modal"}
                            </div>
                            {form ? 
                                <form onSubmit={onBtnL}>
                                    <InnerComponent children={children} onBtnL={onBtnL} onBtnR={onBtnR} btnL={btnL} btnR={btnR} hideBtnL={hideBtnL} compact={compact} form />
                                </form>:
                                <InnerComponent children={children} onBtnL={onBtnL} onBtnR={onBtnR} btnL={btnL} btnR={btnR} hideBtnL={hideBtnL} compact={compact} />
                            }
                        </div> */}
                    </div>
                </div>}
            </React.Fragment>
        )
    }
}

export default Modal