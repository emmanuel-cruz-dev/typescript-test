import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { User } from "./types/types";

function App() {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [rowColors, setRowColors] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false);
  const [initialState, setInitialState] = useState<User[] | undefined>(
    undefined
  );
  const clicked = useRef(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        setUsers(data.results);
        setInitialState(data.results);
      })
      .catch((err) => {
        console.error(err);
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

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      setUsers(initialState);
    } else {
      const filteredUsers = users?.filter((item) =>
        item.location.country.toLowerCase().includes(value)
      );
      setUsers(filteredUsers ?? []);
    }
  };

  const handleCountryOrder = () => {
    if (clicked.current === false) {
      const rankedCountries = [...(users ?? [])].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
      setUsers(rankedCountries);
      // console.log(users);
      clicked.current = true;
    } else {
      setUsers(initialState);
      clicked.current = false;
    }
  };

  return (
    <main className="App">
      <h1>Prueba técnica</h1>
      <p>Agregar Sonner para notificaciones toast</p>
      <div className="controls">
        <button onClick={handleColor}>Colorear filas</button>
        <button onClick={handleCountryOrder}>
          {clicked.current ? "No ordenar por país" : "Ordenar por país"}
        </button>
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
    </main>
  );
}

export default App;
