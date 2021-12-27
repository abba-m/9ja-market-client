import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "pages/dashboardPage";
import TestPage from "pages/testPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
