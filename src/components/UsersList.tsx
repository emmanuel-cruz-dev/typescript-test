import { SortBy, type User } from "../types/types";

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUser: (index: string) => void;
  showColors: boolean;
  users: User[];
}

function UsersList({ changeSorting, deleteUser, showColors, users }: Props) {
  return (
    <table style={{ width: "90vw" }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            style={{ cursor: "crosshair" }}
            onClick={() => changeSorting(SortBy.NAME)}
            title="Ordenar por Nombre"
          >
            Nombre
          </th>
          <th
            style={{ cursor: "crosshair" }}
            onClick={() => changeSorting(SortBy.LAST)}
            title="Ordenar por Apellido"
          >
            Apellido
          </th>
          <th
            style={{ cursor: "crosshair" }}
            onClick={() => changeSorting(SortBy.COUNTRY)}
            title="Ordenar por País"
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map((user, index) => {
            const backgroundColor = index % 2 == 0 ? "#333" : "#555";
            const color = showColors ? backgroundColor : "transparent";
            return (
              <tr
                style={{
                  backgroundColor: color,
                }}
                key={user.cell}
              >
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
                  <button onClick={() => deleteUser(user.cell)}>Borrar</button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default UsersList;
