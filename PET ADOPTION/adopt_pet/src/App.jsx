import { Landing } from './components/landing';
import Home from './components/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Landing />}></Route>
        <Route path='/home' element={<Landing />}></Route>
        <Route path='/jj' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
