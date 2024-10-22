import React, { useEffect, useState } from "react";

function Dashboard() {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(document.cookie);
    if (user) {
      const parsedUser = JSON.parse(user);
      setAuth(true);
      setUserName(parsedUser.name || "User");
    }
  }, []);

  if (!auth) {
    return <p className="text-center mt-10 text-xl">Not Authenticated</p>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:text-indigo-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-300">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-300">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-300">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Welcome, {userName}</h2>
          <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            Logout
          </button>
        </header>

        {/* Dashboard Content */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Users</h3>
            <p className="text-gray-600">50 Active Users</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Revenue</h3>
            <p className="text-gray-600">$15,000 this month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Tasks Completed</h3>
            <p className="text-gray-600">120 Tasks</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-10">
          <h3 className="text-2xl font-bold mb-4">Recent Activity</h3>
          <ul className="space-y-4">
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p>
                <strong>John Doe</strong> completed a task
              </p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p>
                <strong>Jane Smith</strong> added a new user
              </p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </li>
            <li className="bg-white p-4 rounded-lg shadow-md">
              <p>
                <strong>Admin</strong> updated the settings
              </p>
              <p className="text-sm text-gray-500">1 day ago</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
