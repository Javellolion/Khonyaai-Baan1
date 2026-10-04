from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title='Khonyaai Cancellation API')


class CancellationRequest(BaseModel):
    booking_id: str
    customer_id: str
    driver_id: str | None = None
    reason: str | None = None


@app.get('/health')
def health_check() -> dict:
    return {
        'status': 'ok',
        'service': 'khonyaai-cancellation-api',
        'stack': 'FastAPI + PostgreSQL-ready'
    }


@app.post('/bookings/cancel')
def cancel_booking(payload: CancellationRequest) -> dict:
    return {
        'booking_id': payload.booking_id,
        'status': 'cancel_requested',
        'policy': 'pending_validation',
        'message': 'FastAPI backend ready for cancellation workflow.'
    }
