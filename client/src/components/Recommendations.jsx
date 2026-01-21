const Recommendations = ({ movies }) => {
  if (!movies?.length) return null;

  return (
    <ul>
      {movies.map((movie, i) => (
        <li key={i}>{movie}</li>
      ))}
    </ul>
  );
};

export default Recommendations;
