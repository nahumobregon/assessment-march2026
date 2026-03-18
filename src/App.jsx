import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import OldAssessment from './OldAssessment'
import NewAssessment from './NewAssessment'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/old" element={<OldAssessment />} />
        <Route path="/new" element={<NewAssessment />} />
      </Routes>
    </Router>
  )
}

export default App
