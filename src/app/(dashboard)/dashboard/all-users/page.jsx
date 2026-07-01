"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import EmptyState from "@/app/components/common/EmptyState";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import RoleGuard from "@/app/components/auth/RoleGuard";
import UsersTable from "@/app/components/users/UsersTable";
import { api } from "@/lib/api";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [menuId, setMenuId] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  async function loadUsers(showLoading = true) {
    try {
      if (showLoading) {
        setLoading(true);
      }

      const query = makeQuery(page, limit, status);
      const result = await api.getAllUsers(query);
      setUsers(result.data.items);
      setTotal(result.data.total);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const query = makeQuery(page, limit, status);

    api
      .getAllUsers(query)
      .then((result) => {
        setUsers(result.data.items);
        setTotal(result.data.total);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [page, status]);

  async function handleAction(action, userId) {
    try {
      if (action === "block") await api.blockUser(userId);
      if (action === "unblock") await api.unblockUser(userId);
      if (action === "volunteer") await api.makeVolunteer(userId);
      if (action === "admin") await api.makeAdmin(userId);
      toast.success("User updated");
      setMenuId(null);
      loadUsers(false);
    } catch (error) {
      toast.error(error.message);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalPages = Math.ceil(total / limit);

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
          onChange={(event) => {
            setStatus(event.target.value);
            setPage(1);
          }}
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
          <UsersTable
            users={users}
            menuId={menuId}
            onMenuChange={setMenuId}
            onAction={handleAction}
          />
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded border border-[#b42318] px-3 py-1 text-sm font-semibold text-[#b42318] disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-sm text-[#674842]">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded border border-[#b42318] px-3 py-1 text-sm font-semibold text-[#b42318] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
      </main>
    </RoleGuard>
  );
}

function makeQuery(page, limit, status) {
  let query = `?page=${page}&limit=${limit}`;

  if (status) {
    query += `&status=${status}`;
  }

  return query;
}
