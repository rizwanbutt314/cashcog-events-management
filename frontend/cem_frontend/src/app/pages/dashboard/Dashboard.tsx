import * as React from 'react';
import EventCard from '../../components/eventCard/EventCard';
import './Dashboard.css';
import {EventContext, EventContextProvider} from '../../context/EventsContext';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input,
    ButtonToggle,
    NavbarToggler,
    Collapse
} from 'reactstrap';

const DashboardIndex: React.FC = () => {
    const {events, currentPage, setcurrentPage, filters, setFilters} = React.useContext(EventContext);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [sortBy, setSortBy] = React.useState('Sort By');
    const [currencyVal, setCurrencyVal] = React.useState('Select Currency');
    const [searchVal, setSearchVal] = React.useState('');

    const handlePageChange = (cp: number) => {
        setcurrentPage(cp);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const sortDdChange = (val: string, text: string) => {
        setSortBy(text);
        setFilters({
            ...filters,
            ordering: val
        });
    };

    const currencyDdChange = (val: string) => {
        setCurrencyVal(val);
        setFilters({
            ...filters,
            currency: val
        });
    };

    const searchChange = (e: any) => {
        setSearchVal(e.target.value);
        setFilters({
            ...filters,
            search: e.target.value
        });
    };

    const clearFilters = () => {
        setSortBy('Sort By');
        setCurrencyVal('Select Currency');
        setSearchVal('');
        setFilters({
            ordering: '',
            currency: '',
            search: '',
        });
    };

    return (
        <>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Cashcog Events Management</NavbarBrand>
                <NavbarToggler onClick={(e) => toggleMenu()}/>
                <Collapse isOpen={isMenuOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {sortBy}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <div onClick={(e) => sortDdChange('amount', 'Amount ASC')}>Amount ASC</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={(e) => sortDdChange('-amount', 'Amount DESC')}>Amount DESC</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={(e) => sortDdChange('created_at', 'Created ASC')}>Created ASC</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={(e) => sortDdChange('-created_at', 'Created DESC')}>Created DESC</div>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {currencyVal}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <div onClick={(e) => currencyDdChange('SLL')}>SLL</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={(e) => currencyDdChange('MGA')}>MGA</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={(e) => currencyDdChange('JEP')}>JEP</div>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={(e) => currencyDdChange('SAR')}>SAR</div>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem className="navbar-right">
                            <Input type="text" name="search" id="search" placeholder="search..." value={searchVal}
                                   onChange={searchChange}/>
                        </NavItem>
                    </Nav>
                    <ButtonToggle color="primary" onClick={(e) => clearFilters()}>Clear Filters</ButtonToggle>
                </Collapse>
            </Navbar>

            <div className="container">
                {events && events.results.map((event: TCardEvent, idx: number) =>
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
                        hideOnSinglePage
                        showPrevNextJumpers
                        defaultPageSize={25}
                        defaultCurrent={events ? currentPage : 1}
                        onChange={(cp) => handlePageChange(cp)}
                        total={events ? events.count : 1}
                        locale={localeInfo}
                    />
                }
            </div>

        </>
    );
};

const DashboardPage: React.FC = () => {
    return (
        <EventContextProvider>
            <DashboardIndex/>
        </EventContextProvider>
    );

};

export default DashboardPage;