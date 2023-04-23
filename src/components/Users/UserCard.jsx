const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar_url}
        alt="Avatar"
        width="50"
        height="50"
        className="user-avatar"
      />
      <p className="user-username">Username: {user.username}</p>
      <p className="user-name">Name: {user.name}</p>
    </div>
  );
};
export default UserCard;
