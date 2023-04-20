import { useState, useEffect } from "react";
import axios from "axios";
import UserTray from "./UserTray";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://val-northcoders.onrender.com/api/users`)
      .then((response) => {
        console.log("My users>>>>", response.users);
        setUsers(response.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2 className="">Users:</h2>
      <UserTray users={users} setUsers={setUsers} />
    </div>
  );
};
export default UsersPage;
