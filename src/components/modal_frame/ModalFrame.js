import React from 'react';
import './ModalFrame.scss'
import Button from '../button';

class ModalFrame extends React.Component {
    render() {
        const { open, title, children, onBtnL, onBtnR, btnL, btnR } = this.props
        return (
            <React.Fragment>
                <div className={open? "modal-open": "modal-close"}>
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <div className="modal-header">
                                {title || "Base Modal"}
                            </div>
                            <div className="modal-body">
                                {/* 
                                    children props can get everything thrown
                                    between <ModalFrame> and </ModalFrame> 
                                */}
                                {children}
                            </div>
                            <div className="modal-footer">
                                <div className="modal-footer-left">
                                    <Button rounded flat blue 
                                    label={btnL || "Submit"}
                                    onClick={onBtnL}
                                    />
                                </div>
                                <div className="modal-footer-right">
                                    <Button rounded depressed 
                                    label={btnR || "Cancel"}
                                    onClick={onBtnR}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ModalFrame