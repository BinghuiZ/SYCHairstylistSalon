# SYC Hair Salon Booking System

## Description
SYC Hair Salon Booking System is a web application built with Next.js and Prisma, designed to manage bookings for a hair salon. It allows customers to book appointments and helps salon staff manage their schedule efficiently.

## Features
- Online booking system for customers
- Admin panel for managing appointments
- Client management
- Calendar view
- Dashboard with income overview
- Integration with PostgreSQL database
- Dockerized for easy deployment

## Tech Stack
- Next.js 14.2.3
- React 18
- Prisma with PostgreSQL
- TypeScript
- Tailwind CSS
- Docker for containerization

## Prerequisites
- Docker and Docker Compose
- Node.js (for local development)
- Yarn package manager

## Getting Started

### Using Docker (Recommended)

1. Clone the repository
2. Create a `.env` file with necessary environment variables
3. Run `docker-compose up --build`
4. Access the application at `http://localhost:3000`

### Local Development

1. Clone the repository
2. Install dependencies with `yarn install`
3. Set up local PostgreSQL database and update `.env`
4. Run migrations with `npx prisma migrate dev`
5. Start development server with `yarn dev`
6. Access the application at `http://localhost:3000`

## Project Structure
- `/app`: Next.js application files
- `/prisma`: Prisma schema and migrations
- `/components`: React components
- `/public`: Static assets

## Key Components
- NavBar: Main navigation component
- ClientTable: Displays list of clients with sorting and pagination
- BookingDetail: Handles creation of new bookings
- IncomeBarChart: Visualizes income data

## API Routes
- `/api/clients`: Manages client data
- `/api/bookings`: Manages booking data

## Styling
Uses Tailwind CSS and Radix UI for styling

## Deployment
Containerized using Docker for easy deployment

## Future Improvements
1. Implement user authentication and authorization
2. Add more detailed reporting and analytics features
3. Integrate with a payment gateway for online bookings
4. Implement a notification system for appointment reminders

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

