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
            this.props.onSubmit()
        }else{
            this.props.onClose()
        }
    }

    static getDerivedStateFromProps(props, state) {
        return { data : props.dataNow }
    }

    render() {
        const { title, open, names } = this.props
        return (
            <ModalFrame title={title} open={open} onBtnL={() => this.buttonHandler(true)} onBtnR={this.buttonHandler}>
                <form>
                    {names.map( name => {
                        return (
                            <React.Fragment>
                                <Input
                                    label={name}
                                    key={name}
                                    fluid
                                    name={name}
                                    value={this.state.data[name]}
                                    onChange={this.textChange}
                                />
                            </React.Fragment>
                        )
                    })}
                </form>
            </ModalFrame>
        )
    }
}

export default ModalForm