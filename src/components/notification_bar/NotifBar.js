import React from 'react'
import './NotifBar.scss'

class NotifBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            errStyle: 'error',
            status: false
        }
    }

    // static getDerivedStateFromProps(props, state){
    //     if(props.status !== state.status){
    //         /* setTimeout(() => {
    //             this.setState({errStyle: "afterError"})
    //         }, 2000); */
    //         return {
    //             status: true
    //         }
    //     }
    // }

    componentDidMount(){
        if(this.props.status === 1){
            this.changeStyle()
        }
    }

    /* componentDidUpdate= (props) => {
        if(props.msg !== ''){
            debugger
            if(this.state.status){
                debugger
                this.changeStyle()
            }
        }
    } */

    changeStyle = () => {
        this.setState({
            errStyle: "error"
        })
        setTimeout(() => {
            this.setState({
                errStyle: "afterError",
                status: false
            })
        }, 2000);
    }
    
    render() {  
        return (
            <div
                className={this.props.msg ? this.state.errStyle : "neutral"}
            >
                {this.props.emptyStart ? '' 
                : this.props.msg || "Fill the form"}
            </div>
        )
    }
}

export default NotifBar