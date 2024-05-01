import { Suspense, lazy } from 'react'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import JobsList from './pages/JobsList';
import { useTranslation } from 'react-i18next';
import { Translate } from '@mui/icons-material';
import './App.css';

const JobInfo = lazy(()=> import('./pages/JobInfo'));

function App() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || window.localStorage.i18nextLng

  const changeLanguageHandler = () =>{
      i18n.changeLanguage(currentLanguage.includes("en")? 'ar': 'en')
  }

  return (
    <BrowserRouter>
      <header className="header">
        <div className="header__container">
          <Link to="/">
            <h1>Job Hunter</h1>
          </Link>
          <button
            className="translate-button"
            onClick={changeLanguageHandler}
            style={{marginLeft: 'auto', alignSelf: 'center', padding: 5}}
          >
            {currentLanguage}
            <Translate fontSize='small'/>
          </button>
        </div>
      </header>
      
        <Suspense fallback={<div>{t('loading')}</div>}> 
            <Routes>
              <Route path='/' element={<JobsList />}/>
              <Route path='/:jobURI' element={<JobInfo />} />
            </Routes>
        </Suspense>
      
    </BrowserRouter>
  );
}

export default App
