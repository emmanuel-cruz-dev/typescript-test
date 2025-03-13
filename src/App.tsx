import { useMemo, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./types/types";
import UsersList from "./components/UsersList";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (page: number) => {
  return await fetch(
    `https://randomuser.me/api/?page=${page}&results=10&seed=emmadev`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la petición.");
      return await res.json();
    })
    .then((res) => res.results);
};

function App() {
  const {
    isLoading,
    isError,
    data: users = [],
    refetch,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetchUsers(1),
  });
  // const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // const originalUsers = useRef<User[]>([]);

  const handleColor = () => {
    setShowColors(!showColors);
  };

  const handleCountryOrder = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleReset = async () => {
    await refetch();
    // setUsers(originalUsers.current);
  };

  const handleDeleteUser = (index: string) => {
    console.log(index);

    // const newUsers = users?.filter((item) => item.cell !== index);
    // setUsers(newUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setError(false);

  //   fetchUsers(currentPage)
  //     .then((users) => {
  //       setUsers((prevUsers) => {
  //         const newUsers = prevUsers.concat(users);
  //         originalUsers.current = newUsers;
  //         return newUsers;
  //       });
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       console.error(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [currentPage]);

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
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

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <main className="App">
      <h1>Prueba técnica</h1>
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
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDeleteUser}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {isLoading && <strong>Cargando... </strong>}
        {isError && <p>Ha habido un error.</p>}
        {!isLoading && !isError && users.length === 0 && (
          <p>No hay usuarios.</p>
        )}
        {!isLoading && !isError && (
          <button
            style={{ marginTop: "1rem" }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Cargar más resultados
          </button>
        )}
      </main>
    </main>
  );
}

export default App;
