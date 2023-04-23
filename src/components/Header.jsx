import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { date, dayOfWeek } from "../utils/getDate";
import { getUsers, getTopics } from "../api";
import ErrorPage from "./ErrorPage";

const Header = ({ loggedInUser, setLoggedInUser }) => {
  const [availableUsers, setAvailableUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers()
      .then((response) => {
        setAvailableUsers(response);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  useEffect(() => {
    getTopics()
      .then((response) => {
        setTopics(response);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  }, []);

  if (error) return <ErrorPage message={error} />;

  return (
    <div className="header">
      <div className="header-main">
        <div className="date">
          <h3>{dayOfWeek}</h3>
          <h4>{date}</h4>
        </div>

        <div className="header-title">
          <h1>NC-NEWS</h1>
        </div>

        <div className="header-right">
          <nav className="home">
            <Link to="/">
              <button>Home</button>
            </Link>
          </nav>
          <nav className="users">
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
                <option key={-1} value="">
                  Log-in here
                </option>
                {availableUsers.map((user, index) => {
                  return (
                    <option key={index} value={user.username}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </label>
          </nav>
        </div>
      </div>
      <div className="subheader">
        <nav className="header-nav">
          <div className="all-button">
            <Link to="/articles">
              <button>All articles</button>
            </Link>
          </div>
          <div className="topic-buttons">
            {topics.map((topic, index) => {
              return (
                <Link key={index} to={`/articles/${topic.slug}`}>
                  <button>{topic.slug}</button>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
