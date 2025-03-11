import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { User } from "./types/types";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortedCountries, setSortedCountries] = useState(false);
  const originalUsers = useRef<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.results);
        setUsers(data.results);
        originalUsers.current = data.results;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleColor = () => {
    setShowColors(!showColors);
  };

  const handleDeleteUser = (index: string) => {
    const newUsers = users?.filter((item) => item.cell !== index);
    setUsers(newUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredUsers = users?.filter((item) =>
      item.location.country.toLowerCase().includes(value)
    );
    setUsers(filteredUsers ?? []);
  };

  const handleCountryOrder = () => {
    setSortedCountries((prevState) => !prevState);
  };

  const rankedCountries = sortedCountries
    ? [...(users ?? [])].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : users;

  return (
    <main className="App">
      <h1>Prueba técnica</h1>
      <p>Agregar Sonner para notificaciones toast</p>
      <header className="controls">
        <button onClick={handleColor}>Colorear filas</button>
        <button onClick={handleCountryOrder}>
          {sortedCountries ? "No ordenar por país" : "Ordenar por país"}
        </button>
        <button onClick={handleReset}>Resetear estado</button>
        <input
          onChange={handleInputFilter}
          name="country-filter"
          type="text"
          placeholder="Filtrar por país"
          id="country-filter"
        />
      </header>
      <main>
        <UsersList
          deleteUser={handleDeleteUser}
          showColors={showColors}
          users={rankedCountries}
        />
      </main>
    </main>
  );
}

export default App;
