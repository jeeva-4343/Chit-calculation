import Box from "./box";

export default function ExplanationBox({ text }: { text: string }) {
  return (
    <Box>
      <p className="text-lg leading-relaxed whitespace-pre-line text-gray-200">
        {text}
      </p>
    </Box>
  );
}
