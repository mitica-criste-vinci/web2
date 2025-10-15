import "./UserCard.css";

const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const UserCard = () => {
  return (
    <div className="user-cards">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCard;
