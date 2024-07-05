import { Landing } from './components/landing';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginRegister from './components/login_register';
import PetForm from './components/pet_form';
import PetList from './components/pet_list';
import UserPage from './components/user_page';
import PetDetails from './components/pet_details';
import MyDonations from './components/my_donations';
import MyAdoptions from './components/my_adoptions';
import AdminDetails from './components/admin_details';
import UserDonor from './components/user_donor';
import PendingApproval from './components/approve_adoption_list';
import AdoptionDonation from './components/donations_adoptions';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Landing />}></Route>
        <Route path='/home' element={<Landing />}></Route>
        <Route path='/login-register' element={<LoginRegister />}></Route>
        <Route path='/pet_form' element={<PetForm />}></Route>
        <Route path='/pet_list' element={<PetList />}></Route>
        <Route path='/my_donations' element={<MyDonations />}></Route>
        <Route path='/my_adoptions' element={<MyAdoptions />}></Route>
        <Route path='/user_page' element={<UserPage />}></Route>
        <Route path='/pet_details' element={<PetDetails />}></Route>
        <Route path='/admin_details' element={<AdminDetails />}></Route>
        <Route path='/donors' element={<UserDonor />}></Route>
        <Route path='/users' element={<UserDonor />}></Route>
        <Route path='/adoption' element={<AdoptionDonation />}></Route>
        <Route path='/donation' element={<AdoptionDonation />}></Route>
        <Route path='/pending_approval' element={<PendingApproval />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
