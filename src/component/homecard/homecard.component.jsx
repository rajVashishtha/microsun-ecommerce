import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class HomeCard extends React.Component{
    render(){
        const {name, price, desc,history} = this.props;
        return(
            <div style={{padding:"10px 5px",border:"1px solid #888888"}}>
                <Typography variant="h4" align="center" color="textSecondary">{name}</Typography>
                <Typography variant="h4" align="center" color="textSecondary" style={{marginTop:"20px"}}>{`$${price} | per year`}</Typography>
                <Button color="primary" variant="outlined" 
                    onClick={()=>{
                        history.push("/product");
                    }}
                style={{marginLeft:"auto",marginRight:"auto",marginTop:"20px",display:"block"}} >Buy Now</Button>
                <Typography variant="h5" align="center" color="textSecondary" style={{marginTop:"20px"}}>{desc}</Typography>
                <Link style={{color:"black",marginLeft:"auto",marginRight:"auto", display:"block", textAlign:"center",marginTop:"10px"}} >See offer details below.</Link>
            </div>
        )
    }
}

export default withRouter(HomeCard);
