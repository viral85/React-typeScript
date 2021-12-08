import React from 'react';
import AppContext  from '../context/AppContext';

export function withAppContext(Component) {
    return function AppWrapper(props) {
        return (
            <AppContext.Consumer>
                {state => <Component {...props} context={state} />}
            </AppContext.Consumer>
        );
    };
}