import * as React from 'react';
import {AppContext} from './AppContext'
import {API_BASE_URL} from '../../settings';

interface IContextProps {
    events: any;
    actionClick: boolean;
    setActionClick: Function;
    currentPage: number;
    setcurrentPage: Function;
    filters: Object;
    setFilters: Function;
}

interface IProps {
    children: React.ReactNode;
}

interface EventsObject extends Object {
    count: number;
    num_pages: number;
    results: TCardEvent[];
}


export const EventContext = React.createContext({} as IContextProps);

export const EventContextProvider = ({children}: IProps) => {
    const [events, setEvents] = React.useState({count: 0, num_pages: 0, results: []} as EventsObject);
    const [actionClick, setActionClick] = React.useState(false);
    const [currentPage, setcurrentPage] = React.useState(1);
    const [filters, setFilters] = React.useState({
        ordering: '',
        currency: '',
        search: '',
    });
    const {reqFetch} = React.useContext(AppContext);

    const formatFilterparams = (allFilters: Object) => {
        var params: string[] = [];

        Object.entries(allFilters).map(([key, value]) => {
            if (value)
                params.push(`${key}=${value}`);
        });

        return params.join("&");
    };

    const getEvents = async () => {
        var api_url = `${API_BASE_URL}/events?page_size=25&page=${currentPage}`;

        const filter_params = formatFilterparams(filters);
        if (filter_params)
            api_url += `&${filter_params}`;

        const fetchedEvents = await reqFetch(api_url);
        const jsonEvents = await fetchedEvents.json();
        try {
            if (jsonEvents.detail === 'Invalid page.') {
                setcurrentPage(1);
            }
            else{
                setEvents(jsonEvents);
            }

        } catch (e) {
            //
        }

    };

    React.useEffect(
        () => {
            getEvents();
        },
        [actionClick, currentPage, filters],
    );


    const defaultContext = {
        events,
        actionClick,
        setActionClick,
        currentPage,
        setcurrentPage,
        filters,
        setFilters
    };

    return (
        <EventContext.Provider value={defaultContext}>
            {children}
        </EventContext.Provider>
    );
};
