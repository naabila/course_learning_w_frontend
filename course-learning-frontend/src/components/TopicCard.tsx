import { Link } from 'react-router-dom';

interface TopicCardProps {
  topic: {
    _id: string;
    title: string;
    content: string;
  };
}

const TopicCard = ({ topic }: TopicCardProps) => {
  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 12, background: '#f9f9f9' }}>
      <h4 style={{ margin: '0 0 8px 0' }}>{topic.title}</h4>
      <p style={{ minHeight: 24 }}>{topic.content}</p>
      <Link to={`/topics/${topic._id}`} style={{ color: '#1976d2', textDecoration: 'underline' }}>View Topic</Link>
    </div>
  );
};

export default TopicCard;
