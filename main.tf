resource "aws_s3_bucket" "lambda_bucket" {
    bucket  = var.s3_bucket_name
    acl     = "private"

    tags = {
        Name        = "Dev Bucket"
        Environment = "Dev"
    }
}

locals {
    package_json    = jsondecode(file("../../package.json"))
    build_folder    = "./deploy"
    target_pkg_name = "${local.package_json.name}-${local.package_json.version}"
}

resource "aws_s3_bucket_object" "default" {
    bucket = "${aws_s3_bucket.lambda_bucket.id}"
    key = local.target_pkg_name 
    source = "${local.target_pkg_name}.zip"
    etag = "${filemd5("./${local.build_folder}/${target_pkg_name}.zip")}"
}

resource "aws_iam_role" "iam_for_lambda" {
    name = "iam_for_lambda"
    assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
                "Service": "lambda.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF
}

resource "aws_lambda_function" "log_lambda" {
    function_name = "${var.lambda_func_ns}-print-log-lambda"
    s3_bucket = "${aws_s3_bucket.lambda_bucket.id}"
    s3_key = "${aws_s3_bucket_object.default.id}"
    handler = "dist/index.logLambda"
    role = "${aws_iam_role.iam_for_lambda.arn}"
    timeout = 300
    source_code_hash = "${filebase64sha256("${local.build_folder}/${local.target_pkg_name}.zip")}"
    runtime = "nodejs12.x"
    depends_on = [
        "aws_iam_role_policy_attachment.attach_lambda_role_logs",
        "aws_cloudwatch_log_group.sample_log_group_read"
    ]

    environment {
        variables = {}
    }
}

resource "aws_lambda_function" "error_processing_lambda" {
    function_name = "${var.lambda_func_ns}-error-processing-lambda"
    s3_bucket = "${aws_s3_bucket.lambda_bucket.id}"
    s3_key = "${aws_s3_bucket_object.default.id}"
    handler = "dist/index.processLambdaErrorLog"
    role = "${aws_iam_role.iam_for_lambda.arn}"
    timeout = 300
    source_code_hash = "${filebase64sha256("${local.build_folder}/${local.target_pkg_name}.zip")}"
    runtime = "nodejs12.x"
    depends_on = [
        "aws_iam_role_policy_attachment.attach_lambda_role_logs",
        "aws_cloudwatch_log_group.sample_log_group_read"
    ]

    environment {
        variables = {}
    }
}

resource "aws_cloudwatch_log_group" "log_lambda" {
    name = "/aws/lambda/${var.lambda_func_name}-print-log-lambda"
    retention_in_days = 1
}

resource "aws_cloudwatch_log_group" "error_processing_lambda" {
    name = "/aws/lambda/${var.lambda_func_name}-error-processing-lambda"
    retention_in_days = 1
}

data "aws_iam_policy_document" "lambda_cw_log_policy" {
    version = "2012-10-17"
    statement {
        actions = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ]
        effect = "Allow"
        resources = ["arn:aws:logs:*:*:*"]
    }
}

resource "aws_lambda_permission" "allow_cloudwatch_logs" {
    statement_id  = "AllowExecutionFromCloudWatchLogs"
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.error_processing_lambda.arn
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_log_group.log_lambda.arn
}


resource "aws_iam_policy" "lambda_logging" {
    name = "lambda_logging"
    path = "/"
    description = "IAM Policy for logging from a lambda"
    policy = data.aws_iam_policy_document.lambda_cw_log_policy.json
}

resource "aws_iam_role_policy_attachment" "attach_lambda_role_logs" {
    role = "${aws_iam_role.iam_for_lambda.name}"
    policy_arn = "${aws_iam_policy.lambda_logging.arn}"
}

resource "aws_cloudwatch_log_subscription_filter" "error_lambda_logfilter" {
    name            = "lambda_error_log_filter"
    log_group_name  = "/aws/lambda/${var.lambda_func_name}-print-log-lambda"
    filter_pattern  = "ERROR"
    destination_arn = aws_lambda_function.error_processing_lambda.arn
    distribution    = "Random"
}