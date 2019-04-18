import React, {Component} from 'react' 
import Add from '@material-ui/icons/Add';
import {IconButton, Modal, TextField, Button} from '@material-ui/core' 
import NumberFormat from 'react-number-format'
import SweetAlert from 'react-bootstrap-sweetalert' 

import api from 'api' 
import styles from 'styles/addGoal.module.scss'

class AddGoal extends Component {
    state = {
        open: false,
        error: false,
        success: false,
        name: '',
        cost: null,
        current: null,
        monthlySavings: null,
        description: '',
        image: ''
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleClick = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({
            name: '',
            cost: null,
            current: null,
            monthlySavings: null,
            description: '',
            image: '',
            open: false,
            error: false,
            success: false
        })
    }

    handleSubmit = () => {
        let {name, cost, current, monthlySavings, description, image} = this.state
        api.post('/goals', {
            name,
            cost,
            current,
            monthlySavings,
            description,
            image
        })
        .then(({data}) => {
            if(data._id) {
                this.setState({success: true})
            }
        })
        .catch(err => this.setState({error: true}))
    }

    render() {

        return(
            <>
                <IconButton onClick={this.handleClick}><Add style={{color: '#fff'}} /></IconButton>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={styles.container}>
                        <div className={styles.title}>Add New Goal</div>
                        <div className={styles.textFields}>
                            <TextField
                                label="Title"
                                value={this.state.name}
                                onChange={this.handleChange('name')}
                            />
                            <TextField
                                label="Cost"
                                value={this.state.cost}
                                onChange={this.handleChange('cost')}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                            />
                            <TextField
                                label="Current Saved"
                                value={this.state.current}
                                onChange={this.handleChange('current')}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                            />
                            <TextField
                                label="Montly Savings"
                                value={this.state.monthlySavings}
                                onChange={this.handleChange('monthlySavings')}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                            />
                            <TextField
                                label="Description"
                                multiline
                                rowsMax={'5'}
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                            />
                            <TextField
                                label="Image URL"
                                value={this.state.image}
                                onChange={this.handleChange('image')}
                            />
                        </div>
                        <div className={styles.buttons}>
                            <div><Button color='primary' variant='contained' onClick={this.handleSubmit}>Submit</Button></div>
                            <div><Button color='default' variant='contained' onClick={this.handleClose}>Cancel</Button></div>
                        </div>
                        
                    </div>
                </Modal>
                <SweetAlert 
                    danger
                    show={this.state.error}
                    confirmBtnText="Okay"
                    title="Oops Something Went Wrong"
                    onConfirm={() => this.setState({error: false})}
                />
                <SweetAlert success show={this.state.success} title="Success!" onConfirm={this.handleClose}>
                    Goal Added
                </SweetAlert>
            </>
        )
    }
}
function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix="$"
      />
    );
  }
export default AddGoal