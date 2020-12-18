variable "lambda_func_ns" {
    default = "process-cw-logs"
}

variable "s3_bucket_name" {
}

variable "aws_region" {
    default = "us-east-1"
}

variable "slack_webhook_endpoint_url" {}
