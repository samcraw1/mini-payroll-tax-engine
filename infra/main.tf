terraform {
  required_providers {
    aws = {
        source  = "hashicorp/aws"
        version = "~> 5.0"

    }
  }
}

provider "aws" {
    region = "us-east-1"
}

resource "aws_s3_bucket" "my_bucket" {
    bucket = "my-unique-bucket-name-123456"

}

output "random_bucket_name"{
    value = aws_s3_bucket.my_bucket.bucket
}