import { useLocation, useParams } from "react-router-dom";
import { jobsApi } from "../../store/services/jobsApi";


const JobInfo =()=>{
  const { jobId } = useParams();
  const {state: {page}} = useLocation();

  const data = jobsApi.endpoints.getAllJobs.useQueryState({page: +page}, {
    skip: !page || !jobId,
    selectFromResult: (state) => {
      console.log(state)
      return state.data?.results.jobs.find((jobInfo: IJobListing) => jobInfo.uuid === jobId) as IJobListing;
    }
  });


  return data && (
    <main>
      <h2>{data.title}</h2>
    </main>
  )
}

export default JobInfo;