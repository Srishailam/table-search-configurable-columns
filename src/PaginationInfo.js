import React from 'react'

function PaginationInfo({from=0 , to=0, totalCount=0}) {
  return (
    <div className="PaginationInfo">
      {`Showing ${from} - ${to} of ${totalCount} records`}
    </div>
  )
}

export default PaginationInfo
