import { useState } from 'react';
import LogOutModal from './components/LogOutModal/LogOutModal.jsx';
import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SharedLayout from './SharedLayout';

import './App.css';
import NotFound from './page/NotFound/NotFound.jsx';
import Loader from './components/Loader/Loader.jsx';

const HomePage = lazy(() => import('./page/HomePage/HomePage'));
const SignInPage = lazy(() => import('./page/SignInPage/SignInPage'));
const SignUpPage = lazy(() => import('./page/SignUpPage/SignUpPage'));
const TrackerPage = lazy(() => import('./page/TrackerPage/TrackerPage'));

function App() {
  return (
  // <button onClick={()=>openLogOutModal()}>LogOut</button>
  //   <LogOutModal 
  //   logOutModalIsOpen={logOutModalIsOpen} 
  //       closeLogOutModal={closeLogOutModal} />
      

      

    
  
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
