const tiers = [
  { cash: 5000, gift: 2200 },
  { cash: 30000, gift: 13200 },
  { cash: 50000, gift: 22000 },
  { cash: 100000, gift: 44000 }
];

function calculate() {
  const total = Number(document.getElementById('totalAmount').value);
  const mode = document.querySelector('input[name="mode"]:checked').value;
  if (!total || total <= 0) {
    alert('กรุณากรอกยอดรวมให้ถูกต้อง');
    return;
  }

  let best = null;
  tiers.forEach(t => {
    const count = Math.ceil(total / (mode === 'both' ? (t.gift + 0 + t.cash) : t.cash));
    const usedCash = count * t.cash;
    const cover = mode === 'both' ? usedCash + count * t.gift : usedCash;
    const pay = usedCash;
    const saved = mode === 'both' ? count * t.gift : 0;
    const pct = total > 0 ? ((saved / total) * 100).toFixed(2) : '0';

    if (!best || pay < best.pay) {
      best = { tier: t, count, cover, pay, saved, pct };
    }
  });

  document.getElementById('result').innerHTML = `
    <p>✅ ใช้บัตรมูลค่า ${best.tier.cash.toLocaleString()} บาท จำนวน <strong>${best.count}</strong> ใบ</p>
    <p>💵 มูลค่าครอบคลุมโดยรวม: ${best.cover.toLocaleString()} บาท</p>
    <p>💸 จำนวนเงินจริงที่ต้องจ่าย: <strong>${best.pay.toLocaleString()}</strong> บาท</p>
    <p>🎯 ส่วนลด/กำไรที่ได้รับ: ${best.saved.toLocaleString()} บาท (~${best.pct}%)</p>
  `;
}