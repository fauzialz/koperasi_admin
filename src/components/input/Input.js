import React from 'react'
import './Input.scss'
import InputIcon from '../input_icon'

class Input extends React.Component {
    /* ACCESS:
        <Input
            --*mandatory--------------------------
            name= "{name for onChange}"
            value= "{variable to store the value}"
            onChange= "{your onChange function (use for change value)}"
            --*optional---------------------------
            placeholder= "{costumize placeholder text. Empty case: this place will filled by capitalized name props}"
            fluid {input width all over the place}
            password {input type password}
            passVisibility {input type password with show/hide password button}
            required {to make input required in form}
        />
    */
    state = {
        type: "password",
        icon: 'visibility_off',
        seen: false
    } 

    visibility = () => {
        if(this.state.icon === 'visibility'){
            this.setState ({
                icon : 'visibility_off',
                type : "password", 
                seen : false
            })
        }else{
            this.setState ({
                icon : 'visibility',
                type : "text",
                seen : true
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div 
                    className={this.props.fluid ? "input-fluid" : "input-container"}
                >
                    <input
                        className={this.props.passVisibility? "input-visibility": ''}
                        type={this.props.password || this.props.passVisibility ? this.state.type : "text"}
                        name={this.props.name}
                        placeholder={this.props.placeholder ?
                            this.props.placeholder :
                            this.props.name.replace(
                                    this.props.name.charAt(0),
                                    this.props.name.charAt(0).toUpperCase()
                                )}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        autoComplete="off"
                        required={this.props.required}
                    />
                    {this.props.passVisibility ? 
                        <InputIcon 
                            iconName={this.state.icon}
                            seen={this.state.seen}
                            onClick={this.visibility} 
                        />
                        : ''
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Input