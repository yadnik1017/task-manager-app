# Task Manager Application

A full-stack web application for managing tasks with user authentication, built as part of the Frontend Developer Internship assignment.

## 🚀 Features

- ✅ User Registration & Login with JWT Authentication
- ✅ Secure password hashing with bcrypt
- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Search tasks by title or description
- ✅ Filter tasks by status (Pending, In Progress, Completed)
- ✅ User profile management
- ✅ Protected routes (authentication required)
- ✅ Responsive design with Bootstrap
- ✅ Real-time form validation

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI library
- **React Router DOM** - Navigation and routing
- **Bootstrap & React-Bootstrap** - UI components and styling
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Authentication tokens
- **Bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher) installed
- MongoDB installed and running
- Git installed
- A code editor (VS Code recommended)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd task-manager-app
```

### 2. Backend Setup
```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
# Copy and paste the following into a new file named .env:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_change_this_in_production_12345

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend application
npm start
```

The frontend will run on `http://localhost:3000`

## 📱 Usage

1. **Register**: Create a new account with name, email, and password
2. **Login**: Sign in with your credentials
3. **Dashboard**: View all your tasks with search and filter options
4. **Create Task**: Click "Create New Task" to add a new task
5. **Edit Task**: Click "Edit" on any task card to modify it
6. **Delete Task**: Click "Delete" to remove a task
7. **Profile**: Update your name and email from the profile page
8. **Logout**: Click logout to end your session

## 🔐 API Endpoints

### Authentication Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |

### Task Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/tasks` | Get all user tasks | Yes |
| POST | `/api/tasks` | Create new task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

## 🔒 Security Features

- **Password Hashing**: All passwords are hashed using bcrypt before storage
- **JWT Authentication**: Secure token-based authentication system
- **Protected Routes**: Frontend routes require authentication
- **Auth Middleware**: Backend API endpoints are protected with JWT verification
- **Input Validation**: Both client-side and server-side validation
- **CORS Configuration**: Controlled cross-origin requests

## 📁 Project Structure
```
task-manager-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   ├── TaskCard.js
│   │   │   └── TaskForm.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   └── Profile.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 📈 Scalability Considerations

### Current Architecture
- **Modular Code Structure**: Separated concerns with components, pages, and utilities
- **RESTful API Design**: Standard HTTP methods and status codes
- **Token-based Authentication**: Stateless authentication for horizontal scaling
- **MongoDB**: NoSQL database for flexible schema and easy scaling

### Production Recommendations

1. **Environment Management**
   - Use environment-specific configs (development, staging, production)
   - Implement proper secrets management (AWS Secrets Manager, HashiCorp Vault)

2. **Database Optimization**
   - Use MongoDB Atlas for cloud hosting with auto-scaling
   - Implement database indexing for faster queries
   - Add connection pooling for better performance

3. **Caching Layer**
   - Implement Redis for session management
   - Cache frequently accessed data
   - Add CDN for static assets

4. **Load Balancing**
   - Use Nginx or AWS ELB for distributing traffic
   - Implement horizontal scaling with multiple server instances

5. **Security Enhancements**
   - Add rate limiting to prevent DDoS attacks
   - Implement refresh tokens alongside access tokens
   - Add OAuth integration (Google, GitHub)
   - Enable HTTPS with SSL certificates

6. **Monitoring & Logging**
   - Integrate logging system (Winston, Morgan)
   - Set up error tracking (Sentry)
   - Add performance monitoring (New Relic, DataDog)

7. **Microservices Architecture**
   - Split into separate services (Auth Service, Task Service)
   - Use message queues (RabbitMQ, Kafka) for async operations
   - Implement API Gateway for routing

8. **Containerization & Deployment**
   - Dockerize frontend and backend
   - Use Kubernetes for orchestration
   - Set up CI/CD pipeline (GitHub Actions, Jenkins)
   - Deploy on cloud platforms (AWS, Azure, GCP)

9. **Frontend Optimization**
   - Implement code splitting and lazy loading
   - Add Progressive Web App (PWA) features
   - Optimize bundle size with tree shaking
   - Use server-side rendering (Next.js)

10. **Testing**
    - Add unit tests (Jest)
    - Implement integration tests
    - Set up end-to-end tests (Cypress)

## 🐛 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB service (Windows)
net start MongoDB

# Start MongoDB service (Mac/Linux)
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Backend - Change PORT in .env file
# Frontend - React will prompt to use different port
```

### CORS Errors
- Ensure backend has `app.use(cors())` in server.js
- Check if frontend API_URL matches backend URL

## 👨‍💻 Author

**[Your Name]**
- Email: [Your Email]
- GitHub: [Your GitHub Profile]
- LinkedIn: [Your LinkedIn Profile]

## 📄 License

This project was created as part of a Frontend Developer Internship assignment.

## 🙏 Acknowledgments

- Assignment provided by Bajarangs & Prime Trade AI
- Built with guidance from the internship requirements
```

---

### Step 2: Create .gitignore
1. In your main project folder, create a new file: `.gitignore`
2. Paste this content:
```
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
frontend/build/
build/

# Environment variables
.env
backend/.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
.project
.classpath
.settings/
*.sublime-workspace
*.sublime-project

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# MongoDB
data/
*.log