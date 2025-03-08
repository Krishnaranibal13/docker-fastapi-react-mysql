# FastAPI, MySQL, and React Project with Docker

This is a full-stack web application built with **FastAPI** for the backend, **MySQL** for the database, and **React** for the frontend. This project serves as a boilerplate for setting up a modern web application with these technologies, and is configured to run with **Docker** for easy deployment.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Project Setup](#project-setup)
    - [Backend (FastAPI + MySQL)](#backend-fastapi-mysql)
    - [Frontend (React)](#frontend-react)
3. [Database Setup](#database-setup)
4. [Running the Application](#running-the-application)
    - [Without Docker](#without-docker)
    - [With Docker](#with-docker)
5. [Endpoints](#endpoints)
6. [Contributing](#contributing)
7. [License](#license)

---

## Technologies Used
- **FastAPI**: A modern, fast (high-performance), web framework for building APIs with Python 3.7+.
- **MySQL**: A popular open-source relational database management system.
- **React**: A JavaScript library for building user interfaces, primarily for single-page applications.
- **SQLAlchemy**: ORM for working with databases in Python.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **antd**: UI design language and React UI library with a set of high-quality React components.
- **Docker**: Containerization platform to package and run applications in isolated environments.

---

## Project Setup

### Backend (FastAPI + MySQL)

1. **Clone the repository**
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Set up a virtual environment (Optional)**

   If you prefer running the backend `without Docker` and need to use a virtual environment, you can create one as follows:

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
    or
    ```bash
    pip install pipenv
    pipenv shell
    ```
   

3. **Install dependencies**
    - while using venv
    ```bash
    pip install -r requirements.txt
    ```
    
    - while using pipenv
    ```bash
    pipenv install -r requirements.txt
    ```


4. **Create a `.env` file for environment variables**
    Create a file named `.env` in the root directory and add your MySQL connection details:

    ```env
    DATABASE_URL=mysql://<username>:<password>@<hostname>/<database_name>
    ```

    Example for local MySQL:
    ```env
    DATABASE_URL=mysql://root:password@localhost/mydatabase
    ```

5. **Run the FastAPI app**
    ```bash
    uvicorn main:app --reload
    ```

    FastAPI should now be running on `http://localhost:8000`.

---

### Frontend (React)

1. **Navigate to the frontend directory**
    ```bash
    cd frontend
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Start the React development server**
    ```bash
    npm start
    ```

    The React app should now be running on `http://localhost:3000`.

---

## Database Setup

1. Install MySQL locally (if you don’t have it).
   - **Ubuntu**: `sudo apt-get install mysql-server`
   - **macOS**: `brew install mysql`

2. **Create the database**:
    ```bash
    mysql -u root -p
    CREATE DATABASE mydatabase;
    ```

3. **Configure the MySQL user and permissions**:
    ```bash
    CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL PRIVILEGES ON mydatabase.* TO 'username'@'localhost';
    FLUSH PRIVILEGES;
    ```

4. **Set up your database tables**:
    If you're using SQLAlchemy, create your models in `models.py` and run the migrations as mentioned earlier.

---

## Running the Application

### Without Docker

1. **Start the backend**:
    ```bash
    uvicorn main:app --reload
    ```

2. **Start the frontend**:
    ```bash
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the frontend and `http://localhost:8000` to view the FastAPI backend.

### With Docker

#### Dockerizing the Application

The project is set up with Docker to easily run both the backend (FastAPI) and the frontend (React) in separate containers. This is ideal for development and production environments.

#### 1. **Build Docker images**

To build the Docker images for the backend and frontend:

1. **Build Docker images**
   - For the backend:
     ```bash
     docker build -t fastapi-backend ./backend
     ```
   - For the frontend:
     ```bash
     docker build -t react-frontend ./frontend
     ```

#### 2. **Create a `docker-compose.yml` file**

Create a `docker-compose.yml` file in the root directory to run both the FastAPI backend, MySQL database, and React frontend in containers:

```yaml
services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile.backend
    ports:
      - "8000:8000"
    networks:
      - app-network

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile.frontend
    ports:
      - "3000:3000"
    networks:
      - app-network
    depends_on:
      - backend
  mysql:
    image: mysql:8
    container_name: mysql-container
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: your_database
    ports:
      - "3307:3306"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

#### 3. **Run the application using Docker Compose**

To start the application with Docker Compose, run the following command:

```bash
docker-compose up --build
```

This will:
- Start the MySQL container.
- Build and run the FastAPI backend and React frontend containers.

You can now access the application at:
- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:3000`

---

## Endpoints

### Example Endpoints in FastAPI

1. **GET /api/items** – Get a list of items.
    ```python
    @app.get("/api/items")
    def get_items():
        return {"items": db.query(Item).all()}
    ```

2. **POST /api/items** – Create a new item.
    ```python
    @app.post("/api/items")
    def create_item(item: Item):
        db.add(item)
        db.commit()
        return {"message": "Item created successfully"}
    ```

### React Example

Make HTTP requests from the React frontend using Axios.

```javascript
import axios from 'axios';

const fetchItems = async () => {
  const response = await axios.get('http://localhost:8000/api/items');
  console.log(response.data);
};

fetchItems();
```

---

Feel free to adjust the Docker setup and file structure based on your project’s needs.