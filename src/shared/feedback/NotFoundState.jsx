import { Link } from "react-router-dom";
import { appRoutes } from "../../core/constants/routes";

function NotFoundState() {
  return (
    <section className="panel-card feedback-card">
      <p className="eyebrow">Missing</p>
      <h2>Page not found</h2>
      <p>The dashboard route you requested does not exist.</p>
      <div className="action-row">
        <Link to={appRoutes.overview} className="primary-button button-link">
          Return to overview
        </Link>
      </div>
    </section>
  );
}

export default NotFoundState;
