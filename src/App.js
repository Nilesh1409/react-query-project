import "./styles.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
let data = [
  { id: 1, name: "john" },
  { id: 2, name: "peter" }
];

export default function App() {
  const queryClint = useQueryClient();

  const postQuery = useQuery({
    queryKey: ["list"],
    queryFn: () => wait(1000).then(() => [...data])
  });
  const addQuery = useMutation({
    mutationFn: (name) => {
      return wait(1000).then(() => {
        data.push({ id: 3, name });
      });
    },
    onSuccess: () => queryClint.invalidateQueries(["list"])
  });

  if (postQuery.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      {postQuery.data.map((item) => {
        return <h2 key={item.id}>{item.name}</h2>;
      })}
      <button onClick={() => addQuery.mutate("Harry")}>Add more</button>
    </div>
  );
}

const wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
