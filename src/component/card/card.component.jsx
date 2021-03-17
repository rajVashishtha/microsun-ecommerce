import React from 'react';
import {Avatar, Grid,IconButton,Paper,Typography} from '@material-ui/core';
import { MessageOutlined, NavigateNextOutlined } from '@material-ui/icons';
import { withRouter } from 'react-router';

class DashboardCard extends React.Component{
    render(){
        const {description,title,icon,link, history} = this.props;
        return(
            <Grid item sm={6} xs={12} >
                <Paper elevation={3} style={{borderRadius:"10px",cursor:"pointer"}} onClick={()=>{
                    history.push(link)
                }} >
                    <Grid container style={{padding:"20px 20px"}} xs={12} direction="column">
                        <Grid item >
                            <Grid container justify="space-between" spacing={3}>
                                <Grid item>
                                    <Avatar>
                                        {
                                            icon || <MessageOutlined />
                                        }
                                    </Avatar>
                                </Grid>
                                <Grid item>
                                    <IconButton >
                                        <NavigateNextOutlined />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item style={{paddingTop:"10px"}}>
                            <Typography style={{fontWeight:600}}>{title || "Subscription"}</Typography>
                            <Typography color="secondary" style={{marginTop:"10px"}}>{description || "cjdncj  cjdncjn c dskjnc d,cnds c"}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        )
    }
}

export default withRouter(DashboardCard);