import * as React from 'react';
import EventCard from '../../components/eventCard/EventCard';
import './Dashboard.css';
import { EventContext, EventContextProvider } from '../../context/EventsContext';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink
} from 'reactstrap';

const DashboardIndex: React.FC = () => {
    const { events, currentPage, setcurrentPage } = React.useContext(EventContext);

    const handlePageChange = () => {
        setcurrentPage(currentPage + 1);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <NavbarBrand href="#home">Navbar</NavbarBrand>
                <Nav className="mr-auto">
                    <NavLink href="#home">Home</NavLink>
                    <NavLink href="#features">Features</NavLink>
                    <NavLink href="#pricing">Pricing</NavLink>
                </Nav>
            </Navbar>

            <div className="container">
                {events && events.results.map((event: TCardEvent, idx:number) =>
                    <div className="column" key={event.uuid}>
                    <EventCard
                        data={event}
                    />
                    </div>,
                )}
            </div>

            <div className="pagination-container">
                {
                    events && <Pagination
                        defaultPageSize={25}
                        defaultCurrent={ events ? currentPage : 1}
                        onChange={(e) => handlePageChange()}
                        total={events ? events.count : 1}
                    />
                }
            </div>

        </>
    );
};

const DashboardPage : React.FC = () => {
    return (
        <EventContextProvider>
            <DashboardIndex/>
        </EventContextProvider>
    );

};

export default DashboardPage;