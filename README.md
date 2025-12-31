# Weather App

A clean and minimal weather application built using **HTML, CSS, and Vanilla JavaScript**.  
The app fetches real-time weather data using the **Open-Meteo API** and presents it in a simple, readable, and user-friendly interface.

This project was built as a learning-focused exercise to understand:
- DOM manipulation
- Asynchronous JavaScript (`fetch`)
- API data handling
- UI/UX fundamentals
- Clean project structure

---

## 🌐 Live Demo

👉 **Live Website:**  
https://weather-app-debjganguly.netlify.app/

---

## ✨ Features

- Search weather by city name
- Displays:
  - City
  - Temperature
  - Wind speed
  - Humidity
  - Weather condition
  - Rain probability
- Animated gradient background
- Glassmorphism-style weather card
- Unified loading state
- Keyboard support (Press Enter to search)
- Responsive and clean UI

---

## 🛠️ Tech Stack

- **HTML5** – Structure
- **CSS3** – Styling, animations, layout
- **JavaScript (Vanilla)** – Logic and API handling
- **Open-Meteo API** – Weather & geocoding data
- **Netlify** – Deployment

---

## 📁 Project Structure

weather-app/

│

├── index.html # Main HTML file

├── style.css # Styling and animations

├── script.js # JavaScript logic and API calls

└── README.md # Project documentation

---

## ⚙️ How It Works

1. User enters a city name
2. App converts city name to coordinates using Open-Meteo Geocoding API
3. Coordinates are used to fetch weather data
4. Data is processed and displayed in a grid layout
5. Loading state is shown while data is fetched
6. UI updates only after valid data is received

---

## 🚀 Getting Started (Local Setup)

1. Clone the repository
   ```bash
   git clone https://github.com/<your username>/weather-app.git
Open the folder

No build tools or dependencies required.

📌 Future Improvements:
- Manual light/dark theme toggle
- Save last searched city
- Weather-based dynamic backgrounds
- Mobile-first layout refinements
- Better error handling for edge cases

👤 Author:
Debjyoti Ganguly

- GitHub: https://github.com/debjganguly
- Project link: https://weather-app-debjganguly.netlify.app/

📄 License
This project is open-source and free to use for learning and personal projects.
