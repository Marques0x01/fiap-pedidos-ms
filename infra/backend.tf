terraform {
  backend "s3" {
    bucket         = "tfstates-fiap"
    key            = "fiap_pedidos_ms/terraform.tfstate"
    region         = "us-east-1"
    
  }
}
