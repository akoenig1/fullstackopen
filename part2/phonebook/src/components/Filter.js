import React from 'react'

const Filter = (props) => {
  const { searchCategory, searchText, handleChange } = props

  return(
    <div>
      search by {searchCategory}: <input value={searchText} onChange={handleChange} />
    </div>
  )
}

export default Filter