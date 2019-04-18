import React, {Component} from 'react' 
import More from '@material-ui/icons/MoreHoriz'
import {IconButton, Modal, TextField, Button} from '@material-ui/core' 
import NumberFormat from 'react-number-format'
import DeleteGoal from 'components/DeleteGoal' 

import api from 'api' 
import styles from 'styles/addGoal.module.scss'

export default class EditGoal extends Component {
    state = {
        open: false,
        name: this.props.data.name,
        cost: this.props.data.cost,
        current: this.props.data.current,
        monthlySavings: this.props.data.monthlySavings,
        description: this.props.data.description,
        image: this.props.data.image
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleClick = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({
            open: false,
            name: this.props.data.name,
            cost: this.props.data.cost,
            current: this.props.data.current,
            monthlySavings: this.props.data.monthlySavings,
            description: this.props.data.description,
            image: this.props.data.image
        })
    }

    handleSubmit = () => {
        let {name, cost, current, monthlySavings, description, image} = this.state
        api.put('/goals', {
            _id: this.props.data._id,
            name,
            cost,
            current,
            monthlySavings,
            description,
            image
        })
        .then(({data}) => {
            this.setState({open: false})
        })
    }

    render() {
        return(
            <>
                <IconButton onClick={this.handleClick}><More /></IconButton>
                <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div className={styles.container}>
                        <div className={styles.title}>Edit Goal</div>
                        <DeleteGoal id={this.props.data._id}/>
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