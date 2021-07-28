import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import crud from './pages/Crud/crud';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/crud" exact component={crud}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;

