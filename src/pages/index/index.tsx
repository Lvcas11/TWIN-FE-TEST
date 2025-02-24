import { Routes, Route } from 'react-router-dom';
import AddPage from '../add/add';
import EditPage from '../edit/edit';
import HomePage from '../home/home';

function App() {
  return (
    <div className="full-container m-0 p-0">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
