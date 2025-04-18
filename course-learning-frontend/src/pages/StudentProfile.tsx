import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import CourseCard from '../components/CourseCard';

const StudentProfile = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined
        });
        setUser(res.data.data);
        if (res.data.data.coursesEnrolled && res.data.data.coursesEnrolled.length > 0) {
          const courseRes = await axios.get(`${import.meta.env.VITE_API_URL}/course`, {
            params: { page: 1, limit: 100 },
          });
          setCourses(courseRes.data.data.courses.filter((c: any) => res.data.data.coursesEnrolled.includes(c._id)));
        }
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load student profile');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!user) return <div>Student not found</div>;

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>Student Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
      <h3 style={{ marginTop: 24 }}>Enrolled Courses</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {courses.length > 0 ? courses.map(course => (
          <CourseCard key={course._id} course={course} />
        )) : <div>No enrolled courses.</div>}
      </div>
    </div>
  );
};

export default StudentProfile;
