import React from 'react'
import './Button.scss'

class Button extends React.Component {
    /* ACCESS:
        <Button
            --*mandatory--------------------------
            onClick= "{your onClick function (do somethings)}"
            --*optional---------------------------
            onSubmit= "{your onSubmit function (for me, its onClick more superior)}"
            type {button type (button|submit|reset). default: button}
            disabled {to make button diseabled}
            label= "{your button name. default: Button}"
            fluid {button width all over the place}
            flat {no button shadow}
            center {button center align}
            depressed {flat and no color}
            blue {blue colored button}
            red {red colored button}
            rounded {round button}
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
        if(!(this.props.flat || this.props.depressed)){
            styleString +=' float'
        }
        if(!(this.props.depressed || this.props.blue || this.props.red)){
            styleString +=' primary-color'
        }
        if(this.props.depressed){
            if(this.props.blue){
                styleString +=' depressed-blue'
            }else if(this.props.red){
                styleString +=' depressed-red'
            }else styleString +=' depressed'
        }
        if(this.props.blue && !this.props.depressed){
            styleString +=' blue'
        }
        if(this.props.red && !this.props.depressed){
            styleString +=' red'
        }
        if(this.props.rounded){
            styleString +=' raund'
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