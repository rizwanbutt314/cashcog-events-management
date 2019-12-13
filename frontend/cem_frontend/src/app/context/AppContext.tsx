import * as React from 'react';

interface IContextProps {
    reqFetch: Function;
}

interface IProps {
    children: React.ReactNode;
}

export const AppContext = React.createContext({} as IContextProps);

export const AppContextProvider = ({children}:IProps) => {

    const reqFetch = async (resource: string, options?:any) => {
        var response;
        if(options)
            response = await fetch(resource, options);
        else
            response = await fetch(resource);
        return response;
    };


    const defaultContext = {
        reqFetch
    };

    return (
        <AppContext.Provider value={defaultContext}>
            {children}
        </AppContext.Provider>
    );
};
