import { Suspense, lazy } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import JobsList from './pages/JobsList';

const JobInfo = lazy(()=> import('./pages/JobInfo'));

function App() {
  


  return (
    <>
      <header>
        <h1>Job Hunter</h1>
      </header>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}> 
            <Routes>
              <Route path='/' element={<JobsList />}/>
              <Route path='/:jobId' element={<JobInfo />} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App
