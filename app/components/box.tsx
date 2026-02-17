export default function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 rounded-2xl p-4 shadow-md border border-gray-800">
      {children}
    </div>
  );
}
