export default function FundingTable({ funds }) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white ring-1 ring-[#f0d3cf]">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-[#f0d3cf] bg-[#fff3f0]">
          <tr>
            <th className="px-4 py-3">Donor Name</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {funds.map((fund) => (
            <tr key={fund._id} className="border-b border-[#f0d3cf]">
              <td className="px-4 py-3">{fund.userName}</td>
              <td className="px-4 py-3">${fund.amount.toFixed(2)}</td>
              <td className="px-4 py-3">
                {new Date(fund.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
