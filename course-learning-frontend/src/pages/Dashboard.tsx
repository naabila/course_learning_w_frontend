import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  if (user.role === 'teacher') {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto' }}>
        <h2>Teacher Dashboard</h2>
        <ul>
          <li><Link to="/courses">Manage Courses</Link></li>
          <li><Link to="/dashboard/analytics">View Course Analytics</Link></li>
          <li><Link to={`/teachers/${user._id}`}>My Profile</Link></li>
        </ul>
        <div style={{ marginTop: 24 }}>
          <h3>Quick Actions</h3>
          <ul>
            <li><Link to="/courses?add=true">Add New Course</Link></li>
            <li><Link to="/dashboard/engagement">Track Student Engagement</Link></li>
          </ul>
        </div>
      </div>
    );
  }

  if (user.role === 'student') {
    return (
      <div style={{ maxWidth: 800, margin: '2rem auto' }}>
        <h2>Student Dashboard</h2>
        <ul>
          <li><Link to="/courses">Browse Courses</Link></li>
          <li><Link to="/me/progress">My Progress</Link></li>
          <li><Link to={`/students/${user._id}`}>My Profile</Link></li>
        </ul>
        <div style={{ marginTop: 24 }}>
          <h3>Quick Actions</h3>
          <ul>
            <li><Link to="/courses?enrolled=true">My Enrolled Courses</Link></li>
            <li><Link to="/dashboard/following">Following Teachers</Link></li>
          </ul>
        </div>
      </div>
    );
  }

  return null;
};

export default Dashboard;
