import React from "react"
import Part from './Part'

const Content = (props) => {
  const parts = props.parts.map((part, i) => {
    return <Part key={i} part={part} />
  })

  return (
    <>
      {parts}
    </>
  )
}

export default Content