# Real Estate Rental and Tenant Management Template


## Features

- Post a property for rent/sale
- Search and filter properties
- View property details
- Built-in Chat Application for communication between owner and tenant(client)
- Secure JWT authentication using access and refresh tokens
- Send emails between owner and tenant 
- Create Property Contract
- Manage tenants(clients) 
- viewings schedules
- Register buy Payment

## Configuration and Installation Instructions

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [React.js](https://facebook.github.io/react/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/)
- [Ethereal Email](https://ethereal.email/)

1. Clone the repository:

```bash
$ git clone https://github.com/SonamRinzinGurung/Real-Estate-Rental-and-Tenant-Management-System.git
```

2. Install the required packages for the backend:

```bash
$ cd server
$ npm install --force
$ cp  .env.example .env
```

3. Open a new terminal session and install the required packages for the frontend:

```bash
$ cd client
$ npm install
$ cp .env.example .env
```

4. Configure the environment variables inside the server folder.


5. Configure the environment variables inside the client folder.



6. Run the application on Server:

```bash
$ cd server
$ npm run start
```
7. Run the application on Client:

```bash
$ cd server
$ npm run start
```
## Estimated Time 

3 days

## Note

- I used redux
- I used indexing on server code 
- its already done with roles:client, owner and login register
- I used socket io for chating
- I used cloudinary I shared u cred of mongodb atlas uri & cloudinary key to test
- I did my best for design , I can convert ur favourate figma into html,react,nextjs ts

## Future Plans

I have many future plans to improve like these projects:
within chatting I can make property chat or  group chat with ablility assign all stackholders( technicials , financial agents 

,decorating engineers,architects, photographers,,broker ) to specific properties & enable scheduled viewings within same chat
improve more details about the property owner (make his profile like linkedin (what his hobbies what are his interests)making contracts 

between client & agent (its done 50%)
