import { useLocation, useNavigate, useParams } from "react-router-dom";
import { jobsApi } from "../../store/services/jobsApi";
import { useEffect } from "react";
import ListingCard from "../../components/ListingCard";
import { useTranslation } from "react-i18next";
import './styles.css';


const JobInfo =()=>{
  const {t} = useTranslation("jobPage");

  const { jobURI } = useParams();
  const {state: {page, query}} = useLocation();
  const navigate = useNavigate();

  const fetchedJobs = jobsApi.endpoints.getAllJobs.useQueryState({page: +page , ...(query ?{query}:{})}, {
    skip: page === undefined || !jobURI,
    selectFromResult: (state) =>  state.data?.results.jobs as IJobListing[]
  });


  useEffect(()=> {
    // navigate back to home page if there is no cached post with the given jobURI
    if (!fetchedJobs){
      navigate('/', {replace: true})
    }
  }, [fetchedJobs, navigate])
  
  if (!fetchedJobs){
    return <div>{t("redirecting")}</div>
  }
  
  const jobData = fetchedJobs.find(job=> job.uri === jobURI)

  return jobData && (
    <main className="job-info">
      <section className="job-info__content">
        <h2 className="job-info__title">{jobData.title}</h2>
        <p>
          {jobData.description?
            jobData.description.replace(/<\/?p>/g, "") 
            : t("noDescription")
          }
        </p>
        <div dangerouslySetInnerHTML={{ __html: jobData.requirements }}>
        </div>
      </section>
      <aside className="job-info__jobs">
        <h3 className="job-info__continue">{t("continueBrowsing")}</h3>
        <ul className="job-info__list">
        {fetchedJobs.slice(0, 6).map((job:IJobListing)=> job.uuid === jobURI? null :
          <ListingCard
            key={job.uuid}
            title={job.title}
            tags={job.career_level}
            location={job.location}
            linkProps={{to: "/" + job.uri, state: {page: +page - 1}}}
          />
        )}
        </ul>
      </aside>
    </main>
  )
}

export default JobInfo;