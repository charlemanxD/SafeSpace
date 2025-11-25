## 🌸 SafeSpace – Anonymous Support Platform for Women

## Overview
SafeSpace is a web application that provides a private, anonymous, and supportive digital space for women.  
Users can share experiences, access verified resources, connect with peers, and support the platform through donations — all while staying completely anonymous.

**SafeSpace** is a dedicated web application, providing a **private, anonymous, and secure environment** for women. It serves as a vital digital hub to facilitate:

- **Secure Sharing:** Anonymously voice personal experiences and stories without fear of judgment, exposure, or retribution.
    
- **Curated Support & Resources:** Direct access to vetted, professional resources across key areas, including **mental health services, legal aid, wellness programs, and career development support**.
    
- **Community Connection:** Foster strength and resilience through **peer-to-peer support** and community encouragement, building a network of mutual aid.
    
- **Proactive Safety:** Immediate reporting mechanisms with **swift, dedicated moderation** to ensure a consistently safe and respectful digital space by removing inappropriate or harmful content.
    
- **Sustainable Mission:** Provide opportunities for community members to support the platform's long-term growth and service expansion through donations.

---

## **🧩 Alignment with Global Goals (SDG Impact)**

This project is a direct action toward achieving:
- **SDG 5:** Empower women through inclusive digital engagement.  
- **SDG 3 (Indirect):** Foster mental well-being by offering safe expression.  
- **SDG 16 (Indirect):** Build a peaceful, accountable, and supportive community online.

---

## ✨ Features
- **Anonymous Posting:** Users share experiences using generated pseudonyms only.  
- **Real-time Toxicity Filtering:** Content is moderated using **Google's Perspective API** 
    during submission to detect and filter toxic or harmful content.
- **Secure Authentication**: JWT-based authentication for protected routes.
- **Secure Donations (GHS):** Integrated with Paystack for voluntary financial support.
- **Support Us / Donate:** Integrated Paystack or Stripe donation page for community and NGO support.
- **Resource Hub:**  Curated list of verified mental health, legal, and wellness organizations.  

---

## 🧰 Tech Stack
- **Frontend:** React + Tailwind CSS + Shadcn
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Authentication:**	JSON Web Tokens (JWT), bcrypt
- **Content Moderation APIs:** Google's Perspective API (for toxicity and abuse detection)  
- **Payment Integration:** Paystack (Africa/Ghana)
- **Deployment:** Vercel(Frontend) | Render(Backend)

---

## 📂 Project Structure
```
SafeSpace/
├── controllers/          # Express route logic (auth, posts, etc.)
├── models/               # MongoDB Mongoose schemas (User, Post, Donation, etc.)
├── routes/               # Express API route definitions
├── middleware/           # Custom middleware (auth, perspective check)
├── services/             # Utility functions (e.g., perspective API handler)
├── frontend/             # React application source code
│   ├── public/           # App logo and favicon
│   ├── src/
│   │   ├── components/   # Reusable UI components (Navbar, PostCard, ProtectedRoute)
│   │   │   ├── ui/       # Resusable components (Button, Card, Input, Label, Textarea, etc..)
│   │   ├── context/      # Global state (AuthContext)
│   │   ├── pages/        # Main pages (Home, Feed, Login, Register, Resources, Donate)
│   │   └── App.jsx       # Main router setup
│   ├── .env              # Environment variables for the frontend
│   ├── package.json
│   └── vite.config.js
├── .env                  # Environment variables for the backend
├── package.json          # Backend dependencies
├── server.js             # Main Express server entry point
└── README.md             # This file
```

--- 

## 🗃️ Database Schema (MongoDB)

1. User Collection (Authentication)

| Field | Type | Description |
| :------- | :------: | -------: |
| email | String | User's email (Unique). |
| username| String | User's chosen name (Unique). |
| hashedPassword | String | Securely hashed password. |
| pseudonymID | String | "Unique anonymous ID (e.g., User-a1b2c3d4)." |
| status | String | "Account status (active, etc.)." |
| createdAt | Date | Timestamp of registration. |

2. Post Collection (Feed Content)

