import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral';


const options = {
    legend: {
        display: false,
    },
    element: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callback: {
            label: function (tooltipItem, value) {
                return numeral (tooltipItem.value).format('+0,0');
            },
        },
    },
    // scales: {
    //     xAxis: [
    //         {
    //             time: {
    //                 format: 'DD/MM/YY',
    //                 tooltipFormat: 'll',
    //             },
    //         },
    //     ],
    //     yAxis: [
    //         {
    //             gridLines: {
    //                 display: false,
    //             },
    //             ticks: {
    //                 callback: function (value,) {
    //                     return numeral (value).format('0a');
    //                 },
    //             },
    //         },
    //     ],
    // },
};

    const buildChartData = (data, casesType) => {
        const chartData = [];
        let lastDataPoint;

        for (let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x: date,
                    y: data[casesType][date] - lastDataPoint, 
                };
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    };

function Graph( {casesType = 'cases'} ) {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(resp => {
                let chartData = buildChartData(resp.data, casesType);
                setData(chartData);
            })
    }, [casesType])

    return (
        <div>
            {data?.length > 0 && (
                <Line 
                options={options}
                data={{
                    datasets: [
                        {
                            showLine: false,
                            gridLines: false,
                            pointHoverBorderWidth: 15,
                            label: 'Cases',
                            fill: true,
                            backgroundColor: "rgba(205, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data: data,
                        },
                    ],
                }}
                />
            )}
        </div>
    )
}

export default Graph