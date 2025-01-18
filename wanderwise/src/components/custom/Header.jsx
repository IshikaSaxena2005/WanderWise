import React from 'react'

function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg'></img>
      <div>
        <button>Sign in</button>
      </div>
    </div>
  )
}

export default Header
