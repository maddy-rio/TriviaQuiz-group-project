import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>

      <Link to={'./Trivia'}>
        <button>Mythology</button>
      </Link>
      <Link to={'./GeneralKnowledge'}>
        <button>GeneralKnowledge</button>
      </Link>
      <Link to={'./Animals'}>
        <button>Animals</button>
      </Link>
    </div>
  )
}
