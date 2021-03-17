import React from 'react'
import { withRouter } from 'react-router'
import CustomAppBar from '../../component/appbar/appbar.component'
import {Grid} from '@material-ui/core'
import DashboardCard from '../../component/card/card.component'

class AdminDashboardPage extends React.Component{
    state = {
        items:[
            {
                title:"Manage Inventory",
                description:"Add/Remove category and products in inventory",
                link:"/admin/inventory"
            },
            { 
                title:"See orders",
                description:"View all orders of products",
                link:"/admin/orders"
            }
        ]
    }
    render(){
        return(
            <div>
                <CustomAppBar />
                <div>
                    <Grid container item xs={12} justify="center" alignItems="center" style={{marginTop:"30px"}}>
                        <Grid container item md={12} xs={12} spacing={4}>
                        {
                            this.state.items.map((item,index)=>(
                                <DashboardCard title={item.title} description={item.description} link={item.link} />
                            ))
                        }
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminDashboardPage);