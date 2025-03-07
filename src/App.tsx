import { useEffect, useState } from "react";
import "./App.css";

interface UserLocation {
  country: string;
}

interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface UserName {
  title: string;
  first: string;
  last: string;
}

interface UserId {
  name: string;
  value: string;
}

interface User {
  cell: string;
  email: string;
  id: UserId;
  name: UserName;
  picture: UserPicture;
  location: UserLocation;
}

function App() {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [rowColors, setRowColors] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        setUsers(data.results);
      });
  }, [reloadUsers]);

  const handleColor = () => {
    setRowColors(!rowColors);
  };

  const handleDeleteUser = (index: string) => {
    const newUsers = users?.filter((item) => item.cell !== index);
    setUsers(newUsers);
  };

  const refreshUsers = () => {
    setReloadUsers(!reloadUsers);
  };

  const handleInputFilter = (e) => {
    const value = e.target.value;

    const countries = users?.filter(
      (item) => item.location.country.toLowerCase() == value
    );
    console.log(countries);
  };

  return (
    <main className="App">
      <h1>Prueba técnica</h1>
      <p>Agregar Sonner para notificaciones toast</p>
      <div className="controls">
        <button onClick={handleColor}>Colorear filas</button>
        <button>Ordenar por país</button>
        <button onClick={() => refreshUsers()}>Resetear estado</button>
        <input
          onChange={handleInputFilter}
          name="country-filter"
          type="text"
          placeholder="Filtrar por país"
          id="country-filter"
        />
      </div>
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
    </main>
  );
}

export default App;
