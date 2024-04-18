terraform {
  backend "s3" {
    bucket         = var.bucket_backend_name
    key            = "fiap_pedidos_ms/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
