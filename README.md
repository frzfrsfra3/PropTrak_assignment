# 🏠 Real Estate Rental and Tenant Management System

A comprehensive real estate platform for property rentals, sales, and tenant management with built-in communication tools.


## ✨ Key Features

### 🏡 Property Management
- **List Properties**: Post properties for rent/sale with rich details
- **Advanced Search**: Filter by price, location, type, bedrooms, and more
- **Property Details**: View comprehensive listings with galleries and amenities

### 💬 Communication Tools
- **Real-time Chat**: Socket.io powered messaging between owners and tenants
- **Email System**: Ethereal email integration for formal communications
- **Group Chats**: Future plans for property-specific group chats with stakeholders

### 📑 Contracts & Transactions
- **Digital Contracts**: Create and manage rental agreements
- **Payment Integration**: Secure payment processing for rentals
- **Viewing Scheduling**: Coordinate property viewings with calendar

### 🔐 Security & Authentication
- **JWT Authentication**: Secure access with refresh token rotation
- **Role-based Access**: Distinct interfaces for owners, tenants, and admins

## 🛠️ Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database with optimized indexing |
| Mongoose | ODM for MongoDB |
| Socket.io | Real-time chat functionality |
| Cloudinary | Image upload and management |
| JWT | Secure authentication |

### Frontend
| Technology | Purpose |
|------------|---------|
| React | Frontend library |
| Redux | State management |
| Material-UI | UI components |
| Axios | HTTP requests |
| React Hook Form | Form management |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm (comes with Node.js) or yarn
- MongoDB Atlas account or local MongoDB
- Cloudinary account (for image uploads)

### Installation

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
