import { useUsers } from "../hooks/useUsers";

function Results() {
  const { users } = useUsers();
  return <h3>Resultados ({users.length})</h3>;
}

export default Results;
