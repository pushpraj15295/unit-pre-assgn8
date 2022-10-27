export default function Card({ login, avatar_url }) {
  return (
    <div
      style={{
        border: "1px solid",
        width: "200px",
        margin: "auto",
        marginBottom: "4px"
      }}
    >
      <h3>{login}</h3>
      <img src={avatar_url} alt={login} width="200" />
    </div>
  );
}
