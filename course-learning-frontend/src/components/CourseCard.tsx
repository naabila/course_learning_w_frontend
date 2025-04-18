import { Link } from 'react-router-dom';

interface CourseCardProps {
  course: {
    _id: string;
    title: string;
    description: string;
    teacherId: string;
    likes: number;
  };
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, width: 280, background: '#fafafa' }}>
      <h3 style={{ margin: '0 0 8px 0' }}>{course.title}</h3>
      <p style={{ minHeight: 40 }}>{course.description}</p>
      <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>Likes: {course.likes}</div>
      <Link to={`/courses/${course._id}`} style={{ color: '#1976d2', textDecoration: 'underline' }}>View Details</Link>
    </div>
  );
};

export default CourseCard;
