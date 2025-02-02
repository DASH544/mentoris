# Mentoris

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

## Overview

Mentoris is a web application that allows users to buy and sell online courses. It provides a platform for instructors to create and manage their courses, and for students to browse, purchase, and access courses.

## Features

- User Authentication: Secure user registration and login.
- Course Management: Instructors can create, edit, and delete courses.
- Course Browsing: Students can browse and search for courses.
- Course Enrollment: Students can purchase and enroll in courses.
- Payment Integration: Secure payment processing for course purchases.
- User Dashboard: Personalized dashboard for instructors and students.

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: RazorPay

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mentoris.git

2. **Navigate to the Project Directory**
    ```sh
    cd mentoris
    ```

3. **Install Dependencies**
    ```sh
    npm install
    ```

4. **Configure Environment Variables**
   Create a `.env` file in the root of the project and add the following:
   ```plaintext
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret

