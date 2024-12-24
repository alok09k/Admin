import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddStudent from './Components/AddStudent/AddStudent';
import StudentEditor from './Components/EditStudent/StudentEditor';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="app">
      <Navbar />
      <hr />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '200px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<AddStudent />} />
            <Route path="/edit" element={<StudentEditor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
