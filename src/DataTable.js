import React from 'react'

function DataTable({data}) {
console.log(data.length, 'inside DataTable')
  const columns = data[0] && Object.keys(data[0]);
  return (
    <div className="DataTable">
      <table>
        <thead>
        <tr>
          {
            (columns || []).map( column => <th key={column}>{column}</th>)
          }
        </tr>
        </thead>
        <tbody>
          { 
            (data || [] ).map( row => <tr key={row.uuid}>
              {
                columns.map( column => <td key={column}>{row[column]}</td> )
              }
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
