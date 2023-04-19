import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { date, dayOfWeek } from "../utils/getDate";
import { getUsers, getTopics } from "../api";
import ArticlesTray from "./ArticlesTray";

const Header = ({ loggedInUser, setLoggedInUser }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getUsers().then((response) => {
      setAvailableUsers(response);
    });
  }, []);

  useEffect(() => {
    getTopics().then((response) => {
      setTopics(response);
    });
  }, []);

  return (
    <>
      <div className="Header">
        <h1>NC-NEWS</h1>
      </div>

      <div className="Date">
        <h3>{dayOfWeek}</h3>
        <h4>{date}</h4>
      </div>

      <nav className="nav">
        <Link to="/users">
          <button>Users</button>
        </Link>

        <label className="user-selector" htmlFor="logged-in-user">
          User:
          <select
            value={loggedInUser}
            onChange={(event) => {
              setLoggedInUser(() => {
                return event.target.value;
              });
            }}
            id="logged-in-user"
          >
            <option key={-1} value=""></option>
            {availableUsers.map((user, index) => {
              return (
                <option key={index} value={user.username}>
                  {user.username}
                </option>
              );
            })}
          </select>
        </label>

        <Link to="/articles">
          <button>All</button>
        </Link>
        <Link to="/">
          <button>Home</button>
        </Link>
        <section>
          {topics.map((topic, index) => {
            return (
              <Link key={index} to={`/articles/${topic.slug}`}>
                <button>{topic.slug}</button>
              </Link>
            );
          })}
        </section>
      </nav>
    </>
  );
};

export default Header;
