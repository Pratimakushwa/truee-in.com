export default function SimpleBarChart({ data = [], valueKey = 'revenue', labelKey = '_id', height = 160 }) {
  const max = Math.max(...data.map((d) => d[valueKey] || 0), 1);

  if (!data.length) {
    return (
      <div className="flex items-center justify-center text-xs text-gray-400" style={{ height }}>
        No chart data yet
      </div>
    );
  }

  return (
    <div className="flex items-end justify-between gap-2 px-1" style={{ height }}>
      {data.map((item) => {
        const val = item[valueKey] || 0;
        const pct = (val / max) * 100;
        const label = item[labelKey];
        const shortLabel = label?.slice(5) || label;

        return (
          <div key={label} className="flex-1 flex flex-col items-center gap-2 min-w-0">
            <span className="text-[10px] font-medium text-gray-500">
              {val >= 1000 ? `₹${(val / 1000).toFixed(1)}k` : `₹${val}`}
            </span>
            <div className="w-full flex justify-center" style={{ height: height - 48 }}>
              <div
                className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-[#C8A253] to-[#E8D5A3] transition-all duration-500 hover:opacity-90"
                style={{ height: `${Math.max(pct, 4)}%`, alignSelf: 'flex-end' }}
                title={`${label}: ₹${val.toLocaleString('en-IN')}`}
              />
            </div>
            <span className="text-[9px] text-gray-400 truncate w-full text-center">{shortLabel}</span>
          </div>
        );
      })}
    </div>
  );
}
