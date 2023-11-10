import React, { useEffect, useState } from 'react'
import { getGeneralKnowledge } from '../apiClient.ts'
import { GeneralKnowledge as TriviaType } from '../../models/GeneralKnowledge.ts'

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export default function Trivia() {
  // State variables
  const [trivia, setTrivia] = useState<TriviaType | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizOver, setQuizOver] = useState(false)
  const [answerStatus, setAnswerStatus] = useState<string | null>(null)

  // Fetch trivia data on component mount
  useEffect(() => {
    async function fetchTrivia() {
      try {
        const triviaData = await getGeneralKnowledge()
        setTrivia(triviaData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchTrivia()
  }, [])

  // Function to handle answer click
  const handleAnswerClick = (answer: string | null) => {
    if (trivia && currentQuestionIndex < trivia.results.length) {
      let isCorrect = false

      // Check if the selected answer is correct
      if (answer === trivia.results[currentQuestionIndex].correct_answer) {
        setScore(score + 1)
        isCorrect = true
      }

      // Set the selected answer
      setSelectedAnswer(answer)

      // Move to the next question or end the quiz if all questions answered
      if (currentQuestionIndex < trivia.results.length - 1) {
        // Use setTimeout to simulate a delay before moving to the next question
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1)
          setSelectedAnswer(null)
        }, 1500)
      } else {
        setQuizOver(true)
      }

      // Update the class based on correctness
      setAnswerStatus(isCorrect ? 'green' : 'red')
    }
  }

  // Get the answers for the current question
  const answers = trivia
    ? [
        trivia.results[currentQuestionIndex].correct_answer,
        ...(trivia.results[currentQuestionIndex].incorrect_answers ?? []),
      ]
    : []

  // Shuffle the answers
  const shuffledAnswers = shuffleArray(answers)

  // Map the shuffled answers to buttons
  const displayAnswers = shuffledAnswers.map((answer, index) => (
    <button
      key={index}
      onClick={() => handleAnswerClick(answer)}
      className={`${selectedAnswer === answer ? 'selected' : ''} ${
        answerStatus || ''
      }`}
      style={{
        backgroundColor:
          selectedAnswer !== null
            ? answer === trivia?.results[currentQuestionIndex].correct_answer
              ? 'rgba(66, 175, 172, 0.5)'
              : 'rgba(198, 61, 43, 0.5)'
            : 'transparent',
      }}
    >
      {answer}
    </button>
  ))

  // Render the component
  return (
    <div>
      {quizOver ? (
        <>
          <h2 className="quiz-over">Trivia quiz is over!</h2>
          <h3>
            Your score: <span>{score}</span>
          </h3>
          <a className="btn btn-danger" role="button" href="/">
            Home
          </a>
          <a className="btn btn-dark" role="button" href="/GeneralKnowledge">
            Play Again
          </a>
          <a className="btn btn-dark" role="button" href="/Mythology">
            Try Mythology
          </a>
          <a className="btn btn-dark" role="button" href="/Animals">
            Try Animals
          </a>
        </>
      ) : (
        <>
          {trivia && trivia.results[currentQuestionIndex] ? (
            <h2>{trivia.results[currentQuestionIndex].question}</h2>
          ) : (
            <p>Loading...</p>
          )}
          <div>{displayAnswers}</div>
        </>
      )}
    </div>
  )
}
