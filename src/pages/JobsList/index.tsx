import { useEffect } from "react";
import { useLazyGetAllJobsQuery } from "../../store/services/jobsApi";
import { Link, useSearchParams } from "react-router-dom";


const JobsList =()=>{

  const [searchParams, setSearchParams] = useSearchParams()

  const [getAllJobs, {data, isLoading, error}] = useLazyGetAllJobsQuery();

  useEffect(()=> {
    const page = searchParams.get('page');
    if (page){
      getAllJobs({page: +page}, true)
    } else {
      setSearchParams({page: '0'})
    }
  }, [getAllJobs, searchParams, setSearchParams])


  return isLoading? <p>Loadig...</p> :
  error? <p>JSON.stringify(error)</p> : (
  <div>
    <div style={{maxWidth: "100%", overflowX: 'auto', position: 'sticky', top: 0}}>
      {new Array(data?.results.pages).fill('page').map((_un, idx)=> (
        <button
          key={idx}
          onClick={()=> setSearchParams({page: idx + ''})}
          style={idx + 1 === data?.results.page? {color:'red'}: {}}
        >
          {idx + 1}
        </button>
      ))}
    </div>
    <ul>
      {data?.results.jobs.map((job:IJobListing)=> (
        <li
          key={job.uuid}
        >
          <Link to={job.uuid} state={{page: searchParams.get('page')}}>
            <h3>{job.title}</h3>
          </Link>
          <p>{job.location.country}</p>
          <hr />
          <span>{job.career_level}</span>
        </li>
      ))}
    </ul>
  </div>
)
}

export default JobsList;