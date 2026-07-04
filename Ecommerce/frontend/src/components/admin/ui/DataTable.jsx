import EmptyState from './EmptyState';
import { SkeletonTable } from '../../ui/Skeleton';

export default function DataTable({
  columns,
  data,
  loading,
  emptyTitle = 'No records found',
  emptyDescription,
  onRowClick,
  stickyHeader = true,
}) {
  if (loading) {
    return (
      <div className="admin-card p-4">
        <SkeletonTable rows={6} />
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="admin-card">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className="admin-card overflow-hidden">
      <div className="overflow-x-auto admin-scrollbar">
        <table className="w-full text-left min-w-[640px]">
          <thead className={stickyHeader ? 'sticky top-0 z-10 bg-gray-50/95 backdrop-blur-sm' : ''}>
            <tr className="border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={row._id || row.id || i}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={`border-b border-gray-100 last:border-0 transition-colors ${
                  onRowClick ? 'cursor-pointer hover:bg-[#FCFAEF]/50' : 'hover:bg-gray-50/80'
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
