import React from 'react'
import './Button.scss'

class Button extends React.Component {
    /* ACCESS:
        <Button
            --*mandatory--------------------------
            onClick= "{your onClick function (do somethings)}"
            --*optional---------------------------
            onSubmit= "{your onSubmit function (for me, its onClick more superior)}"
            fluid {button width all over the place}
            flat {no button shadow}
            center {button center align}
            type {button type (button|submit|reset). default: button}
            disabled {to make button diseabled}
            label= "{your button name. default: Button}"
        />
    */

    state = {
        style: ''
    }

    componentDidMount() {
        var styleString = ''
        if(this.props.fluid){
            styleString += ' fluid'
        }
        if(this.props.center){
            styleString +=' center'
        }
        if(!this.props.flat){
            styleString +=' float'
        }
        debugger
        this.setState({
            style: styleString
        })
    }

    render() {
        return (
            <React.Fragment>
                <button
                    className={this.state.style}
                    onClick={this.props.onClick}
                    onSubmit={this.props.onSubmit}
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