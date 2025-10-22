### **Arsitektur Teknis**

Frontend (React) ←  → Backend (Express) ←  → Database (MySQL)
        ↑                                         ↑                                          ↑
  Browser                        Server Node.js                    MySQL Database

## MENJALANKAN BACKEND

### **Masuk ke Directory Server**

cd server

### **Install Dependencies**

npm install


### **Jalankan Server Backend**

#Development mode dengan auto-restart

npm run dev

#Atau production mode

npm start

**Output yang Diharapkan:**

PS C:\wamp64\www\login-app\server> npm run dev

> login-app-server@1.0.0 dev
> nodemon server.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
🚀 Server running on port 5000
📊 Environment: development
🔗 Client URL: http://localhost:3000
✅ Database connected successfully
📦 Initializing database...
❌ Database initialization failed: Specified key was too long; max key length is 1000 bytes



## MENJALANKAN FRONTEND

### **Masuk ke Directory Client**

cd client

### **Install Dependencies**

npm install

### **Jalankan Development Server**

> login-app-client@1.0.0 dev
> vite

  VITE v4.5.14  ready in 418 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
