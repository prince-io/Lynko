export default function AnalyticsIcon({ w = 24, h = 24, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={w}
      height={h}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M3.5 4v13.5a3 3 0 0 0 3 3H20" />
      <path d="m6.5 15l4.5-4.5l3.5 3.5L20 8.5" />
    </svg>
  );
}
