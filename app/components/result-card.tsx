export default function ResultCard({ label, value }: any) {
  return (
    <div>
      <p className="text-lg text-gray-400">
        {label}
      </p>

      <p className="text-3xl font-bold text-white">
        {value}
      </p>
    </div>
  );
}
