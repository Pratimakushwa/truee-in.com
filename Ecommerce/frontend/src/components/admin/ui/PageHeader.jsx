export default function PageHeader({ title, description, breadcrumb, actions, children }) {
  return (
    <div className="mb-6 md:mb-8">
      {breadcrumb && (
        <nav className="text-xs text-gray-400 mb-2 flex items-center gap-1.5" aria-label="Breadcrumb">
          {breadcrumb}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
