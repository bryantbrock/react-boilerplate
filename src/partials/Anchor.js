import React from 'react'

export default ({onClick, className, children}) =>
  <a onClick={onClick} className={className + ' text-blue-700 hover:text-gray-900'}>
    {children}
  </a>