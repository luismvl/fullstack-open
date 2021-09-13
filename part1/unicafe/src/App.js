import React, { useState } from "react"

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;

  if (!total)
    return <p>No feedback given</p>


  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='total' value={total} />
        <StatisticLine text='average' value={average} />
        <StatisticLine text='positive' value={((good / total) * 100) + ' %'} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Button = ({ handler, text }) => <button onClick={handler}>{text}</button>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad | + 1)

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handler={handleGoodClick} text="good" />
      <Button handler={handleNeutralClick} text="neutral" />
      <Button handler={handleBadClick} text="bad" />


      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
