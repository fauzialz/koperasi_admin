import React from 'react'
import './Select.scss'

const Select = (props) => {
    /* const [ label, setLabel ] = useState('select-label') */
    return (
        <React.Fragment>
            {/* <div className={props.fluid ? "select-fluid" : "select-container"}>
                { props.label ? 
                    <div className=>
                }
            </div> */}
            <select name={props.name} value={props.selected} onChange={props.onChange}>
                {props.options.map(e => {
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

export default Select