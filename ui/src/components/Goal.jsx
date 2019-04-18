import React, {Component} from 'react' 
import NumberFormat from 'react-number-format' 
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"
import moment from 'moment'

import EditGoal from 'components/EditGoal'
import styles from 'styles/goal.module.scss'


class Goal extends Component {
    render() {
        let {name, cost, current, monthlySavings, dateAdded, image, description} = this.props.goal
        return (

            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        
                        <div>
                            <div className={styles.title}>{name}</div>
                            <div className={styles.dateAdded}>{moment(dateAdded).format('MM-DD-YYYY')}</div>
                        </div>
                    </div>
                    
                    <div className={styles.cost}><NumberFormat value={cost} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
                </div>
                <div  >
                    <img className={styles.image} src={image} alt="img" />
                </div>
                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.progress}>
                    <Progress 
                        percent={88} 
                        status="success" 
                        theme={{
                            success: {
                              symbol: '💰',
                              fontSize: 20,
                              color: '#2ecc71'
                            },
                            
                        }}
                    />
                </div>
                <div className={styles.savings}>
                        <div>
                            <div className={styles.current}>Current Savings</div>
                            <div className={styles.amount}>
                                <NumberFormat value={current} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>
                        </div>
                        <div>
                            <div className={styles.current}>Monthly Amount</div>
                            <div className={styles.amount}>
                                <NumberFormat value={monthlySavings} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            </div>
                            
                        </div>
                </div>
                <div className={styles.more}><div><EditGoal data={this.props.goal} /></div></div>
            </div>
        )
    }
}
export default Goal