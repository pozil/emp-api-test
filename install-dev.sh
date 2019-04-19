#!/bin/bash

ORG_ALIAS="emp"

# Install script for the LWC org
echo ""
echo "Installing org with alias: $ORG_ALIAS"
echo ""

echo "Cleaning previous scratch org..."
sfdx force:org:delete -p -u $ORG_ALIAS &> /dev/null
echo ""

echo "Creating scratch org..." && \
sfdx force:org:create -s -f config/project-scratch-def.json -d 30 -a $ORG_ALIAS && \
echo "" && \

echo "Pushing source..." && \
sfdx force:source:push -u $ORG_ALIAS && \
echo "" && \

echo "Assigning permissions..." && \
sfdx force:user:permset:assign -n EMP_API_Tests -u $ORG_ALIAS && \
echo "" && \

echo "Opening org..." && \
sfdx force:org:open -u $ORG_ALIAS

EXIT_CODE="$?"

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
    echo "Installation completed."
else
    echo "Installation failed."
fi
exit $EXIT_CODE
