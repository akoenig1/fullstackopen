import React from 'react'
import Rating from './Rating'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all
  const score = props.score
  const positive = props.positive

  const ratings = <>
    <Rating field="Good" count={good} />
    <Rating field="Neutral" count={neutral} />
    <Rating field="Bad" count={bad} />
    <Rating field="All" count={all} />
    <Rating field="Average" count={all > 0 ? (score / all) : 0} />
    <Rating field="Positive" count={all > 0 ? ((positive / all) * 100) : 0} unit="%" />
  </>
  
  return (
    all > 0 ? ratings : "No Feedback Given"
  )
}

export default Statistics