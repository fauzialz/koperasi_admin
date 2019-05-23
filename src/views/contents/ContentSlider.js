import React from 'react'
import './ContentSlider.scss'
import { RouterTierTwo } from '../../Router';
import { AppContext } from '../../global';

class ContentSlider extends React.Component {
    static contextType = AppContext
    constructor (props) {
        super(props)
        this.refTable = React.createRef()
        this.state = {
            top: ''
        }
    }

    onScrollHandler = () => {
        let scrollState = this.refTable.current.getBoundingClientRect().bottom
        this.context.setOnTop(scrollState > this.state.top)
    }

    componentDidMount() {
        let top = this.refTable.current.getBoundingClientRect().bottom
        this.setState({top:top})
    }
    render() {
        return (
            <React.Fragment>
                <div className="content-base" onScroll={() => this.onScrollHandler()}>
                    <div className={this.props.open ? "content-navbar-open" : "content-navbar-close"}>
                        <div ref={this.refTable} className="content-square">
                            <div className="content-socket">

                                <RouterTierTwo />

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default ContentSlider