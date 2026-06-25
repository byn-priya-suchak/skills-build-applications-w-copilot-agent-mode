import { useEffect, useState } from 'react';
import { apiBaseUrl, asCollection } from './api';

function Leaderboard() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/leaderboard/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Leaderboard request failed (${response.status})`);
        }

        const payload = await response.json();
        setRows(asCollection(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    void loadLeaderboard();
    return () => controller.abort();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-muted">No leaderboard rows returned.</td>
              </tr>
            ) : (
              rows.map((row, index) => (
                <tr key={row._id ?? row.userId ?? index}>
                  <td>{row.rank ?? index + 1}</td>
                  <td>{row.userId ?? row.user ?? 'N/A'}</td>
                  <td>{row.points ?? 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
