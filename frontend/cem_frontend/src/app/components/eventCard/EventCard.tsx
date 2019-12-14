import * as React from 'react';
import './EventCard.css';
import {EventContext} from "../../context/EventsContext";
import { AppContext } from '../../context/AppContext';
import { API_BASE_URL } from '../../../settings';
import {
    Button
} from 'reactstrap';

const EventCard = (props: any) => {
    const { data } = props;
    const { actionClick, setActionClick } = React.useContext(EventContext);
    const { reqFetch } = React.useContext(AppContext);

    const btnCick = async (cardID:number, status:string) => {
        let response;
        try {
            response = await reqFetch(`${API_BASE_URL}/events/${cardID}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: status,
                }),
            });
        } catch(err) {
            return;
        }

        if (response.status === 200) {
            setActionClick(!actionClick);
        } else {
            // console.log("err2");
        }

    };

    return (

    <article className="article">
        <h3 className="article__category">{data.created_at}</h3>
        <h2 className="article__title">{data.employee_first_name} {data.employee_last_name}</h2>
        <p className="article__excerpt">{data.description}</p>
        <p className="article__excerpt">
            {data.currency} {data.amount}
        </p>
        <Button className="approve-btn" onClick={(e) => btnCick(data.id, 'A')}>Approve</Button>
        <Button className="decline-btn" onClick={(e) => btnCick(data.id, 'D')}>Decline</Button>
    </article>
    )
};

export default EventCard;