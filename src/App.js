import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import NavBar from './components/partials/NavBar'
import Home from './components/routes/Home'
import Blog from './components/routes/Blog'
import NewBlog from './components/routes/NewBlog'
import EditBlog from './components/routes/EditBlog'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Routes>
          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/blogs/new'
            element={<NewBlog />}
          />

          <Route
            path='/blogs/:id/edit'
            element={<EditBlog />}
          />

          <Route
            path='/blogs/:id'
            element={<Blog />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
