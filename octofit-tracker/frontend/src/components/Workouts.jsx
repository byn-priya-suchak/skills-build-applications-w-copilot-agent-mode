import { useEffect, useState } from 'react';
import { apiBaseUrl, asCollection } from './api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadWorkouts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/workouts/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Workouts request failed (${response.status})`);
        }

        const payload = await response.json();
        setWorkouts(asCollection(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    void loadWorkouts();
    return () => controller.abort();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Workouts</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Title</th>
              <th>Focus</th>
              <th>Difficulty</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {workouts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-muted">No workouts returned.</td>
              </tr>
            ) : (
              workouts.map((workout) => (
                <tr key={workout._id ?? workout.id ?? workout.title}>
                  <td>{workout.title ?? 'N/A'}</td>
                  <td>{workout.focus ?? 'N/A'}</td>
                  <td>{workout.difficulty ?? 'N/A'}</td>
                  <td>{workout.durationMinutes ? `${workout.durationMinutes} min` : 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Workouts;
