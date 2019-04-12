import React from 'react'
import './Select.scss'

class Select extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            labelStyle: 'select-blur'
        }
    }

    onFocusHandler = () => {
        this.setState({labelStyle: 'select-focus'})
    }
    onBlurHandler = () => {
        this.setState({labelStyle: 'select-blur'})
    }

    render() {
        const { label, name, selected, options, onChange } = this.props
        return (
            <React.Fragment>
                { label ? 
                    <div className={this.state.labelStyle}>
                        {label}
                    </div> : null
                }
                <select name={name} value={selected || ''} onChange={onChange} onFocus={this.onFocusHandler} onBlur={this.onBlurHandler}>
                    {options.map(e => {
                        return (
                            <React.Fragment key={e.value}>
                                <option value={e.value}>{e.name}</option>
                            </React.Fragment>
                        )
                    })}
                </select>
            </React.Fragment>
        )
    }
}

export default Select