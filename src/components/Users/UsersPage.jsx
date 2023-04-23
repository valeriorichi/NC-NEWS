import { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./UserCard";

const UsersPage = ({ loggedInUser }) => {
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
      <h2 className="users">Users:</h2>
      {users.map((user) => (
        <UserCard key={user.user_id} user={user} />
      ))}
    </div>
  );
};
export default UsersPage;
