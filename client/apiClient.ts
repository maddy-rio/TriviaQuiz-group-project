import request from 'superagent'
import { Trivia } from '../models/trivia.ts'

export async function getTrivia(): Promise<Trivia> {
  const response = await request.get(
    'https://opentdb.com/api.php?amount=10&category=20&type=multiple'
  )
  return response.body
}