| Field | Type | Description |
| :------- | :------: | -------: |
| content,\ | String | The main post text. |
| pseudonymID | String | Pseudonym of the user who created the post.|
| toxicityScore | Number | Last recorded Perspective API toxicity score.|
| comments | Array | Embedded array of comment objects (future feature). |
| createdAt | Date | Timestamp of post creation |

3. Donation Collection (Payment Records)

| Field | Type | Description |
| :------- | :------: | -------: |
| transactionRef | String | Unique Paystack transaction reference ID. |
| amount | Number | "Donation amount (in base currency unit, e.g., GHS)." | 
| currency | String | "Currency code (e.g., GHS)." |
| email | String | Donor's email address. |
| status | String | "Transaction status (pending, success, failed)." |
| createdAt | Date | Timestamp of transaction initiation. |

---

## 🔒 Moderation Flow
1. User submits a post.  
2. Text is sent to the chosen moderation  Perspective API Endpoint.  
3. The API checks the confidence score of the Post.
4. If harmful or unsafe, content blocked from being posted and prompt the user to review the Post.  
5. Clean posts are stored and displayed publicly.  

---

## 💳 Donations
- **Local (Ghana/West Africa):** Paystack – supports Mobile Money and card payments.  

---

## 💻 Pitch Deck
Read mre about this project here:
👉 [SafeSpace Pitch Deck](https://www.canva.com/design/DAG3B0d5yQE/Rg-5RkdPMDiXjI-iadGJgw/edit?utm_content=DAG3B0d5yQE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## ⚙️ Deployment
This project is live at:
👉 [Link](https://safe-space-v1.vercel.app/)

---

## 🎬 Demo (Screenshot)

---

## 💡 Future Enhancements
- AI-powered support chatbot for counseling.  
- Verified NGOs and counselors onboarding.  
- Mobile app (React Native).  
- Transparency dashboard for donation tracking.
- Comment integration with real-time moderation.
- Payments option for international donations(Stripe)
- Paid advert  for monetization

---

## 🚀 Getting Started Locally
Prerequisites
Node.js (v18+)

'MongoDB Instance (Local or remote Atlas cluster)'

'Paystack Account (for testing donations)'

1. Environment Variables

Create a file named .env in the root SafeSpace directory and add the following:
```
# MongoDB
MONGO_URI=your_mongodb_connection_string

# PORT
PORT=5050

# CORS
ALLOWED_ORIGINS=http://localhost:5050

# Authentication
JWT_SECRET=a_very_long_random_string_for_jwt_signing

# Perspective API (for toxicity checks)
PERSPECTIVE_API_KEY=your_google_perspective_api_key

# Paystack (for donations)
PAYSTACK_SECRET_KEY=sk_test_... # Backend Secret Key
PAYSTACK_PUBLIC_KEY=pk_test_... # Frontend Public Key
```

2. Install Dependencies
Install dependencies for both the backend (root) and the frontend (frontend/).

##### Backend dependencies (from the SafeSpace root directory)
`npm install`

#####  Frontend dependencies (navigate to the frontend folder)
```
cd frontend
npm install
```

3. Run the Application
Start the backend and frontend development servers concurrently.

#### 1. Start the Backend (from the SafeSpace root directory)
`npm run dev-server # (Or whatever script you use to start Node/Express)`

#### 2. Start the Frontend (from the frontend directory)
```
cd frontend
npm run dev # (Starts the Vite development server)
```

`The application should now be accessible at http://localhost:5173 (or the port specified by Vite).`

---

## 🤝 Contributors
Team **SafeSpace** — PLP Final Project  
- Design & Content Lead: [Juliet Asiedu](https://github.com/AJ-254)
- Technical & Product Lead: [Mawupemo Daniel Sotongbe](https://github.com/charlemanxD)

---

## 🧑🏾‍🤝‍🧑🏻 Contributions

Contributions, feature suggestions, and issue reports are welcome!
To contribute:

1. Fork this repository

2. Create a feature branch **(git checkout -b feature-name)**

3. Commit your changes **(git commit -m "Add new feature")**

4. Push to your branch and open a Pull Request

---

## ⚙️ Deployment
This project is live at:
👉 [Link](https://safe-space-v1.vercel.app/)

---
## 📄 License
This project is open source under the [MIT License](LICENSE).
