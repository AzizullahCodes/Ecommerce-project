import { useSelector } from 'react-redux';
import React, { useState } from "react";
import "./allUsers.css";

const AllUsers = () => {
  const users = useSelector((state) => state.users.items);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => {
    const text = search.trim().toLowerCase();
    if (!text) return true;
    return (
      (user.name || "").toLowerCase().includes(text) ||
      (user.email || "").toLowerCase().includes(text) ||
      (user.role || "").toLowerCase().includes(text)
    );
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  return (
    <div className="admin-users-page">
      <div className="admin-users-header">
        <div>
          <h1>All Users</h1>
          <p>Manage registered accounts</p>
        </div>
      </div>

      <div className="admin-users-stats">
        <div>
          <h3>{users.length}</h3>
          <p>Total Users</p>
        </div>
        <div>
          <h3>{adminCount}</h3>
          <p>Admins</p>
        </div>
        <div>
          <h3>{userCount}</h3>
          <p>Customers</p>
        </div>
      </div>

      <div className="admin-users-search">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <div className="admin-users-empty">No users found.</div>
      ) : (
        <div className="admin-users-table-wrap">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.email || index}>
                  <td>{index + 1}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>
                    <span className={`role-badge role-${user.role || "user"}`}>
                      {user.role || "user"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
