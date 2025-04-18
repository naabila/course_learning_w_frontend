import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';

interface Feedback {
  _id: string;
  userId: string;
  comment: string;
  rating: number;
}

const FeedbackList = ({ courseId }: { courseId: string }) => {
  const { user, token } = useAuth();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/feedback/${courseId}`);
        setFeedbacks(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [courseId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/feedback`,
        { courseId, comment, rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      setRating(5);
      // Refresh feedbacks
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/feedback/${courseId}`);
      setFeedbacks(res.data.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit feedback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {loading && <div>Loading feedback...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {feedbacks.map(fb => (
          <li key={fb._id} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
            <strong>Rating:</strong> {fb.rating} <br />
            <span>{fb.comment}</span>
          </li>
        ))}
      </ul>
      {user && user.role === 'student' && (
        <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
          <div>
            <label>Rating: </label>
            <select value={rating} onChange={e => setRating(Number(e.target.value))}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label>Comment: </label>
            <input value={comment} onChange={e => setComment(e.target.value)} required style={{ width: 300 }} />
          </div>
          <button type="submit" disabled={submitting} style={{ marginTop: 8 }}>
            {submitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackList;
