import React from 'react'
import './Input.scss'

class Input extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <input 
                    type={this.props.password ? "password" : "text"}
                    name={this.props.name}
                    placeholder={this.props.placeholder ?
                        this.props.placeholder :
                        this.props.name.replace(
                                this.props.name.charAt(0),
                                this.props.name.charAt(0).toUpperCase()
                            )}
                    value={this.props.value}
                    onChange={this.props.pipeline}
                    autoComplete="off"
                />
            </React.Fragment>
        )
    }
}

export default Input