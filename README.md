# Django + React + D3.js Data Visualization App

This project is a web application that integrates a Django backend with a modular React frontend. The goal is to create interactive data visualizations using D3.js. The project structure emphasizes reusability and organization, using modern tools to simplify dependency management and build processes.

The application consists of the following main structure:
- **Backend (`config` and `core` folders):** Built with Django to manage the data and serve the application.
- **Frontend (`frontend` folder):** Contains React components (`components` folder) and global styles (`static/css` folder).

The application uses:
- **Babel** for compiling JSX.
- **Webpack** for building the frontend assets.
- **Poetry** for managing Python dependencies and environment.
- **D3.js** for creating interactive visualizations.

The home page uses a Django template to display navigation buttons, redirecting users to React components for interactive data visualizations.

## Project Structure
- **`config/`**: Configuration and setup files for the Django project.
- **`core/`**: Main application logic for the backend, including API endpoints for serving data.
- **`frontend/`**: Contains the React components and global CSS styles.
  - **`components/`**: React components for individual visualizations.
  - **`static/css/`**: Global styles shared across React components.
- **Root files**:
  - `pyproject.toml`: Poetry configuration for Python dependencies.
  - `package.json`: npm configuration for frontend dependencies and scripts.

### Prerequisites
1. **Python 3.10 or later:** Ensure Python is installed.
2. **Node.js and npm:** Required for building React components.
3. **Poetry:** Required for Python dependency management 

### Backend Setup
1. Install Poetry if not already installed:
   ```bash
   pip install poetry
   ```
2. Install the backend dependencies:
   ```bash
   poetry install
   ```
3. Start the Poetry environment:
   ```bash
   poetry shell
   ```

### Frontend Setup
1. Install frontend dependencies:
   ```bash
   npm install
   ```
2. Build the React components:
   ```bash
   npm run build
   ```

### Execution
Start the Django development server:
```bash
poetry run python manage.py runserver
```

Feel free to explore, modify, and extend the project for your specific needs.


