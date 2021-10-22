import React from 'react'
import './Table.css'


function Table({tableData}) {

    return (
        <div className="table">
            {tableData.map(({country, cases, id}) => {
                return (
                    <tr key={id}>
                        <td className="text-country">{country}</td>
                        <td className="text-cases">{cases.toLocaleString()}</td>
                    </tr>
                )
            })}
            
        </div>
    )
}

export default Table
