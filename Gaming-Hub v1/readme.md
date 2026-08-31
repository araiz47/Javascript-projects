# 🎮 Gaming Hub

A gaming discovery website built with **HTML, CSS, JavaScript, and Flask**, using the **RAWG Video Games Database API** to fetch game information.

Gaming Hub allows users to discover games, browse them by genre, search for specific games, view detailed information and screenshots, and save their favorite games locally.

## ✨ Features

* 🏠 Home page
* 🔍 Search for games
* 🎮 Discover games from the RAWG API
* 🏷️ Browse games by genre
* 📋 View detailed game information
* 📸 View game screenshots
* ❤️ Add and remove games from Favorites
* 💾 Favorites stored using `localStorage`
* 🔐 API key stored securely using environment variables
* 🌐 Flask backend to handle RAWG API requests
* 📱 Responsive layout
* ♻️ Reusable game card components

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* DOM Manipulation
* Fetch API
* Async/Await
* LocalStorage

### Backend

* Python
* Flask
* Flask-CORS
* Requests
* python-dotenv

### API

* RAWG Video Games Database API

## 📂 Project Structure

```text
Gaming-Hub/
│
├── index.html
├── discover.html
├── genres.html
├── favorites.html
├── game.html
│
├── style.css
├── discover.css
├── genres.css
├── favorites.css
├── game.css
├── game-card.css
│
├── script.js
├── genres.js
├── favorites.js
├── game.js
├── game-card.js
│
├── images/
│
├── backend/
│   └── app.py
│
├── .env
├── .gitignore
└── README.md
```

## ⚙️ How It Works

The frontend communicates with a Flask backend instead of directly exposing the RAWG API key.

```text
Browser
   ↓
JavaScript Fetch
   ↓
Flask Backend
   ↓
RAWG API
   ↓
Flask
   ↓
Browser
```

The RAWG API key is stored in an environment variable:

```text
RAWG_API_KEY=your_api_key
```

The `.env` file is excluded from Git using `.gitignore`.

## ❤️ Favorites

Favorite games are stored in the browser using `localStorage`.

When a user adds a game:

```text
Game
 ↓
Favorites array
 ↓
JSON.stringify()
 ↓
localStorage
```

When the Favorites page loads:

```text
localStorage
 ↓
JSON.parse()
 ↓
Favorites array
 ↓
Game cards
```

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Gaming-Hub
```

### 2. Install the Python dependencies

```bash
pip install flask flask-cors python-dotenv requests
```

### 3. Create a `.env` file

Create a `.env` file in the backend/project directory where your Flask application expects it.

```text
RAWG_API_KEY=your_api_key
```

### 4. Start the Flask server

```bash
python app.py
```

The backend will run locally, for example:

```text
http://127.0.0.1:5000
```

### 5. Open the frontend

Open the project using VS Code Live Server or another local development server.

## 📌 What I Learned

This project helped me practice:

* Working with REST APIs
* Fetching and displaying JSON data
* JavaScript `async/await`
* DOM manipulation
* Event listeners
* Creating reusable functions
* LocalStorage
* JSON parsing and stringifying
* Building a Flask backend
* Environment variables
* CORS
* Git and GitHub
* Organizing frontend and backend code
* Debugging real-world frontend/backend issues

## 🔮 Future Improvements

Possible improvements for a future version:

* Rebuild the frontend using React
* Add pagination
* Add more advanced filtering
* Improve loading and error states
* Add user accounts
* Add a database for persistent favorites
* Deploy the frontend and backend
* Improve accessibility
* Add more detailed game statistics

## 👨‍💻 Author

**Araiz**

Gaming Hub was built as a learning project while practicing full-stack web development.
