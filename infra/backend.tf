terraform {
  backend "s3" {
    bucket         = "agendaconsultorio"
    key            = "totem_pedidos/terraform.tfstate"
    region         = "us-east-2"
    
  }
}
