# BACKEND API
## Installation 
```
npm install
```
## Start 
```
npm run dev
```

## Endpoints
## User
```
/api/users
```
#### Post
`/api/users/` - Create new user
#### Get
`/api/users/` - Get ALL users<br>
`/api/users/:user` - Get a single user
#### Delete
`/api/users/:user` - Delete a single user, token needed

#### Update
`/api/users/:user` - Update a single user, token needed

## Auth
```
/api/auth
```
#### Post
`/api/auth/login` - Create session.
#### Get
`/api/auth/logout` - Delete session.