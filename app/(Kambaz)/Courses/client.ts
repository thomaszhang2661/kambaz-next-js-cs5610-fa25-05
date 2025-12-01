import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axios.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axios.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

const MODULES_API = `${HTTP_SERVER}/api/modules`;
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const findPeopleForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/people`
  );
  return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const getAssignment = async (assignmentId: string) => {
  const response = await axios.get(
    `${HTTP_SERVER}/api/assignments/${assignmentId}`
  );
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/assignments/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/assignments/${assignmentId}`
  );
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/enrollments`,
    { courseId }
  );
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/current/enrollments/${courseId}`
  );
  return response.data;
};

// Admin-style: enroll/unenroll a specific user by id for a course
export const enrollUserInCourse = async (courseId: string, userId: string) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/enroll/${userId}`
  );
  return response.data;
};

export const unenrollUserFromCourseById = async (
  courseId: string,
  userId: string
) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/enroll/${userId}`
  );
  return response.data;
};

// Admin-style user management
export const createUserAdmin = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
  return response.data;
};
