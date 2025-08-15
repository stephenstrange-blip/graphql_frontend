#!/bin/bash
graphql-codegen

# DECLARE VARIABLES
GENERATED_DIR="src/graphql"
GENERATED_FILE=$(find "$GENERATED_DIR" -type f -name generated.ts)

MATCH="import"
REPLACE="import type"

read -r -d '' COMMENT <<'EOF'
// Make sure to use import type { xxx } from '...' instead of import { type xxx } from '...', 
// because only the former will be dropped completely and thereby not incur any issues.
EOF


if [ -z "$GENERATED_FILE" ]; then
  echo "NO GENERATED FILE FOUND!!!"
  exit 1
fi

echo "GENERATED FILE FOUND. EDITING THE FILE..."

# Fix import issue
sed -i "1 s/$MATCH/$REPLACE/" src/graphql/generated.ts

# Add necessary comment
echo "$COMMENT" | cat - src/graphql/generated.ts > generated.ts && mv generated.ts src/graphql/generated.ts
set -ex


