terraform {
  backend "s3" {
    bucket         = var.bucket_backend_name
    key            = var.lambda_name + "/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
