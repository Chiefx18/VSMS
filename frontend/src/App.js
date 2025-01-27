import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/login/Login';
import Main from './components/main/Main';
import Signup from './components/signup/Signup';

function App() {
  const token = localStorage.getItem('token');
  return (

        <Routes>
          {token && <Route path= "/" exact element= {<Main/>}></Route>}
          <Route path="/login" exact element={<Login/>}></Route>
          <Route path="/signup" exact element={<Signup/>}></Route>
          <Route path="/" exact element={<Navigate replace to = "/login"/>}></Route>
        </Routes>
 
  );
}

export default App;
