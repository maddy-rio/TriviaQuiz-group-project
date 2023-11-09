export interface Trivia {
  response_code: number
  results: Result[]
}

export interface Result {
  category: Category
  type: Type
  difficulty: Difficulty
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export enum Category {
  Mythology = 'Mythology',
}

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
}

export enum Type {
  Multiple = 'multiple',
}
