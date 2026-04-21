function ErrorMessage({ message }) {
  return (
    <div className="error-box">
      <p>⚠️ {message}</p>
    </div>
  );
}

export default ErrorMessage;