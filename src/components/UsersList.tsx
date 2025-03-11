function UsersList({ users }) {
  return (
    <table style={{ width: "90vw" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>First name</th>
          <th>Last name</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user) => {
            return (
              <tr className={`${rowColors ? "fila" : ""}`} key={user.cell}>
                <td>
                  <img
                    src={user.picture.thumbnail}
                    alt={`${user.name.title} ${user.name.first} ${user.name.last}`}
                    title={`${user.name.first} ${user.name.last}`}
                  />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.cell)}>
                    Borrar
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default UsersList;
