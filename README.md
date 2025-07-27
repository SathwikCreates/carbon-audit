
# 🌿 Carbon Audit AI — Industrial Emissions Tracker
_Automated carbon emissions auditing from messy invoices, powered by AI_

---

## ✨ Overview

Carbon Audit AI is a web application that lets users **paste OCR-extracted invoice text** (from utility bills, fuel records, etc.), and get an **instant carbon footprint report** with:
- Total emissions (in kg CO₂e)
- Emissions breakdown by source (electricity, diesel, etc.)
- Compliance checks based on ISO 14064
- Tips on how to reduce emissions
- Education and FAQ for users unfamiliar with carbon metrics

This project was developed during my **Summer 2025 internship** to explore the application of **NLP, carbon accounting, and sustainability tech** in industrial settings.

---

## 🧠 Why This Matters

Companies are under pressure to report their greenhouse gas (GHG) emissions transparently. But manual carbon audits are:
- Time-consuming
- Prone to human error
- Difficult to scale

This app reduces audit time from **days to seconds** by using AI to extract and analyze data automatically.

---

## 🖼️ How It Works (App Flow)

### 1. Upload Invoice Text  
User pastes OCR-generated text like:

Invoice #874
Electricity usage: 15,000 kWh
Diesel fuel: 800 liters


### 2. Emission Analysis  
The app extracts values and calculates:

- Electricity: `15,000 x 0.233 = 3,495 kg CO₂e`
- Diesel: `800 x 2.68 = 2,144 kg CO₂e`
- **Total: 5,639 kg CO₂e**

### 3. Compliance Check  
- If electricity > 12,000 kWh → ⚠️ flagged
- If diesel > 1,000 liters → ⚠️ flagged

### 4. Report + Recommendations  
User sees:
- Emission summary
- Warnings (if any)
- How to reduce emissions
- FAQ and learning material

---

## 📄 Page Structure

| Page | Purpose |
|------|---------|
| `/upload` | User pastes invoice text and submits |
| `/results` | Emissions report, compliance, reduction tips |
| `/faq` (in-page accordion) | Explains terms like kWh, CO₂e, ISO, etc. |
| `/download` (optional) | PDF/CSV export for compliance/reporting |

---

## 📊 Emission Factors Used

| Source     | Unit       | Emission Factor (kg CO₂e) |
|------------|------------|----------------------------|
| Electricity| 1 kWh      | 0.233                      |
| Diesel     | 1 liter    | 2.68                       |

Based on IPCC & GHG Protocol guidelines.

---

## 🔧 Tech Stack

- Frontend: **React + Vite**
- Styling: **Tailwind CSS**
- Routing: **React Router**
- Backend: Firebase Cloud Functions (for logic)
- Hosting: Firebase Hosting
- Future AI integration: Gemini / Hugging Face Transformers

---

## 🧱 Folder Structure

carbon-audit-ai/
├── public/
├── src/
│ ├── pages/
│ │ ├── UploadPage.jsx
│ │ └── ResultsPage.jsx
│ ├── components/
│ │ ├── EmissionCard.jsx
│ │ ├── WarningCard.jsx
│ │ └── FAQSection.jsx
│ ├── utils/
│ │ └── extractData.js
│ ├── App.jsx
│ └── main.jsx
├── functions/ (optional Firebase backend)
├── firebase.json
└── README.md


---

## ⚙️ How to Run the App Locally

1. **Clone the project**

```bash
git clone https://github.com/SathwikCreates/carbon-audit.git
cd carbon-audit

Install dependencies
npm install

Run development server
npm run dev

❓ FAQ
Q: What does “CO₂e” mean?
A: CO₂e stands for Carbon Dioxide Equivalent — a standard metric to compare greenhouse gases by their global warming impact.

Q: Where do the thresholds come from?
A: The thresholds (12,000 kWh and 1,000 liters diesel) are based on ISO 14064 benchmarks for medium-sized industrial operations.

Q: Can I download a report?
A: Yes (if enabled), reports can be exported as PDF or CSV for compliance or audits.

Q: Will this replace full carbon accounting software?
A: No — this is a lightweight, educational prototype designed to automate early-stage auditing. It can be extended to integrate with ERP systems or GHG software tools.

Q: Can this handle scanned documents?
A: Yes, if you extract text using OCR tools like Tesseract or Firebase Vision and paste it into the app.


🧩 Impact Possibilities
📈 Plug into ERP systems for live emission tracking

🤖 Upgrade from regex to AI-powered extraction (BERT/Gemini)

🧾 Add PDF report exports

🔄 Sync audit history via Firestore

🧑‍💻 Author
Sathwik R.
🛠 Built during Internship 2025
🌍 Focused on climate tech, NLP, and carbon automation

📜 License
MIT — Free to use, adapt, and improve.

