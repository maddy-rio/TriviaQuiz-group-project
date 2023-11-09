import request from 'superagent'
import { Trivia } from '../models/Trivia.ts'
import { GeneralKnowledge } from '../models/generalKnowledge.ts'
import { Animals } from '../models/animals.ts'

export async function getTrivia(): Promise<Trivia> {
  const response = await request.get(
    'https://opentdb.com/api.php?amount=10&category=20&type=multiple'
  )
  return response.body
}

export async function getGeneralKnowledge(): Promise<GeneralKnowledge> {
  const response = await request.get(
    'https://opentdb.com/api.php?amount=10&category=9&type=multiple'
  )
  return response.body
}

export async function getAnimals(): Promise<Animals> {
  const response = await request.get(
    'https://opentdb.com/api.php?amount=10&category=27&type=multiple'
  )
  return response.body
}