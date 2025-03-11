import { User } from "../types/types";

const handleDeleteUser = (
  users: User[],
  setUsers: (users: User[]) => void,
  index: string
) => {
  const newUsers = users?.filter((item) => item.cell !== index);
  setUsers(newUsers);
};

export default handleDeleteUser;
