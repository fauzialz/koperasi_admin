import React from 'react'
import ButtonTable from '../button_table/ButtonTable';
import './ContentTable.scss'
import ConfigLocal from '../../config/ConfigLocal';
import HelperString from '../../helper/HelperString';
import Button from '../button';

const Loading = (props) => {
    return (
        <div className="loading-socket">
            <div className="loading-mid">
                {props.loadingText || 'Doing science...'}
                <div className="loading-base">
                    <div className="loading-core"></div>
                </div>
            </div>
        </div>
    )
}

const TryAgain = (props) => {
    return (
        <div className="loading-socket">
            <div className="loading-mid">
                <div className="try-again-msg">
                    {props.message}
                </div>
                <div className="try-again-button">
                    <Button onClick={props.tryAgain} blue label="Try Again" rounded/>
                </div>
            </div>
        </div>
    )
}

class ContentTable extends React.Component {
    state = {
        tableHover: {},
        data: [],
        sortStatus: {}
    }

    sortStatusHandler = (key) => {
        let sortStatus = this.state.sortStatus
        for (let i in sortStatus) {
            if( i === key ) {
                if( sortStatus[i] === 0) {
                    sortStatus[i] = 1
                }else if( sortStatus[i] === 1) {
                    sortStatus[i] = 2
                }else{
                    sortStatus[i] = 0
                }
            }else{
                sortStatus[i] = 0
            }
        }
        return sortStatus
    }

    sortDataHandler = (key) => {
        let hotData = this.state.data
        let sortStatus = this.state.sortStatus
        if(sortStatus[key] === 0) {
            hotData = hotData.sort((a,b) => {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            })
        }else if(sortStatus[key] === 1) {
            hotData = hotData.sort((a,b) => {
                if (a[key] > b[key]) return -1;
                if (a[key] < b[key]) return 1;
                return 0;
            })
        }else{
            hotData = hotData.sort((a,b) => {
                if (a.Id < b.Id) return -1;
                if (a.Id > b.Id) return 1;
                return 0;
            })
        }
        sortStatus = this.sortStatusHandler(key)
        this.setState({data: hotData, sortStatus: sortStatus})
    }

    MountSortStatus= () => {
        let sortStatus = {}
        for (let i in this.props.names) {
            sortStatus[this.props.names[i]]= 0
        }
        this.setState({sortStatus : sortStatus})
    }

    onMouseOverHandler = (id) => {
        let hotTableHover = this.state.tableHover
        for(let i in hotTableHover){
            if(i === id.toString()) {
                hotTableHover[i] = true
            }else{
                hotTableHover[i] = false
            }
        }
        this.setState({tableHover: hotTableHover})
    }
    onMouseLeaveHandler = () => {
        let hotTableHover = this.state.tableHover
        for(let i in hotTableHover){
            hotTableHover[i] = false
        }
        this.setState({tableHover: hotTableHover})
    }

    static getDerivedStateFromProps(props, state) {
        if( state.data !== props.data){
            let data = props.data || []
            let temp = {}
            for(let i in data) {
                temp[data[i].Id]=false
            }
            return { tableHover: temp, data: data }
        }else return null
    }

    componentDidMount() {
        this.MountSortStatus()
    }

    render() {
        const { names, infoButton, editButton, deleteButton, loading, parent, loadingText, tryAgain } = this.props
        const { sortStatus } = this.state
        const neutral = ConfigLocal.MISC.MaterialIcon + ' sort-arrow-neutral'
        const asc = ConfigLocal.MISC.MaterialIcon + ' sort-arrow-asc'
        const desc = ConfigLocal.MISC.MaterialIcon + ' sort-arrow-desc'
        return (
            <div className="table-holder">
                <div className="row-hover-wrapper">

                {
                    this.state.data.length === 0 || loading ? <Loading loadingText={loadingText} /> :
                    this.state.data[0].message ? <TryAgain message={this.state.data[0].message} tryAgain={tryAgain} />:

                    <table className="table-content">
                        <thead>
                            <tr>
                                { names.map( head => {
                                    return (
                                        <th key={head}className={`table-header-${parent + head}`}><span className='sort-button' onClick={() => this.sortDataHandler(head)}>
                                            {HelperString.toCapital(head)} <span className={sortStatus[head] === 0? neutral: sortStatus[head] === 1? asc: desc}>
                                                arrow_downward
                                            </span>
                                        </span></th>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>

                            { this.state.data.map( (row, i) => {
                                return (
                                    <tr key={i} onMouseEnter={() => this.onMouseOverHandler(row.Id)} onMouseLeave={this.onMouseLeaveHandler}>
                                        {names.map( (col, j) => {
                                            if(j === 0) {
                                                return (
                                                    <td key={j}>
                                                        <span>{row[col]}</span>
                                                        {this.state.tableHover[row.Id] ?
                                                            <ButtonTable 
                                                            infoButton={infoButton}
                                                            editButton={editButton}
                                                            deleteButton={deleteButton}
                                                            rowData={row}
                                                        />: null
                                                        }
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={j}>
                                                    <span>{row[col]}</span>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
                </div>
            </div>
        )
    }
}

export default ContentTable