import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TopicCard from '../components/TopicCard';
import QuizCard from '../components/QuizCard';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  topics: any[];
  quizzes: any[];
}

const LessonDetails = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/lesson/${id}`);
        setLesson(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load lesson');
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto' }}>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      <h3>Topics</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {lesson.topics && lesson.topics.length > 0 ? (
          lesson.topics.map((topic: any) => <TopicCard key={topic._id} topic={topic} />)
        ) : (
          <div>No topics yet.</div>
        )}
      </div>
      <h3 style={{ marginTop: 32 }}>Quizzes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {lesson.quizzes && lesson.quizzes.length > 0 ? (
          lesson.quizzes.map((quiz: any) => <QuizCard key={quiz._id} quiz={quiz} />)
        ) : (
          <div>No quizzes yet.</div>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;
