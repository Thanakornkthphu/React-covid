import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort ((a, b) => {
      if (a.cases > b.cases) {
          return -1;
      } else {
          return 1;
      }
  });
  return sortedData;
};
// sort table

const casesTypeColors = {
  cases: {
    hex: "rgb(255, 81, 0)",
    multiplier: 300,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 700,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 1500,
  },
};

export const caseStat = (stat) => 
    stat ? `+${(stat).toLocaleString()}` : "+0";

export const totalStat = (stat) => 
    stat ? `${(stat).toLocaleString()}` : "+0";
// format number

export const showDataOnMap = (data, casesType = "cases") =>
  data.map(country => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]} 
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed"> Cases: {numeral(country.cases).format("0,0")} </div>
          <div className="info-recovered"> Recovered: {numeral(country.recovered).format("0,0")} </div>
          <div className="info-deaths"> Deaths: {numeral(country.deaths).format("0,0")} </div>
        </div>
      </Popup>
    </Circle>
  ));
  // circle on the map