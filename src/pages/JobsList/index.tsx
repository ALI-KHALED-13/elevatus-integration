import { useEffect, useState } from "react";
import { useLazyGetAllJobsQuery } from "../../store/services/jobsApi";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../../components/ListingCard";
import DebouncedInput from "../../components/DebouncedInput";


const JobsList =()=>{

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const [getAllJobs, {data, isLoading, error}] = useLazyGetAllJobsQuery();

  useEffect(()=> {
    const page = searchParams.get('page');
    if (page){
      getAllJobs({page: +page, query: query}, true)
    } else {
      setSearchParams({page: '0'})
    }
  }, [getAllJobs, searchParams, setSearchParams, query])


  return isLoading? <p>Loadig...</p> :
  error? <p>{JSON.stringify(error)}</p> : data && (
  <main>
    <nav style={{display: "flex", gap: 10}}>
      <div style={{maxWidth: "70%", overflowX: 'auto', position: 'sticky', top: 0}}>
        {data?.results?.pages && new Array(data.results.pages).fill('page').map((_un, idx)=> (
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
          value={query}
          onChange={(searchStr)=> setQuery(searchStr)}
          label="search jobs"
        />
      </div>
    </nav>
    {data.results ? (
      <ul>
        {data?.results.jobs.map((job:IJobListing)=> (
          <ListingCard
            key={job.uuid}
            title={job.title}
            tags={job.career_level}
            location={job.location}
            linkProps={{
              to: job.uuid,
              state: {page: searchParams.get('page'), query: query}
            }}
          />
        ))}
      </ul>
    ):(
      <p>No jobs {query? 'matching this search': ''}</p>
    )}
    
  </main>
)
}

export default JobsList;