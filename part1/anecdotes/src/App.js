import React, { useState } from 'react'
import Button from './Button'
import Anecdote from './Anecdote'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [mostIndex, setMostIndex] = useState(0)

  const handleNext = () => {
    const index = Math.floor((Math.random() * anecdotes.length))
    setSelected(index)
  }

  const handleVote = () => {
    const index = selected
    const updatedVotes = [...votes]
    updatedVotes[index] += 1
    setVotes(updatedVotes)
    
    const updatedMostIndex = updatedVotes.indexOf(Math.max(...updatedVotes));
    setMostIndex(updatedMostIndex)
    console.log(updatedVotes);
    console.log(updatedMostIndex);
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" text={anecdotes[selected]} votes={votes[selected]} ></Anecdote>   
      <br />
      <Button text="next anecdote" handleClick={handleNext} ></Button>
      <Button text="vote" handleClick={handleVote} ></Button>
      <br />
      <Anecdote title="Anecdote with most votes" text={anecdotes[mostIndex]} votes={votes[mostIndex]} ></Anecdote>
    </div>
  )
}

export default App
