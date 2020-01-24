import React from 'react';
import NavBar from './Components/NavBar/NavBar';
import routes from './routes';
import './reset.css';
import './stylesheets/main.scss';

function App() {
  return (
    <div className="App">
      <NavBar />
      {routes}
    </div>
  );
}

export default App;
