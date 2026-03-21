import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NewAssessment from './NewAssessment'
import ModernAssessment from './ModernAssessment'
import Home from './Home'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailed" element={<NewAssessment />} />
        <Route path="/modern" element={<ModernAssessment />} />
      </Routes>
    </Router>
  )
}


export default App
