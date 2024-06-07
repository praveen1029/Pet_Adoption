import { Landing } from './components/landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import PetForm from './components/pet_form';
import PetList from './components/pet_list';
import UserPage from './components/user_page';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Landing />}></Route>
        <Route path='/home' element={<Landing />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/pet_form' element={<PetForm />}></Route>
        <Route path='/pet_list' element={<PetList />}></Route>
        <Route path='/user_page' element={<UserPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
