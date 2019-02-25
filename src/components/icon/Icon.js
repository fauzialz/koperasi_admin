import React from 'react'
import './Icon.scss'

class Icon extends React.Component {
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
        vivid: "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 vivid",
        basic: "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 basic",
    }

    render() {
        return (
            <span className={!this.props.form? this.state.basic : this.props.seen? this.state.contrast : this.state.vivid }
                aria-hidden="true"
                onClick={this.props.onClick}
                title={this.props.seen? "click to hide": "click to see"}
            >
                {this.props.iconName}
            </span>
        )
    }
}

export default Icon