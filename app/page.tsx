"use client";

import { useState } from "react";

export default function Page() {
  const [total, setTotal] = useState("");
  const [members, setMembers] = useState("");
  const [auctionNumber, setAuctionNumber] = useState("");
  const [auctionAmount, setAuctionAmount] = useState("");
  const [auctionsPerYear, setAuctionsPerYear] = useState("2");

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const T = Number(total);
    const M = Number(members);
    const N = Number(auctionNumber);
    const A = Number(auctionAmount);
    const APY = Number(auctionsPerYear);
    const commission = T - A;

    if (!T || !M || !N || !A || !APY || N >= M) {
      alert("சரியான விவரங்களை உள்ளிடவும்");
      return;
    }

    // ✅ BASIC VALUES
    const installment = T / M;
    const totalAuctions = M;
    const totalYears = totalAuctions / APY;

    // ✅ DISCOUNT LOGIC
    const discount = T - A;
    const remainingAuctions = M - N;
    const nonPrized = remainingAuctions;

    const dividend = discount / nonPrized;
    const remainingMemberPay = installment - dividend;

    // ✅ WINNER
    const winnerCash = A - installment;
    const winnerFuturePay = remainingAuctions * installment;

    // ✅ REMAINING MEMBERS
    const remainingMemberFuturePay =
      remainingAuctions * remainingMemberPay;

    const explanation = `
சீட்டு மொத்தம் ₹${T.toLocaleString()}.
மொத்த உறுப்பினர்கள் ${M} பேர்.

மொத்த ஏலங்கள் ${totalAuctions}.
மொத்த காலம் ${totalYears.toFixed(1)} வருடம்.

நடப்பு ஏலம் ${N}.
மீதமுள்ள ஏலங்கள் ${remainingAuctions}.

சீட்டு எடுத்தவர்:
👉 கையில் கிடைத்தது ₹${Math.round(winnerCash).toLocaleString()}
👉 இனி கட்ட வேண்டியது ₹${winnerFuturePay.toLocaleString()}

சீட்டு எடுக்காதவர்கள்:
👉 ஒருவருக்கு லாபம் ₹${Math.round(dividend).toLocaleString()}
👉 இனி தவணை ₹${Math.round(remainingMemberPay).toLocaleString()}
👉 மொத்தம் கட்டுவது ₹${Math.round(remainingMemberFuturePay).toLocaleString()}
`;

    setResult({
      installment,
      totalAuctions,
      totalYears,
      remainingAuctions,
      winnerCash,
      winnerFuturePay,
      dividend,
      remainingMemberPay,
      remainingMemberFuturePay,
      commission,
      explanation,
    });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-md mx-auto p-3 space-y-4">

        {/* HEADER */}
        <div>
          <h1 className="text-xl font-bold text-center">
            சீட்டு கணக்குப் பொறி
          </h1>
          <p className="text-center text-gray-500 text-xs">
            கிராம சீட்டு கணக்கு
          </p>
        </div>

        {/* INPUT BOX */}
        <div className="bg-gray-900 rounded-2xl p-3 border border-gray-800 space-y-3">

          <Input label="சீட்டு மொத்தம்" value={total} onChange={setTotal} />
          <Input label="உறுப்பினர்கள்" value={members} onChange={setMembers} />
          <Input label="நடப்பு ஏலம்" value={auctionNumber} onChange={setAuctionNumber} />
          <Input label="ஏலம் தொகை" value={auctionAmount} onChange={setAuctionAmount} />

          <Input
            label="Yearக்கு ஏலம்"
            value={auctionsPerYear}
            onChange={setAuctionsPerYear}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white text-lg p-3 rounded-2xl"
        >
          கணக்குப் பார்
        </button>

        {/* RESULT */}
        {result && (
          <div className="bg-gray-900 rounded-2xl p-3 border border-gray-800 space-y-2">

            <Row label="மொத்த ஏலம் தொகை" value={`₹ ${Number(total).toLocaleString()}`} />
            <Row label="மொத்த ஏலங்கள்" value={result.totalAuctions} />
            <Row label="மொத்த வருடம்" value={result.totalYears.toFixed(1)} />
            <Row label="மீதமுள்ள ஏலங்கள்" value={result.remainingAuctions} />

            <Divider />

            <Row label="சீட்டு எடுத்தவர் கையில்" value={`₹ ${Math.round(result.winnerCash).toLocaleString()}`} />
            <Row
              label="கமிஷன்"
              value={`₹ ${result.commission.toLocaleString()}`}
            />
            <Row label="சீட்டு எடுத்தவர் இனி கட்டுவது" value={`₹ ${result.winnerFuturePay.toLocaleString()}`} />

            <Divider />

            <Row label="ஒருவருக்கு லாபம்" value={`₹ ${Math.round(result.dividend).toLocaleString()}`} />
            <Row label="இனி தவணை" value={`₹ ${Math.round(result.remainingMemberPay).toLocaleString()}`} />
            <Row label="மொத்தம் கட்டுவது" value={`₹ ${Math.round(result.remainingMemberFuturePay).toLocaleString()}`} />
          </div>
        )}

        {/* EXPLANATION */}
        {result && (
          <div className="bg-gray-900 rounded-2xl p-3 border border-gray-800">
            <p className="text-sm whitespace-pre-line text-gray-300">
              {result.explanation}
            </p>
          </div>
        )}

      </div>
    </main>
  );
}

/* INPUT */
function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 text-lg rounded-lg mt-1
                   bg-gray-800 border border-gray-700 text-white"
      />
    </div>
  );
}

/* ROW */
function Row({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

/* DIVIDER */
function Divider() {
  return <div className="border-t border-gray-800 my-2"></div>;
}
