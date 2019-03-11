import React from 'react';
import ModalFrame from '../modal_frame';
import Input from '../input';

class ModalForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: {}
        }
    }

    textChange = e => {
        let tmp = this.state.data
        tmp[e.target.name] = e.target.value
        this.setState({
            data:tmp
        })
    }

    clearInput = () => {
        let tmp = {}
        for(let name of this.props.names){
            tmp[name] = ''
        }
        this.setState({
            data: tmp
        })
    }
    
    buttonHandler = (submit) => {
        this.clearInput()
        if(submit) {
            this.props.onSubmit(this.state.data)
        }else{
            this.props.onClose()
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { data : props.dataNow }
    }

    render() {
        const { title, open, names, btnL, btnR } = this.props
        return (
            <ModalFrame 
                title={title} 
                open={open} 
                btnL={btnL}
                btnR={btnR}
                onBtnL={() => this.buttonHandler(true)} 
                onBtnR={() => this.buttonHandler(false)}
            >
                <form>
                    {names.map( name => {
                        return (
                            <Input
                                label={name}
                                key={name}
                                fluid
                                name={name}
                                value={this.state.data[name]}
                                onChange={this.textChange}
                            />
                        )
                    })}
                </form>
            </ModalFrame>
        )
    }
}

export default ModalForm