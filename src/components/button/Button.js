import React from 'react'
import './Button.scss'

class Button extends React.Component {
    render() {
        return (
            <React.Fragment>
                <button
                    className={
                        this.props.fluid ? "fluid" : 
                        this.props.center ? "center" : ""
                    }
                    onClick={this.props.pipeline}
                    type={this.props.type || "button"}
                    disabled={this.props.disabled}
                >
                    {this.props.label || 'Button'}
                </button>
            </React.Fragment>
        )
    }
}

export default Button