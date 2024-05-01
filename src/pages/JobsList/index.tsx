import { useEffect, useState } from "react";
import { useLazyGetAllJobsQuery } from "../../store/services/jobsApi";
import { useSearchParams } from "react-router-dom";
import ListingCard from "../../components/ListingCard";
import DebouncedInput from "../../components/DebouncedInput";
import { useTranslation } from "react-i18next";


const JobsList =()=>{
  const {t} = useTranslation("listPage");

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const [getAllJobs, {data, isFetching, isLoading, error}] = useLazyGetAllJobsQuery();

  useEffect(()=> { // on mount
    // if the inital visit of the web page (no page search param) ||
    //a refresh of the page where param exists but no fetch call happened yet
    const pageParam = searchParams.get('page') as string || undefined;
    if (!pageParam || (!data && !isLoading)){
      if (!pageParam){
        setSearchParams({page: '1'})
        getAllJobs({page: 0}, true)
      } else {
        getAllJobs({page: Number(pageParam) - 1}, true)
      }
    }
  }, [getAllJobs, setSearchParams, searchParams, data, isLoading])

  const handlePaginationClick =(pageNum: number)=>{
    setSearchParams({page: pageNum + 1 + ''})
    getAllJobs({page: pageNum, ...(query ?{query}:{})}, true)
  }

  const handleSearchInput =(searchStr:string)=> {
    setQuery(searchStr)
    setSearchParams({page: '1'}) // reset to first page
    getAllJobs({
      page: 0, 
      query: searchStr
    }, true)
  }

  return isLoading? <p>{t('loading')}</p> :
  error? <p>{JSON.stringify(error)}</p> : data && (
  <main>
    <nav style={{display: "flex", gap: 10}}>
      <div style={{width: "70%", overflowX: 'auto', position: 'sticky', top: 0, flexShrink: 0}}>
        {data?.results?.pages && data.results.pages> 1 && Array.from({ length: data.results.pages }).map((_un, idx)=> (
          <button
            key={idx}
            onClick={()=> handlePaginationClick(idx)}
            style={idx + 1 === data?.results.page? {color:'red'}: {}}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <DebouncedInput
        value={query}
        onChange={handleSearchInput}
        label={t('searchLabel')}
        style={{display: 'inline-block', minWidth: 100, alignSelf: 'end'}}
      />
    </nav>
    {isFetching?//upon every page navigation or search input
      <p>{t('loading')}</p>
      :data.results ? (
        <ul>
          {data?.results.jobs.map((job:IJobListing)=> (
            <ListingCard
              key={job.uuid}
              title={job.title}
              tags={job.career_level}
              location={job.location}
              linkProps={{
                to: job.uri,
                state: {page: Number(searchParams.get('page')) - 1, ...(query ?{query}:{})}
              }}
            />
          ))}
        </ul>
    ):(
      <p>{t("noJobs")} {query? t("unmatchedSearch"): ''}</p>
    )}
    
  </main>
)
}

export default JobsList;