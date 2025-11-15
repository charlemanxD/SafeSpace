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

## 🚀 Features
- **Anonymous Posting:** Users share experiences using pseudonyms only.  
- **Peer Support:** Comment system for encouragement and shared advice.  
- **Resource Hub:** Curated list of verified mental health, legal, and wellness organizations.  
- **AI Moderation:** **Google's Perspective API** to detect and filter toxic or harmful content.  
- **Support Us / Donate:** Integrated Paystack or Stripe donation page for community and NGO support.

---

## 🧰 Tech Stack
- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB Atlas  
- **Content Moderation APIs:** Google's Perspective API (for toxicity and abuse detection)  
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

## 💻 Pitch Deck
Read mre about this project here:
👉: [SafeSpace Pitch Deck](https://www.canva.com/design/DAG3B0d5yQE/Rg-5RkdPMDiXjI-iadGJgw/edit?utm_content=DAG3B0d5yQE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

---

## ⚙️ Deployment
This project is live at:
👉: 

---

## Demo (Screenshot)

---

## 💡 Future Enhancements
- AI-powered support chatbot for counseling.  
- Verified NGO and counselor onboarding.  
- Mobile app (React Native).  
- Transparency dashboard for donation tracking.

---

## 🤝 Contributors
Team **SafeSpace** — PLP Final Project  
- Design & Content Lead: [Juliet Asiedu](https://github.com/AJ-254)
- Technical & Product Lead: [Mawupemo Daniel Sotongbe](https://github.com/charlemanxD)

---

## 📄 License
This project is open source under the [MIT License](LICENSE).
