import * as React from 'react';
import {AppContext} from './AppContext'
import {API_BASE_URL} from '../../settings';

interface IContextProps {
    events: any;
    actionClick: boolean;
    setActionClick: Function;
}

interface IProps {
    children: React.ReactNode;
}

interface EventsObject extends Object {
    count: number;
    page: number;
    results: TCardEvent[];
}


export const EventContext = React.createContext({} as IContextProps);

export const EventContextProvider = ({children}:IProps) => {
    const [events, setEvents] = React.useState(null as unknown as EventsObject);
    const [actionClick, setActionClick] = React.useState(false);
    const {reqFetch} = React.useContext(AppContext);

    const getEvents = async () => {
        const fetchedEvents = await reqFetch(`${API_BASE_URL}/events/`);
        const jsonEvents = await fetchedEvents.json();
        setEvents(jsonEvents);
    };

    React.useEffect(
        () => {
            getEvents();
        },
        [actionClick],
    );


    const defaultContext = {
        events,
        actionClick,
        setActionClick
    };

    return (
        <EventContext.Provider value={defaultContext}>
            {children}
        </EventContext.Provider>
    );
};
