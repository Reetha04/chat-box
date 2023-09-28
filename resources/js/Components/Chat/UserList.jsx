import { useState } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function UserList({ users }) {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <Link href={`/chat/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
