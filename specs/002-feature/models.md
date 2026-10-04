# โมเดลที่ feature นี้ใช้ (MD-CTX-01, MD-DOM-01, MD-STM-01, MD-SEQ-01)

เวอร์ชัน 1.0 เข้า Baseline B1 | เขียนด้วย Mermaid เปิดดูภาพได้บน GitHub

## MD-CTX-01 Context Diagram (เฉพาะส่วนที่ feature นี้แตะ)

```mermaid
flowchart LR
  U[ลูกค้า] -->|ยกเลิกการจอง| S((ระบบ Khonย้าย))
  D[คนขับ] -->|รับรู้ผลยกเลิก| S
  P[Payment Gateway] -->|คืนเงิน / อ้างอิง| S
  A[แอดมิน] -->|พิจารณา exception| S
```

## MD-DOM-01 Domain Model

```mermaid
classDiagram
  class Booking {
    bookingId
    customerId
    driverId
    status
    appointment
    deposit
    reason
    refundRate
  }

  class CancellationDecision {
    decisionType
    transactionId
    referenceNo
    reviewedBy
    notes
  }

  Booking "1" --> "0..1" CancellationDecision
```

## MD-STM-01 วงจรชีวิตการยกเลิก

```mermaid
stateDiagram-v2
  [*] --> BOOKED
  BOOKED --> CANCELLATION_REQUESTED : ลูกค้ากดยกเลิก
  CANCELLATION_REQUESTED --> FULL_REFUND : BR-01
  CANCELLATION_REQUESTED --> DEPOSIT_FORFEITED : BR-02
  CANCELLATION_REQUESTED --> ADMIN_REVIEW : BR-03
  CANCELLATION_REQUESTED --> REJECTED : BR-04
  FULL_REFUND --> [*]
  DEPOSIT_FORFEITED --> [*]
  ADMIN_REVIEW --> [*]
  REJECTED --> [*]
```

## MD-SEQ-01 ลำดับการคุยกับระบบภายนอก

```mermaid
sequenceDiagram
  participant U as ลูกค้า
  participant S as ระบบ
  participant P as Payment Gateway
  participant A as แอดมิน

  U->>S: ยกเลิกการจอง
  S->>S: validateCancellation
  alt เป็น BR-01 หรือ BR-02
    S->>P: Request refund / record deposit outcome
    P-->>S: transactionId, referenceNo
  else เป็น BR-03
    S->>A: ส่งเรื่องให้ตรวจสอบ
    A-->>S: ผลการพิจารณา
  else เป็น BR-04
    S-->>U: ปฏิเสธการยกเลิก
  end
  S-->>U: แจ้งผลการยกเลิก
```
