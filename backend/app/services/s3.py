import boto3
from config import config

# Configure AWS credentials
aws_access_key_id = config.aws_access_key_id
aws_secret_access_key = config.aws_secret_access_key
aws_region = config.aws_region
aws_bucket = config.aws_bucket

# Create an S3 client
s3 = boto3.client(
    "s3",
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=aws_region,
)


def upload_file(file, filename, original_filename: str):
    name = original_filename.split(".")[0]
    object_name = original_filename.replace(name, filename)

    s3.upload_fileobj(file, aws_bucket, f"audio/{object_name}")

    # Generate a presigned URL for the uploaded object
    presigned_url = s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": aws_bucket, "Key": f"audio/{object_name}"},
        ExpiresIn=3600,
    )

    return presigned_url


def delete_file(filename):
    s3.delete_object(Bucket=aws_bucket, Key=filename)
    return f"{filename} deleted successfully"
