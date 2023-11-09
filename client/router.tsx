import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from './components/App.tsx'
import Home from './components/Home.tsx'
import Trivia from './components/Trivia.tsx'

export const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/Trivia" element={<Trivia />} />
  </Route>
)
export const router = createBrowserRouter(routes)
