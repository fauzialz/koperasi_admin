import React from 'react'
import './Input.scss'

class Input extends React.Component {
    /* ACCESS:
        <Input
            --*mandatory--------------------------
            name= "{name for onChange}"
            value= "{variable to store the value}"
            pipeline= "{your onChange function (use for change value)}"
            --*optional---------------------------
            placeholder= "{costumize placeholder text. Empty case: this place will filled by capitalized name props}"
            fluid {input width all over the place}
            password {input type password}
            passVisibility {input type password with show/hide password button}
        />
    */
    state = {
        type: "password",
        icon: 'visibility_off'
    } 

    visibility = () => {
        if(this.state.icon === 'visibility'){
            this.setState ({
                icon : 'visibility_off',
                type : "password" 
            })
        }else{
            this.setState ({
                icon : 'visibility',
                type : "text"
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
                        type={this.props.password || this.props.passVisibility ? this.state.type : "text"}
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
                    {this.props.passVisibility ? 
                        <span class="material-icons MuiIcon-root-1 MuiIcon-colorAction-4 visibility"
                            aria-hidden="true"
                            onClick={this.visibility}
                        >
                            {this.state.icon}
                        </span> : ''
                    }
                </div>
                
            </React.Fragment>
        )
    }
}

export default Input