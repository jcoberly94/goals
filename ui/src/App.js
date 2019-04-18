import React, { Component } from 'react'
import Header from './components/Header'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import Goal from 'components/Goal' 
import api from 'api'
import styles from 'styles/app.module.scss' 

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2D5D7B'
    },
    secondary: {
      main: '#d91e18',
    },
  },
});
class App extends Component {

  state = {
    goals: []
  }
  async componentDidMount() {
    let {data} = await api.get('/goals')
    this.setState({goals: data.goals})
    
  }
  render() {
    let {goals} = this.state

    return (
      <div className="App">
        <MuiThemeProvider theme={theme} >
          <Header />
          <div className={styles.container}>
            {goals.map( goal => 
              <Goal key={goal._id} goal={goal} />
              )}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
