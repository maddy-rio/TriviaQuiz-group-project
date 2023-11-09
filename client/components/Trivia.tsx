import { SetStateAction, useEffect, useState } from 'react'
import { getTrivia } from '../apiClient.ts'
import { Trivia as TriviaType } from '../../models/trivia.ts'

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Export function
export default function Trivia() {
  const [trivia, setTrivia] = useState<TriviaType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>()
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizOver, setQuizOver] = useState(false)
  const [totalQuestions, setTotalQuestions] = useState(10)

  //fetch the data
  async function fetchTrivia() {
    try {
      const triviaData = await getTrivia()
      setTrivia(triviaData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    try {
      fetchTrivia()
    } catch (error) {
      console.log(error)
    }
  }, [])

  //handle the score and track the question numbers
  const handleAnswerClick = (answer: string | null) => {
    if (trivia && currentQuestionIndex < trivia.results.length) {
      if (answer === trivia?.results[currentQuestionIndex].correct_answer) {
        console.log('correct answer')
        setScore(score + 1)
      } else {
        console.log('Incorrect')
      }
      setSelectedAnswer(answer)

      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        console.log('All questions answered. Quiz over.')
        setQuizOver(true)
      }
    }
  }

  //Add the correct answer to the incorrect answers
  const answers = trivia
    ? [
        trivia.results[currentQuestionIndex].correct_answer,
        ...(trivia?.results[currentQuestionIndex].incorrect_answers ?? []),
      ]
    : []

  //shuffle and display answers
  const shuffledAnswers = shuffleArray(answers)
  const displayAnswers = shuffledAnswers.map((answer, index) => (
    <button
      key={index}
      onClick={() => handleAnswerClick(answer)}
      className={selectedAnswer === answer ? 'selected' : ''}
    >
      {answer}
    </button>
  ))

  return (
    <div>
      <h1>Trivia</h1>
      {quizOver ? (
        <p>Trivia quiz is over! Your score: {score}</p>
      ) : (
        <>
          {trivia && trivia.results[currentQuestionIndex] ? (
            <p>{trivia.results[currentQuestionIndex].question}</p>
          ) : (
            <p>Loading...</p>
          )}
          <div>{displayAnswers}</div>
        </>
      )}
    </div>
  )
}
