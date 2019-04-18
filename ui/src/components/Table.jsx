import React, { Component } from 'react'
import ReactTable from 'react-table'
import IconButton from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import {data} from 'data.js'
import "react-table/react-table.css";


class Table extends Component {

    handleClick(goal) {
        console.log(goal)
    }
    render() {
        return (
            <ReactTable 
                className='-striped -highlight'
                data={data}
                columns={[
                    {
                        columns: [
                           
                            {
                                Header: 'Name',
                                accessor: 'name'
                            },
                            {
                                Header: 'Cost',
                                accessor: 'cost'
                            },
                            {
                                Header: 'Current Savings',
                                accessor: 'current'
                            },
                            {
                                Header: 'Monthly $ Saved',
                                accessor: 'monthlySavings'
                            },
                            {
                                Header: 'Progress',
                                id: 'progress',
                                accessor: d => ((d.current+1)/d.cost*100),
                                Cell: ({row}) => (
                                  <div
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      backgroundColor: '#dadada',
                                      borderRadius: '2px'
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: `${((row.current + 1)/row.cost)*100}%`,
                                        height: '100%',
                                        backgroundColor: ((row.current + 1)/row.cost)*100 > 60 ? '#85cc00'
                                          : ((row.current + 1)/row.cost)*100 > 30 ? '#ffbf00'
                                          : '#ff2e00',
                                          
                                        borderRadius: '2px',
                                        transition: 'all .2s ease-out'
                                      }}
                                    />
                                  </div>
                                )
                              },
                              {
                                  Header: 'Edit',
                                  accessor: 'edit',
                                  maxWidth: 80,
                                  Cell: ({row}) => (<IconButton onClick={() => this.handleClick(row)}><Edit /></IconButton>)
                              }
                        ]
                    }
                ]}            
            />
        )
    }
}

export default Table