import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import 'firebase/auth';
import 'firebase/firestore';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;




