import './App.css';
import { Route } from 'react-router';
import Index from './pages/index.js';
import Timeline from './pages/timeline';
import Shugenja from './pages/shugenja.js';
import ShugenjaPrint from './pages/shugenjaprint.js';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Index}/>
      <Route exact path="/timeline" component={Timeline}/>
      <Route exact path="/shugenja" component={Shugenja}/>
      <Route path="/shugenja/print" component={ShugenjaPrint}/>
    </div>
  );
}

export default App;
