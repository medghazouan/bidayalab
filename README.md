# Med Digital Portfolio

A professional agency and portfolio website built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**. This project features a modern, responsive design, dynamic content management via MongoDB, and AI-powered capabilities using LangChain and Upstash Vector.

## 🚀 Features

-   **Modern Tech Stack**: Built with Next.js 14, React 19, and TypeScript for a robust and scalable architecture.
-   **Responsive Design**: Beautiful, responsive UI styled with Tailwind CSS and Framer Motion for animations.
-   **Dynamic Content**:
    -   **Portfolio/Works**: Dynamic routing for project details and categories (Web Development, Social Media, Paid Ads).
    -   **Content Management**: MongoDB integration for managing projects, testimonials, pricing plans, and more.
-   **Interactive Forms**:
    -   Contact form with email notification capabilities.
    -   Order/Service request system.
-   **AI Integration**:
    -   Utilizes **LangChain**, **Google GenAI**, and **HuggingFace** for AI features.
    -   **Vector Search**: Integrated with Upstash Vector for advanced search or RAG (Retrieval-Augmented Generation) capabilities.
-   **Authentication**: Configured with NextAuth.js.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **AI & LLM**: [LangChain](https://js.langchain.com/), [Upstash Vector](https://upstash.com/), Google GenAI, HuggingFace
-   **Forms**: React Hook Form + Zod validation
-   **Email**: Resend / Nodemailer

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   **Node.js** (v18+ recommended)
-   **npm** or **yarn**
-   **MongoDB** (Local instance or Atlas URI)

    git clone https://github.com/medghazouan/bidayalab.git
    cd bidayalab
    ```

2.  **Install dependencies:**
    
    npm install
    # or
    yarn install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and configure the following variables:

    ```env
    # Database
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

    # Authentication
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret

    # AI & Vector DB (If using AI features)
    UPSTASH_VECTOR_REST_URL=your_upstash_url
    UPSTASH_VECTOR_REST_TOKEN=your_upstash_token
    HUGGINGFACEHUB_API_KEY=your_huggingface_key
    GOOGLE_API_KEY=your_google_api_key
    ```

4.  **Seed the Database:**
    Populate the database with initial project data.
    ```bash
    npm run seed:projects
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

-   `npm run dev`: Starts the development server (with TurboPack support).
-   `npm run build`: Builds the application for production.
-   `npm start`: Runs the built production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.
-   `npm run seed:projects`: Seeds the MongoDB database with initial project data.
-   `npm test`: Runs Jest tests (if configured).

## wm Project Structure

```
med-elkechchad/
├── app/                  # Next.js App Router pages and API routes
├── components/           # Reusable React components
│   ├── projects/         # Project-specific components
│   ├── sections/         # Page sections (Hero, About, etc.)
│   └── ...
├── lib/                  # Utility functions and DB connection
├── models/               # Mongoose data models (Project, Contact, etc.)
├── public/               # Static assets (images, icons)
├── scripts/              # Database seeding scripts
└── styles/               # Global styles and Tailwind config
```
