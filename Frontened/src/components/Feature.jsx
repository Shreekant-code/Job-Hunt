import "./Feature.css"
 export const Feature = () => {
  

  return (
    <section className="featured-jobs">
      <h2>Featured Jobs</h2>
      <div className="job-grid">
        {jobData.map((job) => (
          <div className="job-card" key={job.id}>
            <img
              src={job.logo}
              alt={`${job.title} Logo`}
              className="company-logo"
            />
            <h3>{job.title}</h3>
            <p className="location">{job.location}</p>
            <p className="salary">{job.salary}</p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>

      <a href="/jobs" className="view-all">
        View All Jobs →
      </a>
    </section>
  );
};

const jobData = [
  {
    id: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    title: "Frontend Developer",
    location: "New York, USA",
    salary: "$60,000 - $80,000 / year",
    skill: "React.js",
    demand: 32
  },
  {
    id: 2,
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    title: "UI/UX Designer",
    location: "Remote",
    salary: "$50,000 - $70,000 / year",
    skill: "Figma & UX Research",
    demand: 18
  },
  {
    id: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    title: "Software Engineer",
    location: "London, UK",
    salary: "£40,000 - £55,000 / year",
    skill: "Python",
    demand: 27
  },
  {
    id: 4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    title: "Cloud Engineer",
    location: "Toronto, Canada",
    salary: "$90,000 - $120,000 / year",
    skill: "AWS",
    demand: 15
  }
];