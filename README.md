# fitness-and-sports-partner-server


- Dependencies and Configuration:

Dependencies like express, cors, and mongodb are imported.
The Express application is created, and the server's port is set.
- Middleware Setup:

CORS middleware is used to handle cross-origin resource sharing.
Express is configured to parse incoming JSON requests.
- MongoDB Connection:

Connection to MongoDB is established using a connection string, username, and password.
The MongoDB client is configured with specific API version settings.
- Async Function for Server Setup:

An asynchronous function named run is defined to set up endpoints and handle database operations.
The function connects to MongoDB and defines collections for services and bookings.
- Service and Booking Collections:

Collections for services, bookings, and a new service are created from the connected MongoDB database.
- Service Endpoints:

Endpoints are created for retrieving all services, fetching a specific service by ID, and searching services by text.
- Booking Endpoints:

APIs are implemented for retrieving bookings and adding new bookings.
- New Service Endpoints:

Endpoints for adding, retrieving, updating, and deleting new services are defined.
- Ping Command:

A ping command is included to check the connection to the MongoDB deployment and log a success message.
- Server Initialization:

A simple "fitness is running" response is set for the root endpoint.
The server is configured to listen on the specified port.
