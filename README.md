# Query Builder  

A full-stack web application to build and run custom queries on a **student database**.  
Frontend built with **React (Vite)**, backend with **Express + MySQL**.  

---

## 🚀 Features  
- Build queries using fields, operators, and shortcuts.  
- Execute queries on a MySQL database.  
- View results in a responsive table.  
- Pre-built shortcuts (Top 5, Failing Students, Above 90%, etc.).  
- Backend API with Express + MySQL.  

---

## 📂 Project Structure  
Query-Builder/
├── backend/ # Express server + MySQL connection
│ ├── server.js
│ ├── db.js
│ └── package.json
├── src/ # React frontend (Vite)
│ ├── components/
│ │ ├── QueryBuilder.jsx
│ │ └── Result.jsx
│ └── main.jsx
├── package.json # Frontend dependencies
├── README.md
└── .gitignore


---

## ⚙️ Setup Instructions  

### 1. Clone the repo  
```bash
git clone https://github.com/your-username/Query-Builder.git
cd Query-Builder

2. Setup Backend
cd backend
npm install

Configure database connection in db.js or .env:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=studentsdb


Start backend:

node server.js

Runs on http://localhost:5000

3. Setup Frontend

In another terminal:

cd ..
npm install
npm run dev


Runs on http://localhost:5173

🧪 Test API

Using Postman / Thunder Client:

POST http://localhost:5000/query
Content-Type: application/json

{
  "query": "math ORDER DESC LIMIT 5"
}

📸 Screenshots

<img width="1903" height="889" alt="image" src="https://github.com/user-attachments/assets/dbdc440d-7778-4031-bb53-c86849ee0778" />
<img width="1872" height="816" alt="image" src="https://github.com/user-attachments/assets/82bc3a42-1a97-4d11-836b-7efa4f9911e6" />



🤝 Contributing

Feel free to fork this repo and make pull requests!

📜 License

MIT License


