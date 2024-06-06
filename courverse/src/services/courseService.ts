import api from './api';

interface Course {
  id: string;
  title: string;
  description: string;
  lessons: { id: string; title: string; completed: boolean }[];
}

export const getCourses = async (): Promise<Course[]> => {
  const response = await api.get('/courses');
  return response.data;
};

export const getCourse = async (id: string): Promise<Course> => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

export const createCourse = async (course: Course): Promise<Course> => {
  const response = await api.post('/courses', course);
  return response.data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await api.delete(`/courses/${id}`);
};
