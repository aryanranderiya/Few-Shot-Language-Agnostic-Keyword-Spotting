import os

# Load environment variables from file
env_file = os.path.join(os.path.dirname(__file__), "../../.env")
if os.path.exists(env_file):
    with open(env_file, "r") as f:
        for line in f:
            key, value = line.strip().split("=")
            os.environ[key] = value

aws_access_key_id = os.environ.get("AWS_ACCESS_KEY_ID")
aws_secret_access_key = os.environ.get("AWS_SECRET_ACCESS_KEY")
aws_region = os.environ.get("AWS_REGION")
aws_bucket = os.environ.get("AWS_BUCKET")
port = os.environ.get("PORT", 8000)
mongodb_url = os.environ.get("MONGO_URI")
