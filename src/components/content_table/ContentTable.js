import React from 'react'
import ButtonTable from '../button_table/ButtonTable';
import './ContentTable.scss'
import ConfigLocal from '../../config/ConfigLocal';

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
        debugger;
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
            let temp = {}
            for(let i in props.data) {
                temp[props.data[i].Id]=false
            }
            return { tableHover: temp, data: props.data}
        }else return null
    }

    componentDidMount() {
        this.MountSortStatus()
    }

    render() {
        const { names, infoButton, editButton, deleteButton, parent } = this.props
        const { sortStatus } = this.state
        const neutral = ConfigLocal.MISC.MaterialIcon + ' sort-arrow-neutral'
        const asc = ConfigLocal.MISC.MaterialIcon + ' sort-arrow-asc'
        const desc = ConfigLocal.MISC.MaterialIcon + ' sort-arrow-desc'
        return (
            <div className="table-holder">
                <div className="row-hover-wrapper">
                    <table className="table-content">
                        <thead>
                            <tr>
                                { names.map( head => {
                                    return (
                                        <th key={head}className={`table-header-${parent + head}`}><span className='sort-button' onClick={() => this.sortDataHandler(head)}>
                                            {head} <span className={sortStatus[head] === 0? neutral: sortStatus[head] === 1? asc: desc}>
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
                </div>
            </div>
        )
    }
}

export default ContentTable