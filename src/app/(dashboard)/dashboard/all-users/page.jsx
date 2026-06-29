"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import RoleGuard from "@/app/components/auth/RoleGuard";
import { api } from "@/lib/api";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [menuId, setMenuId] = useState(null);

  async function loadUsers() {
    try {
      setLoading(true);
      const query = status ? `?status=${status}` : "";
      const result = await api.getAllUsers(query);
      setUsers(result.data.items);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, [status]);

  async function handleAction(action, userId) {
    try {
      if (action === "block") await api.blockUser(userId);
      if (action === "unblock") await api.unblockUser(userId);
      if (action === "volunteer") await api.makeVolunteer(userId);
      if (action === "admin") await api.makeAdmin(userId);
      toast.success("User updated");
      setMenuId(null);
      loadUsers();
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <RoleGuard roles={["admin"]}>
      <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-3xl font-bold text-[#241816]">All Users</h1>
      <p className="mt-2 text-[#674842]">Manage donors, volunteers and admins.</p>

      <div className="mt-6 flex items-center gap-3">
        <label className="text-sm font-semibold text-[#49312d]" htmlFor="status">
          Filter by status
        </label>
        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-md border border-[#e8c5bf] px-3 py-2"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="mt-6">
        {users.length === 0 ? (
          <EmptyState title="No users found" text="Try another filter." />
        ) : (
          <div className="overflow-x-auto rounded-lg bg-white shadow-sm ring-1 ring-[#f0d3cf]">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[#f0d3cf] bg-[#fff3f0]">
                <tr>
                  <th className="px-4 py-3">Avatar</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-[#f0d3cf]">
                    <td className="px-4 py-3">
                      <span
                        className="inline-block size-10 rounded-full bg-[#fff3f0] bg-cover bg-center"
                        style={
                          user.avatar
                            ? { backgroundImage: `url(${user.avatar})` }
                            : {}
                        }
                      />
                    </td>
                    <td className="px-4 py-3">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3 capitalize">{user.role}</td>
                    <td className="px-4 py-3 capitalize">{user.status}</td>
                    <td className="relative px-4 py-3">
                      <button
                        type="button"
                        onClick={() =>
                          setMenuId(
                            menuId === String(user._id) ? null : String(user._id)
                          )
                        }
                        className="rounded border border-[#49312d] px-3 py-1 text-xs font-semibold"
                      >
                        ...
                      </button>

                      {menuId === String(user._id) && (
                        <div className="absolute right-4 z-10 mt-1 w-40 rounded-md bg-white py-2 shadow-lg ring-1 ring-[#f0d3cf]">
                          {user.status === "active" && (
                            <button
                              type="button"
                              onClick={() => handleAction("block", user._id)}
                              className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
                            >
                              Block
                            </button>
                          )}
                          {user.status === "blocked" && (
                            <button
                              type="button"
                              onClick={() => handleAction("unblock", user._id)}
                              className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
                            >
                              Unblock
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleAction("volunteer", user._id)}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
                          >
                            Make Volunteer
                          </button>
                          <button
                            type="button"
                            onClick={() => handleAction("admin", user._id)}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-[#fff3f0]"
                          >
                            Make Admin
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </main>
    </RoleGuard>
  );
}
