import { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

interface Course {
  _id: string;
  title: string;
  description: string;
  teacherId: string;
  likes: number;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/course`, {
          params: { page, limit, searchTerm }
        });
        setCourses(res.data.data.courses || []);
        setTotal(res.data.data.total || 0);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [page, limit, searchTerm]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>Courses</h2>
      <input
        type="text"
        placeholder="Search by title, subject, or level"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
        {courses.map(course => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
        <span style={{ margin: '0 12px' }}>Page {page}</span>
        <button onClick={() => setPage(p => (p * limit < total ? p + 1 : p))} disabled={page * limit >= total}>Next</button>
      </div>
    </div>
  );
};

export default Courses;
