# Role-Based Access Control (RBAC) Application in Next.js

## Interview prompt document is attached [here](https://github.com/Sathyanarayanan-Dhanuskodi/hit-assessment/blob/main/docs/Interview%20Prompt.docx)

## Prerequisites

Before you begin, make sure you have the following tools installed:

- **nvm** (Node Version Manager)
- **git**

## Tech Stack

**Client:** Next JS, Typescript

**Server:** Next JS

**Database:** SQLite

## Run Locally

Clone the project

```bash
git clone https://github.com/Sathyanarayanan-Dhanuskodi/hit-assessment
```

Go to the project directory

```bash
cd hit-assessment
```

Create `.env` file (Refer `.env.example` for reference) or run

```bash
cp .env.example .env
```

Switch the node version

```bash
nvm use
```

Install dependencies

```bash
npm i
```

Start the server in development mode

```bash
npm run dev
```

Application will now run in `http://localhost:3000`

## Getting Started

### Demo Credentials to sign in

This document provides a list of demo credentials for different user roles, outlining the access privileges each role has in the system.

### Credentials Overview

### 1. **Admin (Full Access)**

- **Username**: `sathya`
- **Password**: `Test@123`
- **Access Rights**:
  - Full access to all sections of the system.

### 2. **HR (Read-Only Access to Employees Tab)**

- **Username**: `senthil`
- **Password**: `Test@123`
- **Access Rights**:
  - Read-only access to the **Employees** tab.
  - No access to other sections.

### 3. **Finance Manager (Full Access to Finance Management, View-Only Access to Employees)**

- **Username**: `gopi`
- **Password**: `Test@123`
- **Access Rights**:
  - Full access to the **Finance Management** tab.
  - View-only access to the **Employees** tab.

### 4. **HR Manager & Finance Manager (Full Access to Employees & Finance Management Tabs)**

- **Username**: `guru`
- **Password**: `Test@123`
- **Access Rights**:
  - Full access to both **Employees** and **Finance Management** tabs.

### Admin Sign Up

- You can also sign up as an **Admin** by clicking the `Admin Sign Up` link on the sign-in page.
- After signing up, you can use your own credentials to explore the application and gain full access to all sections.

### Summary

| Role                             | Username | Password | Access Rights                                                             |
| -------------------------------- | -------- | -------- | ------------------------------------------------------------------------- |
| **Admin**                        | sathya   | Test@123 | Full access to all sections.                                              |
| **HR**                           | senthil  | Test@123 | Read-only access to Employees tab.                                        |
| **Finance Manager**              | gopi     | Test@123 | Full access to Finance Management tab, View-only access to Employees tab. |
| **HR Manager & Finance Manager** | guru     | Test@123 | Full access to Employees and Finance Management tabs.                     |

Please use the above credentials to log in and explore the different access levels.

## Application Walkthrough

Here is an overview of the application's main sections and features:

### 1. **Home**

- The home page features a placeholder screen with navigation links in the sidebar.

### 2. **Employees**

- Displays a list of employees with details such as their **username**, **roles**, and **action icons** for each employee.
- An **Add Employees** button allows you to add new employees.
- The **Edit** and **Delete** buttons next to each employee allow you to modify or remove employee details.
- Access to **View**, **Edit**, **Delete**, and **Create** actions is based on the access level assigned in the **Access Management** tab.

### 3. **Finance Management**

- This is a placeholder tab that demonstrates role-based access control.
- The screen displays the allowed access levels based on the user’s role.

### 4. **Access Management**

- Displays the settings for all three modules: **Employees**, **Finance Management**, and **Access Management**.
- You can manage and customize permissions (Read, Create, Edit, Delete) for all four roles (Admin, HR, Finance Manager, and HR Manager) for each of these modules here.

### 5. **Sign Out**

- Use this option to sign out of the application.

## Features

This application demonstrates **Role-Based Access Control (RBAC)** in Next.js

### Roles

The application supports four distinct roles:

- **Admin**: Full access to all features and settings
- **HR**
- **HR Manager**
- **Finance Manager**

### Modules

The application is organized into three key modules:

- **Employees**: Manage employee data
- **Finance Management**: Placeholder tab to showcase RBAC
- **Access Management**: Control and configure user roles and permissions

### Permission Levels

Each role has varying levels of access with four defined permission types:

- **Read**: View data
- **Create**: Add new data
- **Edit**: Modify existing data
- **Delete**: Remove data

### Access Control

All permissions and access settings for roles (except Admin) can be managed and customized under the **Access Management** tab.

### User Access

Users will be able to access and utilize the application's features based on the permissions granted to their specific role.

## Deployment

To deploy the project in a production environment:

1. Set `NODE_ENV=production`
2. Install production dependencies by running:

```bash
npm ci --production
```

3. Build the project:

```bash
npm run build
```

4. Start the application in production mode:

```bash
npm run start
```
