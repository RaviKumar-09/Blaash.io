import React from 'react';
import DragDropBuilder from './components/DragDropBuilder'; // Import the DragDropBuilder component
import './App.css'; // Import the styles
import Sidebar from './components/Sidebar';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Page Builder</h1>
      </header>
      <div>
        
        <Sidebar></Sidebar>
      </div>
      <main>
        <DragDropBuilder /> {/* Render the DragDropBuilder component */}
      </main>
    </div>
  );
}


export default App;
