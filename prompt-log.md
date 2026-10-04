# prompt-log.md บันทึกการใช้ AI ของกลุ่ม <ชื่อกลุ่ม>

กติกา: เพิ่มต่อท้ายเท่านั้น ห้ามแก้หรือลบบันทึกเดิม
ทุกบันทึกมี: เลขที่ | วันที่ | เครื่องมือ | คำสั่ง | สิ่งที่ AI ถามหรือรายงาน | คำตอบหรือการตัดสินใจของทีม | สิ่งที่ AI เดา (ถ้ามี)
AI จะเพิ่มบันทึกให้เองเมื่อใช้คำสั่ง /clarify /plan /tasks /implement ทีมเพิ่มเองได้เมื่อสั่งแก้นอกคำสั่ง

## #1 | 2026-10-04 | AI clarifier | /clarify specs/002-feature/spec.md

- AI ถาม/รายงาน: พบความกำกวมในหัวข้อกฎยกเลิก/ค่าปรับและ AC ที่ไม่มีรหัส/เงื่อนไขชัดเจน จึงถามให้ทีมยืนยันหรือเลือกทางเลือกที่เดา
- คำตอบหรือการตัดสินใจของทีม: เอาตามที่เดาได้
- สิ่งที่ AI เดา: กำหนดนโยบายยกเลิกเป็น 100% คืนเงินก่อนคนขับรับงาน, 100% ริบมัดจำหลังคนขับรับงานและก่อน 120 นาที, ส่งแอดมินพิจารณาในช่วง >2 ชม. แต่ยังไม่เริ่มงาน, ปฏิเสธทันทีเมื่อเริ่มงานแล้ว หรือสถานะไม่อนุญาต, และบันทึก transactionId/referenceNo พร้อมส่งแจ้งผลผ่าน SMS/notification

## #2 | 2026-10-04 | AI applies spec fix | /clarify specs/002-feature/spec.md

- AI ถาม/รายงาน: ปรับ spec.md ให้เป็น Draft v2 ตามสมมติฐานที่ทีมเลือก
- คำตอบหรือการตัดสินใจของทีม: ใช้สมมติฐานที่เดาไว้เป็นพรมแดนสเปกชั่วคราวเพื่อให้สามารถเริ่มออกแบบต่อได้
- สิ่งที่ AI เดา: เพิ่มค่า AC-01-01 ถึง AC-01-03, BR-01 ถึง BR-04, ASM-03 ถึง ASM-08 และปรับ header/status/date สำหรับสเปกนี้

## #3 | 2026-10-04 | AI task planner | /tasks specs/002-feature/spec.md

- AI ถาม/รายงาน: แตก task จาก spec.md และ plan.md เป็นลำดับงานย่อยพร้อม traceability กับ AC และ constraint
- คำตอบหรือการตัดสินใจของทีม: ใช้ spec.md และ plan.md ที่จัดเตรียมไว้แล้วเป็นฐานสำหรับ task breakdown
- สิ่งที่ AI เดา: สร้าง tasks.md ในโฟลเดอร์เดียวกับ spec.md จำนวน 7 task, ทุก AC มีการตรวจสอบชัดเจน, และไม่มี Open Question ทำให้ task ทั้งหมดยังพร้อมทำ

## #4 | 2026-10-04 | AI file organizer | ย้าย plan.md ไปไว้ใน specs/002-feature

- AI ถาม/รายงาน: ย้าย plan.md จาก session-state ไปไว้ในโฟลเดอร์ฟีเจอร์จริงเพื่อให้สอดคล้องกับคำสั่ง /tasks และมาตรฐานของ repo
- คำตอบหรือการตัดสินใจของทีม: ย้าย file มาไว้ที่ /workspaces/Khonyaai-Baan1/specs/002-feature/plan.md โดยปรับ task reference เป็น ./plan.md
- สิ่งที่ AI เดา: เพื่อให้ภายหลังเริ่ม implement ได้อ้างอิง plan.md ในโฟลเดอร์เดียวกับ spec.md และ tasks.md

## #5 | 2026-10-04 | AI implementor | /implement T-01 จาก tasks.md

- AI ถาม/รายงาน: ดำเนิน T-01 โดยตั้งโครงโปรเจกต์และ baseline test อย่างเล็กที่สุดที่ตอบโจทย์ spec และ plan
- คำตอบหรือการตัดสินใจของทีม: ให้ทำเฉพาะ task T-01 ตามเงื่อนไขใน tasks.md โดยไม่แตะ task อื่น
- สิ่งที่ AI เดา: สร้าง package.json, src/index.js, tests/smoke.test.js และปรับ feature.feature + models.md ให้เป็น baseline ที่พร้อมต่อ T-02

## #6 | 2026-10-04 | AI stack alignment | ปรับสถาปัตยกรรมให้ใช้ React + Vite + Tailwind, FastAPI, PostgreSQL

- AI ถาม/รายงาน: อัปเดต spec.md, plan.md, tasks.md และไฟล์ที่เกี่ยวข้องให้สอดคล้องกับข้อจำกัดที่กำหนดใหม่: Frontend = React + Vite + Tailwind, Backend = FastAPI, Database = PostgreSQL
- คำตอบหรือการตัดสินใจของทีม: ใช้สถาปัตยกรรมดังกล่าวเป็นความจริงของสเปกในรอบนี้เพื่อให้รูปแบบโครงงานสอดคล้องกันและพร้อมเริ่มพัฒนาต่อ
- สิ่งที่ AI เดา: สร้างโครงสร้าง frontend, backend, และ postgres local service; อัปเดตข้อจำกัดใน spec และ task breakdown เพื่อให้มี traceability ต่อ REQ-CON-001D ถึง REQ-CON-001F

## #7 | 2026-10-04 | AI folder organizer | ย้าย frontend ลงสู่โฟลเดอร์ dedicated frontend

- AI ถาม/รายงาน: จัดโครงสร้างโปรเจกต์ใหม่เป็น frontend + backend ในโฟลเดอร์ที่แยกกัน พร้อมล้าง artifacts ที่ค้างจากการสร้าง scaffold ครั้งแรก
- คำตอบหรือการตัดสินใจของทีม: ย้ายไฟล์ frontend ลง [frontend/](/workspaces/Khonyaai-Baan1/frontend) และเก็บ backend ไว้ที่ [backend/](/workspaces/Khonyaai-Baan1/backend)
- สิ่งที่ AI เดา: ยกระดับโครงสร้างให้พร้อมสำหรับ development จริง และตรวจว่า build ใน frontend ผ่านหลังการจัดโครงสร้างใหม่

