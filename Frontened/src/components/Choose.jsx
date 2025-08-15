import "./Choose.css";
 export const Choose = () => {
  return (
    <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="benefit-card">
            <i className={benefit.icon}></i>
            <h3>{benefit.title}</h3>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};


const benefits = [
  {
    id: 1,
    title: "Large Database of Jobs",
    description: "Thousands of opportunities updated daily across multiple industries.",
    icon: "fa-solid fa-database"
  },
  {
    id: 2,
    title: "Verified Companies",
    description: "Work with trusted employers who meet our verification standards.",
    icon: "fa-solid fa-circle-check"
  },
  {
    id: 3,
    title: "Free Resume Upload",
    description: "Upload your CV and let recruiters find you with ease.",
    icon: "fa-solid fa-file-arrow-up"
  },
  {
    id: 4,
    title: "Quick Application Process",
    description: "Apply to jobs in just a few clicks with our streamlined process.",
    icon: "fa-solid fa-bolt"
  }
];


