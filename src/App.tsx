import { Suspense, lazy } from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import JobsList from './pages/JobsList';
import { useTranslation } from 'react-i18next';

const JobInfo = lazy(()=> import('./pages/JobInfo'));

function App() {
  const {t} = useTranslation();
  
  return (
    <BrowserRouter>
      <header>
        <Link to="/" style={{cursor: 'pointer'}}>
          <h1>Job Hunter</h1>
        </Link>
      </header>
      
        <Suspense fallback={<div>{t('loading')}</div>}> 
            <Routes>
              <Route path='/' element={<JobsList />}/>
              <Route path='/:jobId' element={<JobInfo />} />
            </Routes>
        </Suspense>
      
    </BrowserRouter>
  );
}

export default App
