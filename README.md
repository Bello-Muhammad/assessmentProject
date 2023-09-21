## Project Sectup
  1. Applied microservice DDD architecture, cause it allow;
    - building and maintainace of system easier.
    - Task can be distributed among services
    -and app can be manage independently.
  2. The application uses `nestjs-cli` to scaffold the application, which help to easily have a `Clean Architecture` application setup which was later modified. 
  3. Dry principle implement on the project.

## Tech Stack
-Server-side: Nestjs, RabbitMQ, Redis and Postgresql with TypeOrm for easy query.

## Liberies
All library usage can be found in `package.json`;

## Setup and Running of both app
## After cloning or downloading the project from git navigate into each project folder respectively and run: 
```bash
$ npm install

# watch mode
$ npm run start:dev

```

## RabbitMq
## For you to able to utilize rabbitmq open another terminal on the taskDomain app and run:
```bash
# watch mode
$ npm run listen

# Note: your device should have access to internet connection to be able to connect to RabbitMQ Cloud
```

## Access THE APP LAUNCH
## For User app
visit http://localhost:3000/api/user 

```User app rest api

- GET: / (to get users)
- Post: / (to create user)
- POST: /createtask (to send task to creat and trigger create task event over RabbitMQ to the task domain)
GET: /:id (get single user)
PATCH:/:id (update single user)
DELETE: /:id/ (delete a particular user)

## Note: Your app should be up and running in order to access the routes
```

## For Task app
visit http://localhost:3001/api/tasks

```Task app rest api

- EventPattern  (it only trigger when user send create task event message along with task to create).
- GET: /  (list of all task and with pagination it only list five(5) task on each page)
- GET: /tasknotification    (it check for new task notification from cache and notify users)
- GET: /:id     (get single task, on this route I utilize the advantage of cache and inmemory array to keep track of most frequent fetch task and cache it to redis for fast response)
- PATCH:/:id    (update single task)
- DELETE: /:id/ (delete a particular task)

## Note: Your app should be up and running in order to access the routes
## and your Microservice local server should be up and running either (but not needed if there won't ##be any communication from user app).
```



## PROJECT STRUCTURE
## User
project
  db
  src
    |_user
      |_dto
      |_entities
      
## Task
project
  db
  src
    |_tasks
      |_redis-cache
      |_dto
      |_entities




