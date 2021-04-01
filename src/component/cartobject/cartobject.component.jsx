import React from 'react'
import {Collapse, Grid, IconButton, Typography} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ExpandLessOutlined } from '@material-ui/icons';

class CartObjectCard extends React.Component{
    state={
        expanded:false
    }
    toggleExpansion = ()=>{
        this.setState({expanded:!this.state.expanded})
    }
    render(){
        const {name,details,price,expiry} = this.props;
        return(
            <Grid container item direction="column" xs={12}>
                <Grid item spacing={2} xs={12} container direction="row" justify="space-between"> 
                    <Grid item xs={8}>
                        <Typography variant="h5" color="textSecondary">{name}</Typography>
                        <Typography variant="p">{expiry}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="subtitle2">{price}</Typography>
                        <IconButton onClick={this.toggleExpansion}>
                        {
                            this.state.expanded?(<ExpandLessOutlined />):(<ExpandMoreIcon />)
                        }
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        {details}
                    </Collapse>
                </Grid>
            </Grid>
        )
    }
}


export default CartObjectCard;