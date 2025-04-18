import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
      <Link to="/">Home</Link>
      <Link to="/courses">Courses</Link>
      {user && user.role === 'teacher' && <Link to="/dashboard">Dashboard</Link>}
      {user && user.role === 'student' && <Link to="/dashboard">Dashboard</Link>}
      {user && <Link to={user.role === 'teacher' ? `/teachers/${user._id}` : `/students/${user._id}`}>Profile</Link>}
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span>Welcome, {user.name} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
