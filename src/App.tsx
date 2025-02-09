import { Button } from '@mui/material';
import RuleSet from './components/RuleSet';
import Flights from './components/Flights';
import Navbar from './components/Navbar';
import { useExportRules } from './utilities/exportRules';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const rules = useExportRules();

  async function copyRulesToClipboard() {
    const data = JSON.stringify(rules);
    await fetch('http://127.0.0.1:5000/ruleset', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    if ('clipboard' in navigator) return await navigator.clipboard.writeText(data);
    else return document.execCommand('copy', true, data);
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<>Hi</>} />
        <Route
          path="/ruleset"
          element={
            <>
              <RuleSet />
              <Button variant="contained" onClick={copyRulesToClipboard}>
                Export Rules
              </Button>
            </>
          }
        />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </Router>
  );
}

export default App;
