interface Props {
  value: "yes" | "no";
  setValue: (v: "yes" | "no") => void;
}

export default function ToggleButton({ value, setValue }: Props) {
  return (
    <div>
      <label className="text-lg font-medium text-gray-300">
        இந்த மாத தவணை கழிக்கலாமா?
      </label>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => setValue("yes")}
          className={`flex-1 p-3 rounded-xl border text-lg ${
            value === "yes"
              ? "bg-green-500 text-white border-green-500"
              : "bg-gray-800 text-white border-gray-700"
          }`}
        >
          ஆம்
        </button>

        <button
          onClick={() => setValue("no")}
          className={`flex-1 p-3 rounded-xl border text-lg ${
            value === "no"
              ? "bg-red-500 text-white border-red-500"
              : "bg-gray-800 text-white border-gray-700"
          }`}
        >
          இல்லை
        </button>
      </div>
    </div>
  );
}
