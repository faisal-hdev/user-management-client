import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUser] = useState([]);
  // console.log(users);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {
      name,
      email,
    };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUser(newUser);
        form.reset();
      });
  };

  return (
    <>
      <h1>User management System</h1>
      <h3>Numbers of Users : {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="User Name" name="name" />
        <br />
        <input type="email" placeholder="User Email" name="email" />
        <br />
        <input type="submit" />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id} : {user.name} : {user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
