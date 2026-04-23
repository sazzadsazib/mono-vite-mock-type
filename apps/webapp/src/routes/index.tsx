import { useUsers } from '@/features/users/hooks/useUsers';
import Header from '@/header';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { data: users, isPending, error } = useUsers();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Header />

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Users from Mock API</h2>

        {isPending && <p className="text-gray-500">Loading...</p>}

        {error && <p className="text-red-500">{error.message}</p>}

        {!isPending && !error && users?.length === 0 && (
          <p className="text-gray-500">No users found.</p>
        )}

        {users && users.length > 0 && (
          <ul className="space-y-3">
            {users.map((user) => (
              <li key={user.id} className="p-3 bg-gray-100 rounded border border-gray-200">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
