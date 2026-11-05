#!/bin/sh
# Creates the IAM role the deploy workflows use (see README.md, Deploying). Safe to re-run: the
# provider's audience and the role are added only if missing, and the policies are rewritten.
set -e
dir=$(dirname "$0")
provider=arn:aws:iam::814787355274:oidc-provider/token.actions.githubusercontent.com
role=acombs-dev-github-deploy

if ! aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$provider" >/dev/null 2>&1; then
  aws iam create-open-id-connect-provider --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com >/dev/null
  echo "OIDC provider created"
elif ! aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$provider" \
    --query ClientIDList --output text | grep -q sts.amazonaws.com; then
  aws iam add-client-id-to-open-id-connect-provider --open-id-connect-provider-arn "$provider" \
    --client-id sts.amazonaws.com
  echo "OIDC provider audience added"
else
  echo "OIDC provider ready"
fi

if aws iam get-role --role-name "$role" >/dev/null 2>&1; then
  aws iam update-assume-role-policy --role-name "$role" --policy-document "file://$dir/trust-policy.json"
  echo "role trust policy updated"
else
  aws iam create-role --role-name "$role" --assume-role-policy-document "file://$dir/trust-policy.json" >/dev/null
  echo "role created"
fi
aws iam put-role-policy --role-name "$role" --policy-name deploy --policy-document "file://$dir/deploy-policy.json"
echo "deploy policy set. Role: arn:aws:iam::814787355274:role/$role"
