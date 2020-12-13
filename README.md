# AWS lambda process CloudWatch logs 

Create a function to process Cloudwatch logs streams to detect errors.

## Contents 

- [Introduction](#introduction)
- [Quick Start](#quick-start)
- [Technologies](#technologies)
- [Notes](#notes)

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


TODO

