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
import Login from "./Page/Login";
import Profile from "./Page/Profile";
import AdminDashboard from "./Page/AdminDashboard";
import AdminCategories from "./Page/AdminCategories";
import { useTheme } from "./hooks/useTheme";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <AuthProvider>
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
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
