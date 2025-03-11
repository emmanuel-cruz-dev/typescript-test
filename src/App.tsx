import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { User } from "./types/types";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
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
    setShowColors(!showColors);
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
      <header className="controls">
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
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </main>
  );
}

export default App;
