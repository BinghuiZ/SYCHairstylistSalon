# SYC Hair Salon Booking System

## Description
SYC Hair Salon Booking System is a web application built with Next.js and Prisma, designed to manage bookings for a hair salon. It allows customers to book appointments and helps salon staff manage their schedule efficiently.

## Features
- Online booking system for customers
- Admin panel for managing appointments
- Integration with PostgreSQL database
- Dockerized for easy deployment

## Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Yarn package manager

## Getting Started

### Using Docker (Recommended)

1. Clone the repository:
   ```
   git clone https://github.com/your-username/syc-hair-salon.git
   cd syc-hair-salon
   ```

2. Create a `.env` file in the root directory and add your environment variables:
   ```
   DATABASE_URL=postgresql://user:password@db:5432/syc-hair?schema=public&encoding=UTF8
   ```

3. Build and run the Docker containers:
   ```
   docker-compose up --build
   ```

4. The application should now be running at `http://localhost:3000`

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/your-username/syc-hair-salon.git
   cd syc-hair-salon
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Set up your local PostgreSQL database and update the `.env` file with your database URL.

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   yarn dev
   ```

6. The application should now be running at `http://localhost:3000`

## Project Structure
- `/app`: Next.js application files
- `/prisma`: Prisma schema and migrations
- `/components`: React components
- `/public`: Static assets

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

