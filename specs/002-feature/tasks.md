# Task Breakdown | ฟีเจอร์ยกเลิกการจองบริการ
- Feature: UC-01 การยกเลิกการจองของผู้ใช้บริการ
- Spec ID: specs/002-feature/spec.md
- อ้างอิง plan.md: ./plan.md
- วันที่: 2026-10-04
- สรุป: จะทำ 7 task ในลำดับการพึ่งพา โดยมี 0 task ที่ต้องรอ Open Questions

### T-01 ตั้งโครงโปรเจกต์ frontend/backend/database และ baseline test
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C, REQ-CON-001D, REQ-CON-001E, REQ-CON-001F
- ตรวจด้วย: ไม่มี AC ตรง ๆ เป็นงานพื้นฐานของ T-01
- ไฟล์ที่แตะ: package.json, vite.config.js, tailwind.config.js, postcss.config.js, index.html, src/main.jsx, src/App.jsx, src/index.css, backend/app/main.py, backend/requirements.txt, docker-compose.yml, specs/002-feature/feature.feature, specs/002-feature/models.md
- ต้องทำหลัง: ไม่มี
- เสร็จเมื่อ: Frontend React + Vite + Tailwind, Backend FastAPI, และ PostgreSQL service พร้อมใช้งานแบบ local baseline และรัน smoke test หรือ build อย่างน้อย 1 ตัวผ่าน
- สถานะ: เสร็จ รอทีมตรวจ

### T-02 สร้างโมเดลข้อมูลและสถานะการยกเลิก
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C
- ตรวจด้วย: AC-01-01, AC-01-02, AC-01-03
- ไฟล์ที่แตะ: specs/002-feature/models.md, src/domain/cancellationState.ts, src/domain/booking.ts
- ต้องทำหลัง: T-01
- เสร็จเมื่อ: state machine และ data contract สำหรับค่า bookingId, customerId, driverId, appointment, deposit, reason, status, refundRate, transactionId, referenceNo ถูกกำหนดชัดเจนและ review ได้
- สถานะ: พร้อมทำ

### T-03 สร้าง engine กฎยกเลิกและ validateCancellation
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C
- ตรวจด้วย: AC-01-01, AC-01-02, AC-01-03
- ไฟล์ที่แตะ: src/services/cancellationPolicy.ts, src/services/validateCancellation.ts, specs/002-feature/rules.md
- ต้องทำหลัง: T-02
- เสร็จเมื่อ: ระบบแยกทางเลือกได้ 4 แบบตาม BR-01 ถึง BR-04 คือ full refund, forfeit deposit, admin review, rejection และสามารถคำนวณจากสถานะและเวลาได้ถูกต้อง
- สถานะ: พร้อมทำ

### T-04 สร้างบริการคืน/ริบมัดจำและผสาน Payment Gateway
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C
- ตรวจด้วย: AC-01-01, AC-01-02, AC-01-03
- ไฟล์ที่แตะ: src/services/refundService.ts, src/integrations/paymentGateway.ts, src/services/auditLog.ts
- ต้องทำหลัง: T-03
- เสร็จเมื่อ: การคืนเงินหรือริบมัดจำสามารถสร้าง transactionId/referenceNo ได้และบันทึกผลการพิจารณา/exception ลง audit log ได้
- สถานะ: พร้อมทำ

### T-05 สร้าง API ยกเลิกการจองและแจ้งผลให้คนขับ
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C
- ตรวจด้วย: AC-01-01, AC-01-02, AC-01-03
- ไฟล์ที่แตะ: src/api/cancellationController.ts, src/api/routes/cancelBooking.ts, src/notifications/driverNotification.ts
- ต้องทำหลัง: T-04
- เสร็จเมื่อ: API รับ request ยกเลิก, เรียก engine กฎ, ส่งผลลัพธ์และ notification ให้ลูกค้าและคนขับ พร้อมบันทึกสถานะปัจจุบัน
- สถานะ: พร้อมทำ

### T-06 สร้างหน้าจอยกเลิกการจองและข้อความผลลัพธ์
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C
- ตรวจด้วย: AC-01-01, AC-01-02, AC-01-03
- ไฟล์ที่แตะ: src/ui/CancelBookingDialog.tsx, src/ui/BookingCancellationResult.tsx, src/ui/useCancelBooking.ts
- ต้องทำหลัง: T-05
- เสร็จเมื่อ: ลูกค้าสามารถเห็นเงื่อนไขการยกเลิกก่อนยืนยัน, เห็นผลลัพธ์หลังยกเลิกว่า คืนเงิน/ริบมัดจำ/ส่งแอดมินพิจารณา และเห็นข้อความแจ้งเตือนที่ชัดเจน
- สถานะ: พร้อมทำ

### T-07 ทดสอบเชิงรับรอง AC และ Constraint
- รองรับ: REQ-CMP-001, REQ-CON-001A, REQ-CON-001B, REQ-CON-001C
- ตรวจด้วย: AC-01-01, AC-01-02, AC-01-03
- ไฟล์ที่แตะ: tests/cancelBooking.test.ts, tests/fixtures/cancelCases.ts, specs/002-feature/feature.feature
- ต้องทำหลัง: T-06
- เสร็จเมื่อ: test สำหรับทุกกรณียกเลิกผ่าน รวมถึง failure path, admin review path, rejection path และตรวจความปลอดภัยข้อมูลตาม PDPA
- สถานะ: พร้อมทำ

## ตารางตรวจความครบ

### 1. AC ID | task ที่ตรวจ AC นี้
| AC ID | task ที่ตรวจ AC นี้ |
|---|---|
| AC-01-01 | T-02, T-03, T-04, T-05, T-06, T-07 |
| AC-01-02 | T-02, T-03, T-04, T-05, T-06, T-07 |
| AC-01-03 | T-02, T-03, T-04, T-05, T-06, T-07 |

### 2. Constraint ID | task ที่ทำให้เป็นจริง
| Constraint ID | task ที่ทำให้เป็นจริง |
|---|---|
| REQ-CON-001A | T-02, T-04, T-05, T-07 |
| REQ-CON-001B | T-02, T-04, T-05, T-07 |
| REQ-CON-001C | T-02, T-04, T-05, T-07 |

## สิ่งที่ยังไม่ทำ
- ไม่มี Open Questions ใน spec.md รอบนี้ จึงไม่มี task ที่ต้องรอ Q-xx
- งานทั้งหมดยังอยู่ในสถานะพร้อมทำตามสมมติฐานสเปกชั่วคราวที่ระบุใน ASM-03 ถึง ASM-08
