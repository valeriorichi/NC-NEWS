const ErrorPage = ({ message }) => {
  console.log();
  return (
    <div>
      <h1 className="error-msg">{message?.msg || message}</h1>
      <img
        className="error-img"
        src="https://media.tenor.com/IQZucbKf9isAAAAC/mimi-neko-its-ok.gif"
        alt="It is ok, try again"
      />
    </div>
  );
};

export default ErrorPage;
