import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './Routes'


class RouterComponent extends Component {

    getRoutes = (routes) => (
        routes.map((e,i) => {
            // console.log(e)
            return(
                <Route 
                    path = {e.path}
                    component = {e.component}
                    exact = {e.exact}
                    key = {i}
                    />
            )
        })
    )

    render() {     
        return ( 
           <BrowserRouter>
                <Switch>                    
                    {this.getRoutes(routes)}
                </Switch>
          </BrowserRouter>
         );
    }
}
 
export default RouterComponent;