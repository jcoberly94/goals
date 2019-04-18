import React, {Component} from 'react' 
import Delete from '@material-ui/icons/Delete' 
import {IconButton} from '@material-ui/core'
import SweetAlert from 'react-bootstrap-sweetalert'

import api from 'api'
import styles from 'styles/deleteGoal.module.scss'

export default class DeleteGoal extends Component {
    state = {
        show: false,
        success: false
    }
    cancelDelete = () => {
        this.setState({show: false})
    }
    delete = () => {
        api.delete('/goals', {params: {id: this.props.id}})
            .then(({data}) => {
                console.log(data)
            })
        this.setState({show: false, success: true})
    }

    render() {
        return (
            <>
                <div className={styles.button}><IconButton onClick={() => this.setState({show: true})}><Delete /></IconButton></div>
                <SweetAlert 
                    danger
                    showCancel
                    show={this.state.show}
                    confirmBtnText="Yes, delete it!"
                    title="Are you sure?"
                    onConfirm={this.delete}
                    onCancel={this.cancelDelete}
                >
                    You will not be able to undo this!
                </SweetAlert>
                <SweetAlert success show={this.state.success} title="Success!" onConfirm={() => this.setState({success: false})}>
                    Goal Deleted
                </SweetAlert>
            </>
        )
    }
}
