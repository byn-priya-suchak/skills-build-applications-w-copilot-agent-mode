import { useEffect, useState } from 'react';
import { apiBaseUrl, asCollection } from './api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadTeams = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/teams/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Teams request failed (${response.status})`);
        }

        const payload = await response.json();
        setTeams(asCollection(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    void loadTeams();
    return () => controller.abort();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Members</th>
              <th>Weekly Points</th>
            </tr>
          </thead>
          <tbody>
            {teams.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-muted">No teams returned.</td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team._id ?? team.id ?? team.name}>
                  <td>{team.name ?? 'N/A'}</td>
                  <td>{team.description ?? 'N/A'}</td>
                  <td>{Array.isArray(team.memberIds) ? team.memberIds.length : team.members ?? 0}</td>
                  <td>{team.weeklyPoints ?? 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
