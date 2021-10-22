import React from 'react'
import './Grid.css'

// title, cases, total

function Grid({ cases, totalCases, recovered, totalRecovered, deaths, totalDeaths, onClickCase, onClickRecovered, onClickDeaths, activeCase, activeRecovered, activeDeaths}) {
    return (
            <React.Fragment>
                    {/* <div className="grid_item">
                        <div className="text_grid">
                            <div className="title_case"><p> {title} </p></div>
                            <div className="number_case"><h2> {cases} </h2></div>
                            <div className="total_case"><p> {total} Total </p></div>
                        </div>
                    </div> */}
                    
                <div className="app_grid" >
                    <div className={`grid_item ${activeCase && 'grid_item--selected'}`} onClick={onClickCase}>
                        <div className="text_grid">
                            <div className="title_case"><p> Coronavirus Case </p></div>
                            <div className="number_case" id="orange"><h2> {cases} </h2></div>
                            <div className="total_case"><p> {totalCases} Total </p></div>
                        </div>
                    </div>

                    <div className={`grid_item ${activeRecovered && 'grid_item--selected'}`} onClick={onClickRecovered}>
                        <div className="text_grid">
                            <div className="title_case"><p> Recovered </p></div>
                            <div className="number_case" id="green"><h2> {recovered} </h2></div>
                            <div className="total_case" ><p> {totalRecovered} Total </p></div>
                        </div>
                    </div>

                    <div className={`grid_item ${activeDeaths && 'grid_item--selected'}`} onClick={onClickDeaths} >
                        <div className="text_grid">
                            <div className="title_case"><p> Deaths </p></div>
                            <div className="number_case" id="red"><h2> {deaths} </h2></div>
                            <div className="total_case"><p> {totalDeaths} Total </p></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
}

export default Grid