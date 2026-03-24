import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";

import MyNavbar from "./Components/MyNavbar";
import Home from "./Page/Home";
import Detail from "./Page/Detail";
import Contact from "./Page/Contact";
import About from "./Page/About";
import Natural from "./Page/Natural";
import Special from "./Page/Special";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="App">
        <MyNavbar theme={theme} toggleTheme={toggleTheme} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/about" element={<About />} />
          <Route path="/naturals" element={<Natural />} />
          <Route path="/specials" element={<Special />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
