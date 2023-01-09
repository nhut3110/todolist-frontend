import logo from './logo.svg';
import './App.css';
import { ChangePassword, ChangedPassword, Home, UserSpace, ProfilePage, TaskPage, Signin, Signup } from './pages';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Signin />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/changesuccess' element={<ChangedPassword />} />
        <Route path='/userspace' element={<UserSpace />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/task/:id' element={<TaskPage />} />
      </Routes>
    </Router>

  );
}

export default App;
