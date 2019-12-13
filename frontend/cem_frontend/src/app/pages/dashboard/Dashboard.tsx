import * as React from 'react';
import EventCard from '../../components/eventCard/EventCard';
import './Dashboard.css';
import { EventContext, EventContextProvider } from '../../context/EventsContext'
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import {
    Container,
    Row,
    Navbar,
    NavbarBrand,
    Nav,
    NavLink
} from 'reactstrap';

const DashboardIndex: React.FC = () => {
    const { events } = React.useContext(EventContext);

    const handleChange = () => {
        console.log("here...");
    }

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

            {/*<Container fluid>*/}

            {/*    <Row className="event-card-row">*/}
            {/*        {events && events.results.map((event: TCardEvent, idx:number) =>*/}
            {/*            <EventCard*/}
            {/*                key={event.uuid}*/}
            {/*                data={event}*/}
            {/*            />,*/}
            {/*        )}*/}
            {/*    </Row>*/}

            {/*    <Pagination*/}
            {/*        activePage={2}*/}
            {/*        itemsCountPerPage={10}*/}
            {/*        totalItemsCount={450}*/}
            {/*        pageRangeDisplayed={events ? events.num_pages : 1}*/}
            {/*        onChange={handleChange}*/}
            {/*        prevPageText="Prev"*/}
            {/*        nextPageText="Next"*/}
            {/*    />*/}

            {/*</Container>*/}

            <div className="container">
                {events && events.results.map((event: TCardEvent, idx:number) =>
                    <div className="column" key={event.uuid}>
                    <EventCard
                        data={event}
                    />
                    </div>,
                )}
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