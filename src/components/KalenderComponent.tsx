import React from 'react';

interface IAktivitet {
    BokNr: string;
    BokadAv: string;
    Bokningsgrupp: string;
    FrNKl: string;
    Frandatum: Date;
    Plats: string;
    PrelBokad: string;
    Tidstext: string;
    TillKl: string;
    Tilldatum: Date;
    Titel: string;
    Utskriven: string;
    _id: string;
}


export default function KalenderComponent(props: any) {
    const { activities } = props;
    let numberOfDay = 1

    const HandleClick = (id: string) => {
        alert(id);
    }

    return (
        <>
            {activities.map((days: any) => {
                let day = days.map((activity: IAktivitet) => <div onClick={() => HandleClick(activity._id)} key={activity._id} id={activity._id}><div>{activity.Titel}<br></br>{activity.Tidstext}</div></div>);
                return <li className='calendar-day'><span key={day._id} className='numbOfDay'>{numberOfDay++}</span>{day}</li>;
            })}
        </>
    );
}