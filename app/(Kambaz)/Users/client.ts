import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findAllUsers = async () => {
  const { data } = await axios.get(USERS_API);
  return data;
};

export const findUserById = async (id: string) => {
  const { data } = await axios.get(`${USERS_API}/${id}`);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(USERS_API, user);
  return data;
};

export const updateUser = async (id: string, user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${id}`, user);
  return data;
};

export const deleteUser = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${id}`);
  return data;
};

export const findUsersByRole = async (role: string) => {
  const { data } = await axios.get(`${USERS_API}?role=${role}`);
  return data;
};
