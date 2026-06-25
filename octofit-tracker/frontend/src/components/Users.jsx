import { useEffect, useState } from 'react';
import { apiBaseUrl, asCollection } from './api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const loadUsers = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/users/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Users request failed (${response.status})`);
        }

        const payload = await response.json();
        setUsers(asCollection(payload));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    };

    void loadUsers();
    return () => controller.abort();
  }, []);

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <h2 className="h4 mb-3">Users</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Level</th>
              <th>Weekly Goal</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-muted">No users returned.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.name ?? 'N/A'}</td>
                  <td>{user.email ?? 'N/A'}</td>
                  <td>{user.fitnessLevel ?? user.level ?? 'N/A'}</td>
                  <td>{user.weeklyGoal ?? 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
