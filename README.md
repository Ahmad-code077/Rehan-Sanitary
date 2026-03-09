# RTraders – Sanitary Product Web App

RTraders is a full-stack web application for managing and browsing sanitary products. Built with modern web technologies, it includes a customer-facing front-end, product catalog, search and filter functionality, and an admin panel for managing products and orders.

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Functionalities](#functionalities)  
- [Setup & Installation](#setup--installation)

---

## Features

- Browse and search sanitary products by **category**, **brand**, and **price**  
- View product details with availability and pricing  
- Admin panel for adding, updating, or removing products  
- Order placement via phone, WhatsApp, or email integration  
- Responsive UI with modern minimalist design  
- Customer testimonials and featured products sections  
- Filter reset and product sorting  

---

## Technologies Used

- **Frontend:** Next.js, React, TailwindCSS  
- **Backend / Database:** Prisma, PostgreSQL / JSON DB  
- **Deployment:** Vercel  
- **Authentication:** Email/Password login for admin panel  
- **State Management:** React Hooks, Context API  

---

## Functionalities

### Customer-Facing

- **Home Page:** Hero section with product highlights  
- **Products Page:** Browse products with search, filters, and categories  
- **Product Details:** Show price, brand, category, and availability  
- **Order Process:**  
  1. Browse products  
  2. Select & note quantities  
  3. Place order via call, WhatsApp, or email  
- **About & Contact Pages**  
- **Testimonials Section**  

### Admin Panel

- Login with credentials  
- CRUD operations on products (add, edit, delete)  
- View and manage customer inquiries  
- Manage product categories and brands  
- Optional: Track orders and stock availability  

---

## Setup & Installation

1. **Clone the repository**  

```bash
git clone https://github.com/Ahmad-code077/Rehan-Sanitary.git
cd Rehan-Sanitary

Install dependencies

npm install

Set up environment variables
Create a .env file based on .env.example with:

DATABASE_URL="your_database_url"
NEXT_PUBLIC_API_URL="your_api_url"

Run development server

npm run dev

Deploy: Vercel (configured for automatic deployment from GitHub)
