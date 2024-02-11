import { Route, Router, useLocation } from 'wouter';
import NavBar from '../src/components/NavBar';
import Login from './views/Login'; 
import SignUp from './views/SignUp';
import AdminHome from './views/admin/AdminHome';
import ResidentHome from './views/resident/ResidentHome';
import CreateIncidence from './views/resident/CreateIncidence';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [location] = useLocation();
  const isHomeOrSignUp = location === "/" || location === "/sign-up";
  return (
    <Router>
      <div>
      {!isHomeOrSignUp && <NavBar />}
          <Route path="/" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/admin-home" component={AdminHome} />
          <Route path="/resident-home" component={ResidentHome} />
          <Route path="/create-incidence" component={CreateIncidence} />
      </div>
    </Router>
  )
}

export default App
