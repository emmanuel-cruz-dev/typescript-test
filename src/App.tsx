import { useMemo, useState } from "react";
import "./App.css";
import { SortBy, User } from "./types/types";
import UsersList from "./components/UsersList";
import { userService } from "./services/userService";

function App() {
  const { users, setUsers, originalUsers } = userService();
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

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
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users?.filter((user) =>
          user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase())
        )
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.sort((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  return (
    <main className="App">
      <h1>Prueba técnica</h1>
      <p>Agregar Sonner para notificaciones toast</p>
      <header className="controls">
        <button onClick={handleColor}>Colorear filas</button>
        <button onClick={handleCountryOrder}>
          {sorting === SortBy.COUNTRY
            ? "No ordenar por país"
            : "Ordenar por país"}
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
          changeSorting={handleChangeSort}
          deleteUser={handleDeleteUser}
          showColors={showColors}
          users={sortedUsers}
        />
      </main>
    </main>
  );
}

export default App;
