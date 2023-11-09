import { useEffect, useState } from 'react'
import { getTrivia } from '../apiClient.ts'
import { Trivia as TriviaType } from '../../models/trivia.ts'

export default function Trivia() {
  const [trivia, setTrivia] = useState<TriviaType | null>(null)

  async function fetchTrivia() {
    const triviaData = await getTrivia()
    setTrivia(triviaData)
  }

  useEffect(() => {
    try {
      fetchTrivia()
    } catch (error) {
      console.log(error)
    }
  }, [])

  const answers = [trivia?.results[0].correct_answer, ...trivia?.results[0].incorrect_answers ?? []]
  console.log(answers)

  const displayAnswers: string[] = answers.map((answer) => {
    return (
      <li key={answer}>{answer}</li>
    )
    console.log(answer)
  })
  return (
    <>
    <h1>Trivia</h1>
    <ul>
      <li>{trivia?.results[0].question}</li>
      <li>{displayAnswers}</li>
    </ul>
    </>
  )
}