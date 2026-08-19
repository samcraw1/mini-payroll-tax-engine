terraform {
  required_providers {
    aws = {
        source  = "hashicorp/aws"
        version = "~> 5.0"

    }
  }
}

provider "aws" {
    region = "us-east-2"

}

resource "aws_s3_bucket" "my_bucket" {
    bucket = "my-unique-bucket-name-123456"

}

output "random_bucket_name"{
    value = aws_s3_bucket.my_bucket.bucket
}

resource "aws_db_instance" "payroll_db" {
    allocated_storage = 20
    engine = "mysql"
    engine_version = "8.0"
    instance_class = "db.t3.micro"
    username = "root"
    password = "yourpassword"
    skip_final_snapshot = true
}

output "database_endpoint" {
    value = aws_db_instance.payroll_db.endpoint
}


