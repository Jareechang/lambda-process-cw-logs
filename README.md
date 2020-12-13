# AWS lambda process CloudWatch logs 

Create a function to process Cloudwatch logs streams to detect errors.


🚧 This is a work in progress. More instructions to come.

## Contents 

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [Technologies](#technologies)
- [Notes](#notes)
- [Helpful links](#helpful-links)

## Introduction

**Create two lambda resources:**

1. For regular workloads - logs to a specific cloudwatch log group
2. For supplementary workloads - processing the logs from #1

3. Setup SNS / slack notification for errors [BONUS]

## Quick Start

TODO

**Technologies:**


- AWS Lambda
- Terraform (>= v0.12.24)

1. Add AWS secret and key to your environment (or use template below and fill in envs)

```sh

# setup-env.sh
export AWS_ACCESS_KEY_ID=<xxxx>
export AWS_SECRET_ACCESS_KEY=<xxxx>
export AWS_DEFAULT_REGION=us-east-1

. ./setup-env.sh

```

2. Export your ip address

```
export TF_VAR_local_ip_address=<your-ip-address>
```

3. Run terraform (VPC, database and lambda)

## Technologies


- Node.js (12.x)
- Terraform (12.x)
- Jest (26.x)
- Typescript (3.9.7)
- rollup (1.3.x)

## Notes


#### Ensure proper Principal when defining `aws_lambda_permission`


When defining the lambda permission for CloudWatch logs to invoke functions.

Ensure the `Principal` field is correct and has the right format:

```tf
resource "aws_lambda_permission" "allow_cloudwatch_logs" {
    ...
    principal     = "logs.<aws-region>.amazonaws.com"
}
```

Otherwise, you may run into an error when running terraform:

![alt lambda tf error](./images/tf-lambda-error-cw-logs.png)


## Helpful Links

This section contains the helpful links for this particular task / project.

#### Links

**Terraform:**
[Terraform, Resource: aws_cloudwatch_log_subscription_filter](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_subscription_filter)
[Terraform, Resource: aws_cloudwatch_log_group](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/cloudwatch_log_group)
[Terraform, Resource: aws_lambda_permission](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_permission)

**AWS:**
[AWS, Subscription filter lambda example](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html#LambdaFunctionExample)

**Stackoverflow:**

[AWS Subscription Filter cloudwatch log, terraform Discussion](https://stackoverflow.com/questions/38407660/terraform-configuring-cloudwatch-log-subscription-delivery-to-lambda/38428834#38428834)
