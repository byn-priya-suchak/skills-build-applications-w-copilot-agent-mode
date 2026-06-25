import { useEffect, useState } from 'react';
import { asCollection, codespaceName } from './api';

const activitiesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadActivities = async () => {
      try {
        const response = await fetch(activitiesApiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Activities request failed (${response.status})`);
        }

        const payload = await response.json();
        setActivities(asCollection(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    void loadActivities();
    return () => controller.abort();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Activities</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Type</th>
              <th>Duration</th>
              <th>Calories</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-muted">No activities returned.</td>
              </tr>
            ) : (
              activities.map((activity) => (
                <tr key={activity._id ?? activity.id ?? `${activity.userId}-${activity.performedAt}`}>
                  <td>{activity.activityType ?? activity.type ?? 'N/A'}</td>
                  <td>{activity.durationMinutes ? `${activity.durationMinutes} min` : 'N/A'}</td>
                  <td>{activity.caloriesBurned ?? 'N/A'}</td>
                  <td>{activity.performedAt ? new Date(activity.performedAt).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
