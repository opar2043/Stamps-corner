import React, { useState } from "react";
import useUser from "../../Hooks/useUser";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const Users = () => {
  const [users = [], refetch, isLoading] = useUser();

  const axiosSecure = useAxios();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-center text-gray-500">
        Loading users...
      </div>
    );
  }

  const filteredUsers = users.filter((user) => {
    const name = user?.name?.toLowerCase() || "";
    const email = user?.email?.toLowerCase() || "";
    const role = user?.role || "";
    const term = searchTerm.toLowerCase();

    const matchesSearch = name.includes(term) || email.includes(term);
    const matchesRole = filterRole === "all" || role === filterRole;

    return matchesSearch && matchesRole;
  });

  const handleRoleUpdate = (id, currentRole) => {
    const newRole = currentRole === "customer" ? "admin" : "customer";

    Swal.fire({
      title: "Are you sure?",
      text: `Change role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                icon: "success",
                title: `User role updated to ${newRole}`,
                showConfirmButton: false,
                timer: 1500,
                background: "#EFF6FF",
                color: "#1E40AF",
              });
              refetch();
            } else {
              Swal.fire({
                icon: "info",
                title: "No changes made",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Something went wrong",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Users</h2>
          <p className="text-sm text-gray-500">Manage user roles and contact details.</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-3 gap-2">
          <div className="text-sm text-gray-600">
            Total users: <span className="font-medium text-gray-900">{users.length}</span>
          </div>

          <input
            type="text"
            placeholder="Search by name or email"
            className="w-full md:w-48 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full md:w-32 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-100 rounded-xl">
          <thead>
            <tr className="bg-white text-gray-700 border-b border-gray-200">
              <th className="px-4 py-2 text-left font-medium">#</th>
              <th className="px-4 py-2 text-left font-medium">Name</th>
              <th className="px-4 py-2 text-left font-medium">Email</th>
              <th className="px-4 py-2 text-left font-medium">Role</th>
              <th className="px-4 py-2 text-center font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => {
                const id = user._id || user.id;
                return (
                  <tr
                    key={id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-2 text-gray-600">{idx + 1}</td>
                    <td className="px-4 py-2 font-medium text-gray-900">{user.name || "-"}</td>
                    <td className="px-4 py-2 text-gray-700">{user.email || "-"}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs rounded-xl font-medium border ${
                          user.role === "admin"
                            ? "bg-gray-100 text-gray-900 border-gray-200"
                            : "bg-gray-50 text-gray-700 border-gray-100"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Customer"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRoleUpdate(id, user.role)}
                        className="px-3 py-1.5 text-xs rounded border border-gray-200 text-gray-700 hover:bg-gray-200  bg-gray-100 transition-colors"
                      >
                        {user.role === "admin" ? "Make Customer" : "Make Admin"}
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-400 italic">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
