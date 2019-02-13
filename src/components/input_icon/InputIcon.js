import React from 'react'
import './InputIcon.scss'

class InputIcon extends React.Component {
    /* ACCESS:
        <InputIcon
            --*mandatory--------------------------
            iconName= "{icon name for Font Material UI}"
            --*optional---------------------------
            hide= "{icon color. true = vivid, false = contrast}"
            onClick= "{funcion slot to triger by click on icon}"
        />
    */
    state = {
        contrast: "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 contras",
        vivid: "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 vivid"
    }

    render() {
        return (
            <span className={this.props.seen? this.state.contrast : this.state.vivid }
                aria-hidden="true"
                onClick={this.props.onClick}
                title={this.props.seen? "click to hide": "click to see"}
            >
                {this.props.iconName}
            </span>
        )
    }
}

export default InputIcon