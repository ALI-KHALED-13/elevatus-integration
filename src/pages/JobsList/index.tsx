import { useEffect } from "react";
import { useLazyGetAllJobsQuery } from "../../store/services/jobsApi";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../../components/ListingCard";
import DebouncedInput from "../../components/DebouncedInput";


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
  error? <p>{JSON.stringify(error)}</p> : (
  <div>
    <nav style={{display: "flex", gap: 10}}>
      <div style={{maxWidth: "70%", overflowX: 'auto', position: 'sticky', top: 0}}>
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
      <div style={{minWidth: 100}}>
        <DebouncedInput
          value=''
          onChange={(searchStr)=> console.log(searchStr)}
          label="search jobs"
        />
      </div>
    </nav>
    <ul>
      {data?.results.jobs.map((job:IJobListing)=> (
        <ListingCard
          key={job.uuid}
          title={job.title}
          tags={job.career_level}
          location={job.location}
          linkProps={{to: job.uuid, state: {page: searchParams.get('page')}}}
        />
      ))}
    </ul>
  </div>
)
}

export default JobsList;