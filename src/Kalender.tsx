import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { forEachChild } from "typescript";
import './Kalender.css';
import KalenderComponent from './components/KalenderComponent'

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

// export default function Kalender() {

//   let dateArray: any = [];
//   let tempArray: any = [];
//   let counter: number = 1;
//   let numberOfDay: number = 1;

//   const { loading, error, data } = useQuery(
//     gql`
//       query aktiviteter($franDatum: DateTime, $tillDatum: DateTime) {
//         aktivitets(
//           query: { Frandatum_gte: $franDatum, Frandatum_lte: $tillDatum }
//         ) {
//           BokNr
//           BokadAv
//           Bokningsgrupp
//           FrNKl
//           Frandatum
//           Plats
//           PrelBokad
//           Tidstext
//           TillKl
//           Tilldatum
//           Titel
//           Utskriven
//           _id
//         }
//       }
//     `,
//     {
//       variables: {
//         franDatum: "2017-11-01T00:00:00Z",
//         tillDatum: "2017-11-30T00:00:00Z",
//       },
//     }
//   );

//   const FetchData = (data: any) => {
//     for (var i = 0; i < data.length; i++) {
//       let parseDate = new Date(data[i].Frandatum);
//       let date = parseDate.getDate();
//       if (date === counter) {
//         tempArray.push(
//           data[i]
//         );
//       } else {
//         counter++;
//         dateArray.push(tempArray);
//         tempArray = [];
//       }
//     }
//     console.log(dateArray);
//     return dateArray;
//   }


//   if (!loading && data) {
//     FetchData(data.aktivitets);
//   }

//   return (
//     <>
//       <KalenderComponent activities={dateArray} />
//     </>
//   );
// }
const Kalender = () => {
  // läs in en query som listar alla aktiviteter mellan två datum
  const { loading, error, data } = useQuery(
    gql`
      query aktiviteter($franDatum: DateTime, $tillDatum: DateTime) {
        aktivitets(
          query: { Frandatum_gte: $franDatum, Frandatum_lte: $tillDatum }
        ) {
          BokNr
          BokadAv
          Bokningsgrupp
          FrNKl
          Frandatum
          Plats
          PrelBokad
          Tidstext
          TillKl
          Tilldatum
          Titel
          Utskriven
          _id
        }
      }
    `,
    {
      variables: {
        franDatum: "2017-11-01T00:00:00Z",
        tillDatum: "2017-11-30T00:00:00Z",
      },
    }
  );

  let dateArray: any = [];
  let tempArray: IAktivitet[] = [];
  let counter: number = 1;
  let numberOfDay: number = 1;
  const daysInWeek: string[] = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];

  const sortByDate = (data: IAktivitet[]) => {
    for (var i = 0; i < data.length; i++) {
      let parseDate = new Date(data[i].Frandatum);
      let date = parseDate.getDate();
      if (date === counter) {
        tempArray.push({
          BokNr: data[i].BokNr,
          BokadAv: data[i].BokadAv,
          Bokningsgrupp: data[i].Bokningsgrupp,
          FrNKl: data[i].FrNKl,
          Frandatum: data[i].Frandatum,
          Plats: data[i].Plats,
          PrelBokad: data[i].PrelBokad,
          Tidstext: data[i].Tidstext,
          TillKl: data[i].TillKl,
          Tilldatum: data[i].Tilldatum,
          Titel: data[i].Titel,
          Utskriven: data[i].Utskriven,
          _id: data[i]._id
        }
        );
      } else {
        counter++;
        dateArray.push(tempArray);
        tempArray = [];
      }
    }
    return dateArray;
  }

  if (!loading && data) {
    sortByDate(data.aktivitets);
  }

  return (
    <div className='calendar-month'>
      <h1>Kalender</h1>
      {/* ev. felmeddelande */}
      {error?.message}
      {/* om det finns data så visar vi alla aktiviteter som hämtats */}
      <section className='calendar-month-header'>
        <div className='calendar-month-header-selected-month'>
          November 2017
          </div>
      </section>
      <ol className='day-of-week'>
        {daysInWeek.map((day: any) => {
          return <li key={day}>{day}</li>
        })}
      </ol>
      <ol className='days-grid'>
        <li className='calendar-day calendar-day--not-current'>
          <div>30</div>
        </li>
        <li className='calendar-day calendar-day--not-current'>
          <div>31</div>
        </li>
        <KalenderComponent activities={dateArray} />
        <li className='calendar-day calendar-day--not-current'>
          <div>1</div>
        </li>
        <li className='calendar-day calendar-day--not-current'>
          <div>2</div>
        </li>
        <li className='calendar-day calendar-day--not-current'>
          <div>3</div>
        </li>
        <li className='calendar-day calendar-day--not-current'>
          <div>4</div>
        </li>
      </ol>
    </div>
  );
};

export default Kalender;
