import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './CovidApp.css';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css'
// hook and style


import Grid from './Grid';
import Table from './Table';
import Graph from './Graph';
import Map from './Map';
// components

import { caseStat, totalStat, sortData } from './Function';

const Header = styled.h1`
        margin-top: 5px;
        margin-bottom: 20px;
        margin-left: 20px;
    `;

function CovidApp() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState([15, 100]);
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        const getCountriesData = async () => {
            await axios
                .get('https://disease.sh/v3/covid-19/countries')
                .then(resp => {
                    
                    const {data} = resp
                    // Get data from response

                    const countries = data.map(country => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2,
                        }
                    )) // loop country from API 
                    const sortedData = sortData(resp.data);
                    setTableData(sortedData);
                    setCountries(countries);
                    setMapCountries(data);
                });
        };
        getCountriesData();
    },[]);
    // set API countries

    useEffect(() => {
        const getWorldWideData = async () => {
            await axios
                .get('https://disease.sh/v3/covid-19/all')
                .then(resp => {
                    setCountryInfo(resp.data)
                });
        };
        getWorldWideData();
    }, []) 
    // set API worldwide

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        const url = 
            countryCode === 'worldwide' 
            ? 'https://disease.sh/v3/covid-19/all' 
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await axios
            .get(url) 
            .then(resp => {

                const {data} = resp;
                
                setCountryInfo(data);
                setCountry(countryCode);

                if(countryCode === 'worldwide'){
                    setMapCenter([15, 100]);
                    setMapZoom(3);
                }else{
                    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                    setMapZoom(5);
                    console.log([data.countryInfo.lat, data.countryInfo.long])
                }
            });
    }
    // onchange dropdown country and API handler 

    return (
        <React.Fragment>
            <div className="container_app">
                <div className="app_left">
                    <div className="app_header">
                        <Header>Covid-19 Dashboard</Header>

                        <select className="dropdown_country" onChange={onCountryChange} value={country}>
                            <option value="worldwide">Worldwide</option>
                            {countries.map((country,index) => (
                                <option key={index} value={countries.value}>{country.name}</option>
                            ))}
                        </select>
                    </div> 
                    {/* app_header */}
                    
                    <div className="app_grid">
                        {/* <Grid className="orange" title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
                        <Grid className="green" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
                        <Grid className="red" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} /> */}
                        
                        <Grid 
                        cases={caseStat(countryInfo.todayCases)} totalCases={totalStat(countryInfo.cases)}
                        recovered={caseStat(countryInfo.todayRecovered)} totalRecovered={totalStat(countryInfo.recovered)}
                        deaths={caseStat(countryInfo.todayDeaths)} totalDeaths={totalStat(countryInfo.deaths)}
                        onClickCase={() => setCasesType('cases')}
                        onClickRecovered={() => setCasesType('recovered')} 
                        onClickDeaths={() => setCasesType('deaths')}
                        activeCase={casesType === 'cases'}
                        activeRecovered={casesType === 'recovered'}
                        activeDeaths={casesType === 'deaths'}
                        />
                    </div> 
                    {/* app_grid */}

                    <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
                </div> 
                {/* app_left */}

                <div className="app_right">
                    <div className="app_right_container">
                        <h3>Live Cases by Country</h3>
                            <div className="text-data">
                                <Table tableData={tableData}/>
                            </div>
                    
                        
                        <div className="graph">
                            <h3>Worldwide new {casesType}</h3>
                            <Graph className="app_graph" casesType={casesType}/>
                        </div>
                    </div>
                </div> 
                {/* app_right */}

            </div> 
            {/* Container_app */}
        </React.Fragment>
    )
}

export default CovidApp
