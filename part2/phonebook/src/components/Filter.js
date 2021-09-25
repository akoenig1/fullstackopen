import React from 'react'

const Filter = (props) => {
  const { text, handleChange } = props

  return(
    <div>
      search by name: <input value={text} onChange={handleChange} />
    </div>
  )
}

export default Filter