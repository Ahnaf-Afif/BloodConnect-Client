import StatusBadge from "@/app/components/common/StatusBadge";
import UserActionMenu from "./UserActionMenu";

export default function UsersTable({
  users,
  menuId,
  onMenuChange,
  onAction,
}) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-[#f0d3cf]">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#f0d3cf] bg-[#fff3f0]">
          <tr>
            <th className="px-4 py-3">User</th>
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
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block size-10 shrink-0 rounded-full bg-[#fff3f0] bg-cover bg-center"
                    style={
                      user.avatar
                        ? { backgroundImage: `url(${user.avatar})` }
                        : {}
                    }
                  />
                  <span className="font-semibold text-[#241816]">
                    {user.name}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">{user.email}</td>
              <td className="px-4 py-3 capitalize">{user.role}</td>
              <td className="px-4 py-3">
                <StatusBadge status={user.status} />
              </td>
              <td className="px-4 py-3">
                <UserActionMenu
                  user={user}
                  open={menuId === String(user._id)}
                  onToggle={() =>
                    onMenuChange(
                      menuId === String(user._id) ? null : String(user._id)
                    )
                  }
                  onAction={onAction}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
