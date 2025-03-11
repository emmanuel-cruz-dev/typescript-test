import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { User } from "./types/types";
import UsersList from "./components/UsersList";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const originalUsers = useRef<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortedCountries, setSortedCountries] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then((res) => res.json())
      .then((data) => {
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

  const handleCountryOrder = () => {
    setSortedCountries((prevState) => !prevState);
  };

  // const filteredUsers = sortedCountries
  //   ? [...(filteredUsers ?? [])].sort((a, b) =>
  //       a.location.country.localeCompare(b.location.country)
  //     )
  //   : filteredUsers;

  const filteredUsers = useMemo(() => {
    console.log("filteredUsers");

    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users?.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    console.log("sortedUsers");

    return sortedCountries
      ? [...(filteredUsers ?? [])].sort((a, b) =>
          a.location.country.localeCompare(b.location.country)
        )
      : filteredUsers;
  }, [filteredUsers, sortedCountries]);

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
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
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
          users={sortedUsers}
        />
      </main>
    </main>
  );
}

export default App;
