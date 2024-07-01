import { useState, useEffect } from 'react';
import JobListing from './JobListing'
import Spinner from './Spinner';


const JobListings = ({isHome = false}) => {
  const [jobs, setJobs] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchJobs = async () =>{
      const apiUrl = isHome ? '/api/jobs?_limit=3'
      :'/api/jobs'
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        setJobs(data) 
      } catch (error) {
        console.log('Error fatching data', error)
      } finally{
        setLoading(false)
      }
    }
    fetchJobs();
  }, [])

  return (
    <section className="bg-blue-50 px-4 py-10">
    <div className="container-xl lg:container m-auto">
      <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
       {isHome ? 'Recent Jobs' : 'Browse Jobs'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ?(<Spinner loading={loading}/>) : 
        (<>
         {jobs.map((job) => (
            <JobListing key={job.id} job={job} />
        ))}
        </>
      )} 
       
      </div>
    </div>
  </section>

  )
}

export default JobListings