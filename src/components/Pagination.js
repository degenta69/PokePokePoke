import React from 'react'

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className='mx-auto justify-content-between d-flex' style={{width:'calc(100% - 6rem)'}}>
      {<button disabled={gotoPrevPage?false:true} onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  )
}
