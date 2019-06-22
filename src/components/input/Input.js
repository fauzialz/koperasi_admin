import React from 'react'
import './Input.scss'
import Icon from '../icon'

class Input extends React.Component {
    /* 
    !ACCESS:
        <Input
            *--mandatory--------------------------
            name = "{name for onChange}"
            value= "{variable to store the value}"
            onChange= "{your onChange function (use for change value)}"
            ?--*optional---------------------------
            label= "{texfield with label on the top of it. if this not null, placeholder will disappear."
            placeholder= "{costumize placeholder text. Empty case: this place will filled by capitalized name props}"
            fluid {input width all over the place}
            password {input type password}
            passVisibility {input type password with show/hide password button}
            required {to make input required in form}
            autoFocus {to make input focus at a time}
            focusEvery= {
                Boolean variable (Usually for Modal. this props make input will
                focus everytime user open modal or everytime whatever variable
                thrown on this props = true)
            }
        />
    */
   constructor(props) {
        super(props)
        this.state = {
            type: "password",
            icon: 'visibility_off',
            seen: false,
            label: 'input-label',
            focus: true
        } 
        this.textInput = React.createRef()
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
    // *handle label on input focus
    onFocusHandler = () => {
        this.setState({label: 'input-label-focus', focus: true})
    }
    // *handle label on input blur
    onBlurHandler = () => {
        this.setState({label: 'input-label', focus: false})
    }
    
    //lifecycle to detect props update
    // ! This method used to colaborate with modal open/close
    componentDidUpdate(oldProps) {
        if(this.props.focusEvery !== oldProps.focusEvery) {
            this.setState({focus: true})
        }
        if(this.props.autoFocus && this.state.focus){
            this.textInput.current.focus();
        }
    }

    render() {
        return (
            <React.Fragment>
                <div 
                    className={this.props.fluid ? "input-fluid" : "input-container"}
                >   
                    { this.props.label ? 
                        <div className={this.state.label}>
                            {this.props.label}
                        </div> : null
                    }
                    <input
                        ref={this.textInput}
                        onFocus={this.onFocusHandler}
                        onBlur={this.onBlurHandler}
                        disabled={
                                this.props.name === 'Id' || 
                                this.props.name === 'Code' ?
                                    true : false
                            }
                        className={this.props.passVisibility && this.props.label? "input-visibility input-when-label": this.props.passVisibility? "input-visibility": this.props.label? "input-when-label" : null}
                        type={this.props.password || this.props.passVisibility ? this.state.type : "text"}
                        name={this.props.name}
                        placeholder={this.props.label ? '':
                            this.props.placeholder ?
                                this.props.placeholder :
                                this.props.name.replace(
                                        this.props.name.charAt(0),
                                        this.props.name.charAt(0).toUpperCase()
                        )}
                        value={this.props.value || ''}
                        onChange={this.props.onChange}
                        autoComplete="off"
                        required={this.props.required}
                        autoFocus={this.props.autoFocus}
                    />
                    {this.props.passVisibility ? 
                        <Icon 
                            iconName={this.state.icon}
                            seen={this.state.seen}
                            onClick={this.visibility}
                            form
                        />
                        : null
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default Input