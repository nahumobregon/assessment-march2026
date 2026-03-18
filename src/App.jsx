import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewAssessment from './NewAssessment'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewAssessment />} />
      </Routes>
    </Router>
  )
}


export default App
