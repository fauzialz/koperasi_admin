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
        small: "material-icons MuiIcon-root-1 MuiIcon-colorAction-4 basic small",
    }

    render() {
        return (
            <span className={
                    !this.props.form && !this.props.small? 
                        this.state.basic :  
                        this.props.small?
                            this.state.small :
                            this.props.seen? 
                                this.state.contrast : 
                                this.state.vivid }
                aria-hidden="true"
                onClick={this.props.onClick}
                title={this.props.seen? this.props.title2 || "click to hide": this.props.title1 || "click to see"}
                /* style={{ color : this.props.color }} */
            >
                {this.props.iconName}
            </span>
        )
    }
}

export default Icon