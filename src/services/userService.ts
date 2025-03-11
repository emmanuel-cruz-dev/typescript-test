import { useEffect, useState, useRef } from "react";
import { User } from "../types/types";

export const userService = () => {
  const [users, setUsers] = useState<User[]>([]);
  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return { users, setUsers, originalUsers };
};
