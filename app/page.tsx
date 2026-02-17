"use client";

import { useState } from "react";

export default function Page() {
  const [total, setTotal] = useState("");
  const [members, setMembers] = useState("");
  const [auctionNumber, setAuctionNumber] = useState("");
  const [auctionAmount, setAuctionAmount] = useState("");
  const [auctionsPerYear, setAuctionsPerYear] = useState("2");

  const [result, setResult] = useState<any>(null);

  // ✅ Professional Money Formatter
  const formatMoney = (num: number) =>
    num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

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

    const installment = T / M;
    const totalAuctions = M;
    const totalYears = totalAuctions / APY;

    const discount = T - A;
    const remainingAuctions = M - N;
    const dividend = discount / remainingAuctions;
    const remainingMemberPay = installment - dividend;

    const winnerCash = A - installment;
    const winnerFuturePay = remainingAuctions * installment;

    setResult({
      installment, // ✅ IMPORTANT
      totalAuctions,
      totalYears,
      remainingAuctions,
      winnerCash,
      winnerFuturePay,
      dividend,
      remainingMemberPay,
      commission,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-950 to-black text-white">
      <div className="max-w-md mx-auto p-3 space-y-4">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            சீட்டு கணக்குப் பொறி
          </h1>
          <p className="text-gray-500 text-xs">
            கிராம சீட்டு கணக்கு
          </p>
           <p className="text-yellow-400 text-[10px] mt-1">
            உதவிக்காக மட்டும்
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4
                        border border-white/10 space-y-3 shadow-xl">

          <Input label="சீட்டு மொத்தம்" value={total} onChange={setTotal} pattern="[0-9]*"/>
          <Input label="உறுப்பினர்கள்" value={members} onChange={setMembers} pattern="[0-9]*"/>
          <Input label="நடப்பு ஏலம்" value={auctionNumber} onChange={setAuctionNumber} pattern="[0-9]*"/>
          <Input label="ஏலம் தொகை" value={auctionAmount} onChange={setAuctionAmount} pattern="[0-9]*"/>
          <Input label="Yearக்கு ஏலம்" value={auctionsPerYear} onChange={setAuctionsPerYear} pattern="[0-9]*"/>
        </div>

        {/* BUTTON */}
        <button
          onClick={calculate}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500
                     text-white text-lg p-3 rounded-2xl font-semibold
                     transition-all hover:scale-[1.03] active:scale-95"
        >
          கணக்குப் பார்
        </button>

        {/* RESULT */}
        <div
          className={`transition-all duration-500 overflow-hidden
                     ${result ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0"}`}
        >
          {result && (
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4
                            border border-white/10 space-y-2 shadow-xl mt-2">

              <Row label="மொத்த ஏலம் தொகை" value={`₹ ${formatMoney(Number(total))}`} />
              <Row label="மொத்த ஏலங்கள்" value={result.totalAuctions} />
              <Row label="மொத்த வருடம்" value={result.totalYears.toFixed(1)} />
              <Row label="மீதமுள்ள ஏலங்கள்" value={result.remainingAuctions} />

              <Divider />

              <p className="text-sm text-blue-400">👉 சீட்டு எடுத்தவர்</p>

              <Row
                label="ஏலம் போனது"
                value={`₹ ${formatMoney(Number(auctionAmount))}`}
              />

              <Row
                label="போட வேண்டியது"
                value={`₹ ${formatMoney(result.installment)}`}
              />

              <Row
                label="கையில் கிடைத்தது"
                value={`₹ ${formatMoney(result.winnerCash)}`}
              />

              <Divider />

              <Row
                label="இனி கட்டவேண்டியது (மோத்தம்)"
                value={`₹ ${formatMoney(result.winnerFuturePay)}`}
              />

              <Divider />

              <p className="text-sm text-cyan-400">👉 சீட்டு எடுக்காதவர்கள்</p>

              <Row
                label="கமிஷன்"
                value={`₹ ${formatMoney(result.commission)}`}
              />

              <Row
                label="ஒருவருக்கு லாபம்"
                value={`₹ ${formatMoney(result.dividend)}`}
              />

              <Row
                label="போட வேண்டியது"
                value={`₹ ${formatMoney(result.remainingMemberPay)}`}
              />
            </div>
          )}
        </div>

      </div>
    </main>
  );
}

/* ✅ INPUT WITH COMMA */
function Input({ label, value, onChange }: any) {

  const formatNumber = (val: string) => {
    if (!val) return "";
    return Number(val).toLocaleString("en-IN");
  };

  const handleChange = (e: any) => {
    const raw = e.target.value.replace(/,/g, "");

    if (!raw || /^[0-9]*$/.test(raw)) {
      onChange(raw);
    }
  };

  return (
    <div>
      <label className="text-xs text-gray-400">{label}</label>
      <input
        type="text"
        inputMode="numeric"
        value={formatNumber(value)}
        onChange={handleChange}
        className="w-full p-2 text-lg rounded-xl mt-1
                   bg-black/40 border border-white/10
                   focus:border-blue-500
                   outline-none"
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
  return <div className="border-t border-white/10 my-2"></div>;
}
