import os

# Load environment variables
import dotenv

dotenv.load_dotenv()

aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION")
aws_bucket = os.environ.get("AWS_BUCKET")
port = os.environ.get("PORT", 8000)
mongodb_url = os.environ.get("MONGO_URI")
