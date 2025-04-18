import { Link } from 'react-router-dom';

interface LessonCardProps {
  lesson: {
    _id: string;
    title: string;
    description: string;
    courseId: string;
  };
}

const LessonCard = ({ lesson }: LessonCardProps) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#fff' }}>
      <h4 style={{ margin: '0 0 8px 0' }}>{lesson.title}</h4>
      <p style={{ minHeight: 24 }}>{lesson.description}</p>
      <Link to={`/lessons/${lesson._id}`} style={{ color: '#1976d2', textDecoration: 'underline' }}>View Lesson</Link>
    </div>
  );
};

export default LessonCard;
