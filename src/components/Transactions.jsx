import React from 'react'
import { GrTransaction } from 'react-icons/gr'
import { Link, Outlet } from 'react-router-dom'

function Transactions() {
  return (
    <div className='Transaction'>
        <div className='TransHeader'>
          <label><GrTransaction /> Transactions</label>
          <span className='shades' id='shade1'></span>
            <span className='shades' id='shade2'></span>
          <div className='transactionsHeader'>
              <Link to="/dashboard/transactions/buy">Buy</Link>
              <Link to="/dashboard/transactions/sell">Sell</Link>
              <Link to="/dashboard/transactions/history">History</Link>
          </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default Transactions