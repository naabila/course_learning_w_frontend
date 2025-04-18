import { Link } from 'react-router-dom';

interface QuizCardProps {
  quiz: {
    _id: string;
    title: string;
    description: string;
  };
}

const QuizCard = ({ quiz }: QuizCardProps) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#f6f6ff' }}>
      <h4 style={{ margin: '0 0 8px 0' }}>{quiz.title}</h4>
      <p style={{ minHeight: 24 }}>{quiz.description}</p>
      <Link to={`/quizzes/${quiz._id}`} style={{ color: '#1976d2', textDecoration: 'underline' }}>View Quiz</Link>
    </div>
  );
};

export default QuizCard;
