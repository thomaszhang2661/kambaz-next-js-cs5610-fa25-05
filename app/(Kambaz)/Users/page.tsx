"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { BsPersonFill, BsTrash, BsPencil } from "react-icons/bs";
import * as client from "./client";

type User = {
  _id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role: "STUDENT" | "FACULTY" | "TA" | "ADMIN";
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, roleFilter, searchTerm]);

  const fetchUsers = async () => {
    try {
      const data = await client.findAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Filter by role
    if (roleFilter !== "ALL") {
      filtered = filtered.filter((u) => u.role === roleFilter);
    }

    // Filter by name
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.username?.toLowerCase().includes(search) ||
          u.firstName?.toLowerCase().includes(search) ||
          u.lastName?.toLowerCase().includes(search) ||
          u.email?.toLowerCase().includes(search)
      );
    }

    setFilteredUsers(filtered);
  };

  const handleCreateUser = async () => {
    const newUser = {
      username: "newuser",
      password: "password123",
      firstName: "New",
      lastName: "User",
      email: "newuser@example.com",
      role: "STUDENT" as const,
    };

    try {
      const created = await client.createUser(newUser);
      setUsers([...users, created]);
      setSelectedUser(created);
      setIsEditing(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      const updated = await client.updateUser(selectedUser._id, selectedUser);
      setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
      setSelectedUser(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await client.deleteUser(userId);
      setUsers(users.filter((u) => u._id !== userId));
      if (selectedUser?._id === userId) {
        setSelectedUser(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="row">
        {/* Left: User List */}
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>Users</h2>
            <button className="btn btn-danger" onClick={handleCreateUser}>
              <FaPlus className="me-2" />
              Add User
            </button>
          </div>

          {/* Filters */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Filter by Role</label>
                  <select
                    className="form-select"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <option value="ALL">All Roles</option>
                    <option value="STUDENT">Students</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="TA">Teaching Assistants</option>
                    <option value="ADMIN">Administrators</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Search by Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditing(false);
                        }}
                      >
                        <BsPersonFill className="me-2 text-primary" />
                        {user.firstName} {user.lastName}
                      </button>
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <span
                        className={`badge ${
                          user.role === "FACULTY"
                            ? "bg-primary"
                            : user.role === "TA"
                            ? "bg-success"
                            : user.role === "ADMIN"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditing(true);
                        }}
                      >
                        <BsPencil />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center text-muted py-4">No users found</div>
            )}
          </div>
        </div>

        {/* Right: User Details */}
        <div className="col-md-4">
          {selectedUser && (
            <div className="card sticky-top" style={{ top: "20px" }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  {isEditing ? "Edit User" : "User Details"}
                </h5>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdateUser();
                    }}
                  >
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedUser.username || ""}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedUser.firstName || ""}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedUser.lastName || ""}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={selectedUser.email || ""}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        className="form-select"
                        value={selectedUser.role}
                        onChange={(e) =>
                          setSelectedUser({
                            ...selectedUser,
                            role: e.target.value as any,
                          })
                        }
                      >
                        <option value="STUDENT">Student</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="TA">Teaching Assistant</option>
                        <option value="ADMIN">Administrator</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        type="submit"
                        className="btn btn-primary flex-fill"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary flex-fill"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="mb-3">
                      <label className="text-muted small">Username</label>
                      <div className="fw-bold">{selectedUser.username}</div>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted small">Name</label>
                      <div className="fw-bold">
                        {selectedUser.firstName} {selectedUser.lastName}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted small">Email</label>
                      <div className="fw-bold">{selectedUser.email}</div>
                    </div>
                    <div className="mb-3">
                      <label className="text-muted small">Role</label>
                      <div>
                        <span
                          className={`badge ${
                            selectedUser.role === "FACULTY"
                              ? "bg-primary"
                              : selectedUser.role === "TA"
                              ? "bg-success"
                              : selectedUser.role === "ADMIN"
                              ? "bg-danger"
                              : "bg-secondary"
                          }`}
                        >
                          {selectedUser.role}
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit User
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
