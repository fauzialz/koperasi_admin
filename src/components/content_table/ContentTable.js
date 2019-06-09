import React from 'react'
import ButtonTable from '../button_table/ButtonTable';
import './ContentTable.scss'

class ContentTable extends React.Component {
    state = {
        tableHover: {},
        data: []
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
        if( state.data === props.data){
            return null
        }
        let temp = {}
        for(let i in props.data) {
            temp[props.data[i].Id]=false
        }
        return { tableHover: temp, data: props.data }
    }

    render() {
        const { names, infoButton, editButton, deleteButton } = this.props
        return (
            <div className="table-holder">
                <div className="row-hover-wrapper">
                    <table className="table-content">
                        <thead>
                            <tr>
                                { names.map( head => {
                                    return (<th key={head}>{head}</th>)
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