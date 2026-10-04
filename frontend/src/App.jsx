const policies = [
  { label: 'ก่อนคนขับรับงาน', result: 'คืนเงิน 100%' },
  { label: 'หลังคนขับรับงาน และเหลือเวลา ≤ 120 นาที', result: 'ริบมัดจำ 100%' },
  { label: 'หลังคนขับรับงาน และเหลือเวลา > 120 นาที', result: 'ส่งแอดมินตรวจสอบ' },
  { label: 'เริ่มงานแล้วหรือสถานะไม่อนุญาต', result: 'ปฏิเสธการยกเลิก' }
];

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
          UC-01 / Cancellation
        </p>
        <h1 className="text-3xl font-bold">ยกเลิกการจองบริการ</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Frontend React + Vite + Tailwind ใช้สำหรับแสดงผลนโยบายยกเลิก และผลลัพธ์ของการคืน/ริบมัดจำ
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {policies.map((policy) => (
            <div key={policy.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">เงื่อนไข</p>
              <p className="mt-2 font-semibold">{policy.label}</p>
              <p className="mt-3 inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-medium text-sky-700">
                {policy.result}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
