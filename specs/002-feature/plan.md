# แผนงานสำหรับฟีเจอร์ยกเลิกการจองบริการ (002-feature)

## ปัญหาและแนวทาง
ฟีเจอร์นี้ต้องรองรับการยกเลิกการจองของลูกค้าอย่างชัดเจนตามนโยบายคืน/ริบมัดจำและต้องมีเส้นทางสำหรับกรณีที่ต้องส่งแอดมินตรวจสอบ ภาพรวมมาจาก spec.md และ rules.md ที่ระบุว่า: ก่อนคนขับรับงานคืนเงิน 100%, หลังคนขับรับงานและเหลือเวลาไม่เกิน 120 นาที ริบมัดจำ, กรณีที่เหลือเวลา > 2 ชม. แต่ยังไม่เริ่มงาน ต้องส่งแอดมินพิจารณา, และห้ามยกเลิกเมื่อเริ่มงานแล้วหรือสถานะไม่อนุญาต

แนวทางคือออกแบบ workflow แบบสี่ช่วงตามเอกสาร spec และใช้สถาปัตยกรรมที่กำหนดไว้ในข้อจำกัดของสเปก: Frontend ใช้ React + Vite + Tailwind, Backend ใช้ FastAPI, และฐานข้อมูลใช้ PostgreSQL โดยแยกเป็น 3 ส่วนหลัก: (1) กำหนดกฎและ model ของสถานะ/ข้อมูล, (2) implement กระบวนการยกเลิกและคืน/ริบเงิน, (3) validate ผ่าน AC และเงื่อนไข edge case

## Todo
- Finalize cancellation policy and business rules
- Design cancellation state model and data contract
- Implement backend cancellation workflow and refund logic
- Implement customer-facing cancellation UX and notifications
- Validate acceptance criteria and edge cases

## รายละเอียดงาน

1. Finalize cancellation policy and business rules
- ตรวจสอบและยึดกฎจาก spec.md, rules.md, feature.feature ว่า policy มี 4 ทาง: full refund, forfeit deposit, admin review, rejection
- ระบุค่าข้อมูลที่ต้องใช้: bookingId, customerId, driverId, appointment, deposit, status, reason, refundRate, referenceNo, transactionId
- สรุปบริบท exception และ timeout สำหรับระบบภายนอก Payment Gateway / Admin review

2. Design cancellation state model and data contract
- สร้าง domain/state model สำหรับสถานะการจอง: active -> cancellation requested -> approved/rejected -> cancelled/forfeit/admin review
- กำหนด transition conditions ตาม BR-01 ถึง BR-04 และ AC-01-01 ถึง AC-01-03
- ระบุ API contract และ event/notification payload สำหรับลูกค้าและคนขับ

3. Implement backend cancellation workflow and refund logic
- สร้าง service สำหรับ validateCancellation (สิทธิ์, สถานะ, เวลานัด, driver acceptance)
- เพิ่ม logic สำหรับ refund/full refund/forfeit/admin review/rejected cases
- ผสานกับ Payment Gateway และบันทึก transactionId/referenceNo
- เพิ่ม audit log สำหรับผลการพิจารณาและเหตุผลยกเลิก

4. Implement customer-facing cancellation UX and notifications
- UI สำหรับลูกค้าเห็นรายละเอียดเงื่อนไขยกเลิกก่อนยืนยัน
- แสดงผลลัพธ์หลังยกเลิก: คืนเงิน/ริบมัดจำ/ส่งให้แอดมินพิจารณา
- ส่งแจ้งเตือนให้คนขับและลูกค้า พร้อมแสดงประวัติการยกเลิก

5. Validate acceptance criteria and edge cases
- ทดสอบ AC-01-01 ถึง AC-01-03
- ทดสอบกรณี payment failure, invalid status, driver accepted/not accepted, and cancellation after job start
- ตรวจว่ามี traceability จาก spec -> rules -> implementation -> test

## ข้อพิจารณาและความเสี่ยง
- กฎ “ล่วงเวลา > 2 ชั่วโมง แต่ยังไม่เริ่มงาน” ถูกกำหนดให้ส่งแอดมินตรวจสอบตามสมมติฐานสเปกชั่วคราว ต้องยืนยันกับ product owner ก่อนปล่อย production
- “เริ่มงานแล้ว” ยังต้องกำหนดนิยามที่ชัดเจนอีกครั้งเพื่อให้กฎ BR-04 มีความแม่นยำ
- ต้องกำหนด timeout และ retry policy สำหรับ Payment Gateway เพื่อป้องกันสถานะค้าง
- ต้องจัดการ PII/PDPA อย่างระมัดระวังตาม REQ-CON-001A-C
