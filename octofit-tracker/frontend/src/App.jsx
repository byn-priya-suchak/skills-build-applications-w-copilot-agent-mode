import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl, codespaceName } from './components/api';
import './App.css';

const navLinks = [
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' }
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4 p-3 rounded border bg-white shadow-sm">
        <h1 className="h3 mb-2">OctoFit Tracker</h1>
        <p className="mb-1 text-secondary">
          Presentation tier powered by React Router + endpoint-aware data loading.
        </p>
        <p className="mb-0 small text-muted">
          Active API base: {apiBaseUrl}
          {codespaceName ? '' : ' (fallback to localhost because VITE_CODESPACE_NAME is unset)'}
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : 'text-dark border border-light-subtle bg-light'}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <main className="rounded border bg-white p-3 p-md-4 shadow-sm">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
