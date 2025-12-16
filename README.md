# Urban Tree Sensor Data Visualization - Class/Development Branch

## Course Project Information



### Course Details
- **Course:** [Internet and Web Systems I]
- **Instructor:** Prof. Samantha Reig
- **Team Members:** [Sucharith Madhusoodana, Karan Hassan Balarama, Dheeraj Bharadwaj Kistampally, Adithya Garimella]
- **Semester:** Fall 2025

## Architecture

### Frontend Stack
- **Framework:** React 18.3 with TypeScript
- **Build Tool:** Vite
- **UI Library:** Tailwind CSS + shadcn/ui components
- **Charts:** Recharts

### Backend Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** JWT tokens
- **API Documentation:** Swagger/OpenAPI
- **Deployment:** Netlify Functions

### Development Tools
- **Linting:** ESLint
- **Formatting:** Prettier
- **Version Control:** Git/GitHub
- **Pre-commit Hooks:** Husky
- **Package Manager:** npm

---

## Project Structure

```
urban-tree/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── AdminPage.tsx   # Admin dashboard
│   │   ├── HomePage.tsx    # Landing page
│   │   ├── LoginPage.tsx   # Authentication
│   │   ├── Navigation.tsx  # Navigation bar
│   │   ├── ResearchPage.tsx# Research information
│   │   ├── SensorDataPage.tsx # Main data viz
│   │   └── TeamPage.tsx    # Team information
│   ├── services/           # API integration
│   │   ├── api-service.ts  # API client
│   │   └── api-types.ts    # TypeScript types
│   ├── AuthContext.tsx     # Auth state management
│   ├── date-utils.ts       # Date helper functions
│   ├── App.tsx             # Main app component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── docs/                   # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── DEPLOYMENT.md
│   └── DEVELOPMENT.md
├── .github/                # CI/CD workflows
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd urban-tree
   git checkout class  # Switch to class branch
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   VITE_API_BASE_URL=https://urban-tree-server.netlify.app/api
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   ```
   http://localhost:5173
   ```

---

## Features Implemented

### Core Features (Required)

#### 1. User Authentication
- JWT-based authentication
- Login/logout functionality
- Protected routes
- Session persistence

**Implementation:** `src/AuthContext.tsx`, `src/components/LoginPage.tsx`

#### 2. Data Visualization
- Sensor data display
- Interactive charts (temperature, humidity, pressure, etc.)
- Multi-node selection
- Historical data views

**Implementation:** `src/components/SensorDataPage.tsx`


**Implementation:** Tailwind CSS with responsive breakpoints

#### 3. API Integration
- RESTful API consumption
- Error handling
- Loading states
- Type-safe requests

**Implementation:** `src/services/api-service.ts`, `src/services/api-types.ts`

#### 4. Data Management
- CRUD operations for sensor data
- Data filtering and sorting
- Export functionality
- Historical data archives

**Implementation:** `src/components/AdminPage.tsx`

---

---

## Data Flow

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │ HTTP Requests
       ▼
┌─────────────┐
│ React App   │
│ (Frontend)  │
└──────┬──────┘
       │ Axios
       ▼
┌─────────────┐
│ API Service │
│ (api-service)│
└──────┬──────┘
       │ REST API
       ▼
┌─────────────┐
│   Backend   │
│  (Netlify)  │
└──────┬──────┘
       │ SQL
       ▼
┌─────────────┐
│  Supabase   │
│ (PostgreSQL)│
└─────────────┘
```

---


## Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Fix linting issues
npm run lint -- --fix

# Format code
npm run format

# Format and fix
npm run format -- --write

# Type check
npm run type-check
```

---

## 🐛 Known Issues & TODOs

### Current Issues
- [ ] Data export format needs validation
- [ ] Mobile menu animation could be smoother

### Future Enhancements
- [ ] WebSocket integration for real time updates
- [ ] Advanced data filtering and search
- [ ] Data comparison between nodes
- [ ] Custom date range selection
- [ ] User preferences and settings
- [ ] Email notifications for alerts
- [ ] Multi language support
- [ ] Dark mode toggle


## Deployment

### Development Environment
- **URL:** http://localhost:5173
- **Branch:** `class`
- **Purpose:** Development and testing

### Production Environment
- **URL:** https://urban-tree.netlify.app
- **Branch:** `main`
- **Purpose:** Live client facing application

- Link for website: https://urban-tree.vercel.app/


## Acknowledgments

- Prof. Joy Winbourne for project guidance and domain expertise









**Last Updated:** December 2024  
**Branch:** class (development)  
**Status:** ✅ Ready for evaluation
