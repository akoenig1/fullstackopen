import React, { useState } from 'react'
import Header from './Header'
import Button from './Button'
import Rating from './Rating'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setScore(score + 1)
    setPositive(positive + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setScore(score - 1)
  }

  return (
    <div>
      <Header content="Give Feedback" />

      <Button rating="Good" handleClick={handleGoodClick} />
      <Button rating="Neutral" handleClick={handleNeutralClick} />
      <Button rating="Bad" handleClick={handleBadClick} />

      <Header content="Statistics" />

      <Rating field="Good" count={good} />
      <Rating field="Neutral" count={neutral} />
      <Rating field="Bad" count={bad} />
      <Rating field="All" count={all} />
      <Rating field="Average" count={all > 0 ? (score / all) : 0} />
      <Rating field="Positive" count={all > 0 ? ((positive / all) * 100) : 0} unit="%" />
    </div>
  )
}

export default App
