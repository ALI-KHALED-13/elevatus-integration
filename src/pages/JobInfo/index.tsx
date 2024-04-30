import { useLocation, useNavigate, useParams } from "react-router-dom";
import { jobsApi } from "../../store/services/jobsApi";
import { useEffect } from "react";
import ListingCard from "../../components/ListingCard";


const JobInfo =()=>{
  const { jobId } = useParams();
  const {state: {page, query}} = useLocation();
  const navigate = useNavigate();

  const fetchedJobs = jobsApi.endpoints.getAllJobs.useQueryState({page: +page, query}, {
    skip: !page || !jobId,
    selectFromResult: (state) => state.data?.results.jobs as IJobListing[]
  });

  useEffect(()=> {
    if (!fetchedJobs){
      navigate('/', {replace: true})
    }
  }, [fetchedJobs, navigate])
  
  if (!fetchedJobs){
    return <div>redirecting to home page...</div>
  }
  const jobData = fetchedJobs.find(job=> job.uuid === jobId)


  return jobData && (
    <main style={{display: 'flex'}}>
      <section style={{width: "80%"}}>
        <h2>{jobData.title}</h2>
      </section>
      <aside>
        <h3>continue browsing other oppourtinities</h3>
        <ul>
        {fetchedJobs.slice(0, 6).map((job:IJobListing)=> job.uuid === jobId? null :
          <ListingCard
            key={ job.uuid}
            title={job.title}
            tags={job.career_level}
            location={job.location}
            linkProps={{to: "/" + job.uuid, state: {page: page}}}
          />
        )}
        </ul>
      </aside>
    </main>
  )
}

export default JobInfo;