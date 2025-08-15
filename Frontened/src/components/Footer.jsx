import "./Footer.css"
const NewsletterCTA = () => {
  return (
    <>
      {/* Newsletter Signup */}
      <section className="newsletter">
        <h2>Stay Updated with Job Alerts</h2>
        <p>Subscribe to get the latest job openings straight to your inbox.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>

      {/* Call-to-Action Footer */}
      <footer className="cta-footer">
        <div className="cta-buttons">
          <button className="browse-btn">Browse Jobs</button>
          <button className="post-btn">Post a Job</button>
        </div>

        <div className="footer-info">
          <p>© {new Date().getFullYear()} JobPortal. All Rights Reserved.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewsletterCTA;
