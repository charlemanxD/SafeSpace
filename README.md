## 🌸 SafeSpace – Anonymous Support Platform for Women

## Overview
SafeSpace is a web application that provides a private, anonymous, and supportive digital space for women.  
Users can share experiences, access verified resources, connect with peers, and support the platform through donations — all while staying completely anonymous.

This project supports:
- **SDG 5 – Gender Equality**
- **SDG 3 – Good Health & Well-Being**
- **SDG 16 – Peace, Justice & Strong Institutions**

---

## 🚀 Features
- **Anonymous Posting:** Users share experiences using pseudonyms only.  
- **Peer Support:** Comment system for encouragement and shared advice.  
- **Resource Hub:** Curated list of verified mental health, legal, and wellness organizations.  
- **AI Moderation:** Uses either **Stream**, **OpenAI Moderation API**, or **Google Perspective API** to detect and filter toxic or harmful content.  
- **Support Us / Donate:** Integrated Paystack or Stripe donation page for community and NGO support.

---

## 🧰 Tech Stack
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Content Moderation APIs:** Stream, OpenAI Moderation, or Google Perspective API (for toxicity and abuse detection)  
- **Payment Integration:** Paystack (Africa/Ghana) or Stripe (global)  
- **Deployment:** Vercel (frontend), Firebase/Heroku (backend)

---

## 🧱 Database Structure (MongoDB)
| Collection | Fields |
|-------------|--------|
| users | _id, username, email, createdAt |
| posts | _id, userId, content, pseudonym, createdAt, flagged, reportsCount |
| comments | _id, postId, userId, content, createdAt |
| resources | _id, category, name, contact, location |
| reports | _id, targetType, targetId, reporterId, reason, status, createdAt |

---

## 🔒 Moderation Flow
1. User submits a post/comment.  
2. Text is sent to the chosen moderation API (Stream / OpenAI / Perspective).  
3. The API returns a confidence score for harmful or unsafe content.  
4. If above threshold → flagged or blocked.  
5. Clean posts are stored and displayed publicly.  

---

## 💳 Donations
- **Local (Ghana/West Africa):** Paystack – supports Mobile Money and card payments.  
- **Global:** Stripe Checkout – hosted payment page with one-time or recurring options.

---

## 🧩 SDG Impact
- **SDG 5:** Empower women through inclusive digital engagement.  
- **SDG 3:** Foster mental well-being by offering safe expression.  
- **SDG 16:** Build a peaceful, accountable, and supportive community online.

---

## 💡 Future Enhancements
- AI-powered support chatbot for counseling.  
- Verified NGO and counselor onboarding.  
- Mobile app (React Native).  
- Transparency dashboard for donation tracking.

---

## 🤝 Contributors
Team **SafeSpace** — PLP Final Project  
- Design & Content: *Juliet Asiedu* 
- Technical & Product Lead: *Mawupemo Daniel Sotongbe*

---

## 📄 License
This project is open source under the [MIT License](LICENSE).
