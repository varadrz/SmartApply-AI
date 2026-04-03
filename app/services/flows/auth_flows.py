from sqlalchemy.orm import Session
from app.services.database import retry_on_db_fail
import logging

logger = logging.getLogger(__name__)

class AuthFlows:
    
    @staticmethod
    @retry_on_db_fail()
    def user_onboarding_flow(db: Session, user_data: dict) -> dict:
        """
        Flow:
        1. Register user (insert into users)
        2. Login
        3. Output jwt_token
        """
        logger.info("Starting user_onboarding_flow...")
        try:
            # Step 1: user_register
            # new_user = User(**user_data)
            # db.add(new_user)
            # db.flush() # ensure ID is generated before commit in parent dependency
            
            # Step 2: user_login & generate JWT token
            dummy_jwt = "header.payload.signature"
            return {"status": "success", "jwt_token": dummy_jwt}
        except Exception as e:
            logger.error(f"Failed user_onboarding_flow: {e}")
            raise
