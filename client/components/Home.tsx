import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to Trivia Quiz!</h1>
      <h2 className="quiz-over">Please, pick an category to play.</h2>

      <Link to={'./Trivia'}>
        <button>Mythology</button>
      </Link>
      <Link to={'./GeneralKnowledge'}>
        <button>General Knowledge</button>
      </Link>
      <Link to={'./Animals'}>
        <button>Animals</button>
      </Link>
    </div>
  )
}
