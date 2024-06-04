import { Landing } from './components/landing';
import Register from './components/register';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Landing />}></Route>
        <Route path='/home' element={<Landing />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
