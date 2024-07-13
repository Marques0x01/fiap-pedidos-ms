terraform {
  backend "s3" {
    bucket         = "backend-projeto"
    key            = "fiap_pedidos_ms/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
