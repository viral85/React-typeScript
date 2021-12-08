import React, { Component } from 'react';
import AppContext, { AppContextInterface } from './AppContext';

// Creates a provider Component
class AppProvider extends Component<AppContextInterface> {
   
    render() {
        const { auth, setAuth } = this.props;
     
        return (
            <AppContext.Provider
            value={{auth: auth , setAuth: setAuth}}
            >
               {this.props.children}
            </AppContext.Provider>
        );
    }
}
export default AppProvider;