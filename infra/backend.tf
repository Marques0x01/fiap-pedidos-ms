terraform {
  backend "s3" {
    bucket         = "backend-fiap"
    key            = "fiap_pedidos_ms/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
