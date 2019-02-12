import React from 'react'
import './Loading.scss'
import CircularProgress from '@material-ui/core/CircularProgress'

class Loading extends React.Component {


    render() {
        return (
            <div className="Loading-mask">
                <div className="Loading-wrapper">
                    <div className="Loading" >
                        <CircularProgress color="inherit" size={50} thickness={3}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Loading