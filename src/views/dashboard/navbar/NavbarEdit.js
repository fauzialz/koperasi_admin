import React from 'react';
import ModalForm from '../../../components/modal_form';

class NavbarEdit extends React.Component {

    render () {
        const { open, dataNow, onClose } = this.props
        const names = ['Id', 'Code', 'Name', 'Description', 'Icon']
        return (
            <React.Fragment>
                <ModalForm 
                    title="Navigation Menu Setting"
                    open={open} 
                    names={names}
                    dataNow={dataNow}
                    onSubmit={onClose}
                    onClose={onClose}
                />
            </React.Fragment>
        )
    }
}

export default NavbarEdit