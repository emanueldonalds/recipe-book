# recipes-api

Recipe REST API.

## Local environment
Set active profile to local to use a mock database.

## Access control
All POST, PUT and DELETE requests requires an authenticated user JWT with the 'editor' role.
GET, HEAD and OPTIONS are allowed for anyone.