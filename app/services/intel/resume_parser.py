from pypdf import PdfReader
import os
import re

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extracts raw text from a PDF file."""
    if not os.path.exists(pdf_path):
        return ""
    
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def parse_resume_intel(text: str) -> dict:
    """
    Phase 2: Resume Extraction
    Analyzes raw resume text to find skills, projects, and experience.
    (Heuristic-based for now, can be enhanced with LLM)
    """
    # Simple keyword-based skill extraction (placeholder for LLM)
    common_skills = [
        "python", "javascript", "react", "next.js", "fastapi", "django", 
        "postgresql", "mysql", "mongodb", "docker", "kubernetes", "aws", 
        "azure", "c++", "java", "go", "rust", "typescript", "tailwind",
        "machine learning", "data science", "pytorch", "tensorflow"
    ]
    
    found_skills = []
    text_lower = text.lower()
    for skill in common_skills:
        if re.search(rf"\b{re.escape(skill)}\b", text_lower):
            found_skills.append(skill)
            
    # Mock structured output for Phase 2-3 integration
    return {
        "skills": list(set(found_skills)),
        "experience": [], # Placeholder
        "projects": []   # Placeholder
    }
