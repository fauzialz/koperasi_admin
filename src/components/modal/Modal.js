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
                    <Button rounded flat blue={!props.flip? true: false} depressed={!props.flip? false: true} 
                    label={props.btnL || "Submit"}
                    onClick={!props.form? props.onBtnL : null}
                    onSubmit={props.form? props.onBtnL : null}
                    type={props.form? 'submit' : null}
                    />
                </div>}
                <div className="modal-footer-right">
                    <Button rounded depressed={!props.flip? true: false} flat={!props.flip? false: true} blue={!props.flip? false: true} 
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
        const { title, children, onBtnL, onBtnR, btnL, btnR, form, hideBtnL, compact, flip, extraWidth } = this.props
        return(
            <div className={extraWidth? "modal-container extra-width": "modal-container"} onClick={this.closeHandler}>
                <div className={this.props.leftTitle ? "modal-header left-header" : "modal-header" }>
                    {title || "Base Modal"}
                </div>
                {form ? 
                    <form onSubmit={onBtnL}>
                        <InnerComponent children={children} onBtnL={onBtnL} onBtnR={onBtnR} btnL={btnL} btnR={btnR} hideBtnL={hideBtnL} compact={compact} flip={flip} form />
                    </form>:
                    <InnerComponent children={children} onBtnL={onBtnL} onBtnR={onBtnR} btnL={btnL} btnR={btnR} hideBtnL={hideBtnL} compact={compact} flip={flip} />
                }
            </div>
        )
    }
}

class Modal extends React.Component {
    render() {
        const { open, title, children, onBtnL, onBtnR, btnL, btnR, form, hideBtnL, compact, flip, extraWidth} = this.props
        return (
            <React.Fragment>
                <div className={!open? "modal-close": extraWidth? "modal-open extra-width-open": "modal-open"} onClick={onBtnR}>
                    <div className="modal-wrapper">
                        <MiddleComponent 
                            children={children} onBtnL={onBtnL} 
                            onBtnR={onBtnR} btnL={btnL} btnR={btnR}
                            hideBtnL={hideBtnL} compact={compact}
                            form={form} title={title} flip={flip}
                            extraWidth={extraWidth}
                            leftTitle={this.props.leftTitle}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Modal