import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import LessonCard from '../components/LessonCard';
import FeedbackList from '../components/FeedbackList';

interface Course {
  _id: string;
  title: string;
  description: string;
  teacherId: string;
  likes: number;
  lessons: any[];
}

const CourseDetails = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [enrollLoading, setEnrollLoading] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/course/${id}`);
        setCourse(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load course');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (user && course) {
      setEnrolled(course.enrolledStudents?.includes(user._id));
    }
  }, [user, course]);

  const handleEnroll = async () => {
    if (!user) return;
    setEnrollLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/enroll`,
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolled(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to enroll');
    } finally {
      setEnrollLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) return;
    setLikeLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/user/like`,
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCourse(c => c ? { ...c, likes: c.likes + 1 } : c);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to like course');
    } finally {
      setLikeLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div style={{ margin: '12px 0' }}>
        <span>Likes: {course.likes}</span>
        {user && (
          <button onClick={handleLike} disabled={likeLoading} style={{ marginLeft: 16 }}>
            {likeLoading ? 'Liking...' : 'Like'}
          </button>
        )}
      </div>
      {user && user.role === 'student' && !enrolled && (
        <button onClick={handleEnroll} disabled={enrollLoading} style={{ marginBottom: 16 }}>
          {enrollLoading ? 'Enrolling...' : 'Enroll in this course'}
        </button>
      )}
      <h3>Lessons</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {course.lessons && course.lessons.length > 0 ? (
          course.lessons.map((lesson: any) => <LessonCard key={lesson._id} lesson={lesson} />)
        ) : (
          <div>No lessons yet.</div>
        )}
      </div>
      <h3 style={{ marginTop: 32 }}>Feedback</h3>
      <FeedbackList courseId={course._id} />
    </div>
  );
};

export default CourseDetails;
