interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

export default function InputField({ label, value, onChange, placeholder }: Props) {
  return (
    <div>
      <label className="text-lg font-medium text-gray-300">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-4 text-2xl rounded-xl border mt-2 
                   bg-gray-800 border-gray-700 text-white"
      />
    </div>
  );
}
