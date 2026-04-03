from app.models.outreach import PipelineRequest, PipelineResult
from app.services.outreach_pipeline import run_pipeline
from app.services.database import list_outreach, get_outreach, update_outreach
from typing import List
from fastapi import Query

router = APIRouter(prefix="/outreach", tags=["outreach"])

@router.post("/run", response_model=PipelineResult)
async def run(request: PipelineRequest):
    """
    Run the full outreach pipeline:
    Scrape -> Extract -> Match -> Generate Email -> Store
    """
    try:
        return await run_pipeline(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("", response_model=List[dict])
async def get_outreach_list(limit: int = Query(50, ge=1)):
    """List all previously analyzed companies."""
    return await list_outreach(limit)

@router.get("/{id}", response_model=dict)
async def get_outreach_detail(id: int):
    """Get full details of a specific analysis."""
    result = await get_outreach(id)
    if not result:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return result

@router.patch("/{id}")
async def patch_outreach(id: int, updates: dict):
    """Update status or email content for an analysis."""
    success = await update_outreach(id, updates)
    if not success:
        raise HTTPException(status_code=404, detail="Analysis not found or no updates provided")
    return {"status": "updated"}

@router.get("/health")
async def health():
    return {"status": "ok", "service": "outreach"}
