import { useLocation, useParams } from "react-router-dom";
import { jobsApi } from "../../store/services/jobsApi";


const JobInfo =()=>{
  const { jobId } = useParams();
  const {state: {page}} = useLocation();

  console.log({page})
  
  const {data} = jobsApi.endpoints.getAllJobs.useQueryState({page}, {skip: !page || !jobId});

  console.log(data)

  return (
    <main>
      Job ${jobId}
    </main>
  )
}

export default JobInfo;