import { useEffect, useState } from 'react'
import { useLazyGetAllJobsQuery } from './store/services/jobsApi'


function App() {
  const [listingPage, setListingPage] = useState(0);

  const [getAllJobs, {data, isLoading, error}] = useLazyGetAllJobsQuery();

  useEffect(()=> {
    getAllJobs({page: listingPage}, true)
  }, [getAllJobs, listingPage])


  return isLoading? <p>Loadig...</p> :
    error? <p>JSON.stringify(error)</p> : (
    <div>
      <div style={{maxWidth: "100%", overflowX: 'auto', position: 'sticky', top: 0}}>
        {new Array(data?.results.pages).fill('page').map((_un, idx)=> (
          <button
            key={idx}
            onClick={()=> setListingPage(idx)}
            style={idx === data?.results.page? {color:'red'}: {}}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <ul>
        {data?.results.jobs.map(job=> (
          <li
            key={job.uuid}
          >
            <h3>{job.title}</h3>
            <p>{job.location.country}</p>
            <hr />
            <span>{job.career_level}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
