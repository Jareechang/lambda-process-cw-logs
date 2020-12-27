output "sns_topic_arn" {
    value = aws_sns_topic.log_error_topic.arn
}
