import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export const PrivateRoute = ({component: Component, auth, ...other})=>{

    return (
        <Route 
            {...other}
            render={props=>
                auth?(<Component {...props}/>):(<Redirect to={{
                    pathname:'/login',
                    state:{from:props.location}
                }} />)
            }
        
        />
    )
}