import {createContext} from 'react';

export interface AppContextInterface {
    auth: any;
    setAuth: any;
  }

const AppContext = createContext<AppContextInterface|null>(null);

export default AppContext;
