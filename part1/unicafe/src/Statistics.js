import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const all = props.all
  const score = props.score
  const positive = props.positive

  const ratings = <table>
    <tbody>
      <StatisticLine field="Good" value={good} />
      <StatisticLine field="Neutral" value={neutral} />
      <StatisticLine field="Bad" value={bad} />
      <StatisticLine field="All" value={all} />
      <StatisticLine field="Average" value={all > 0 ? (score / all) : 0} />
      <StatisticLine field="Positive" value={all > 0 ? ((positive / all) * 100) : 0} unit="%" />
    </tbody>
  </table>
  
  return (
    all > 0 ? ratings : "No Feedback Given"
  )
}

export default Statistics