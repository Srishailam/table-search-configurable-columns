import React from 'react'

function Pagination({currentPage, totalCount, recordsPerPage, paginate}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCount/recordsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="Pagination">
      {
        pageNumbers.map( (number, idx) => {
          return (
            <div
              key={idx}
              onClick={() => paginate(number)}
            >
              {number}
            </div>
          )
        })
      }
    </div>
  )
}

export default Pagination
