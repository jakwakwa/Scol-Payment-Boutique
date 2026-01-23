# SCOL Payment Boutique (StratCol Payment Hub)

A modern, comprehensive payment management dashboard designed to streamline payment link generation, eMandate onboarding, and transaction analytics. Built with performance and user experience in mind using the latest Next.js 15 stack.

![Dashboard Preview](public/placeholder-logo.png)

## 🚀 Overview

The **SCOL Payment Boutique** serves as a centralised hub for merchants and administrators to manage financial interactions. It simplifies the complexity of payment processing by offering tools to create quick payment requests, manage recurring debit orders (eMandates), and visualise financial performance through interactive analytics.

## ✨ Key Features

* **📊 Interactive Dashboard**
    * Real-time "Quick Stats" view (Active Links, Revenue, Success Rates).
    * Visual performance metrics comparing current data with previous months.

* **🔗 Smart Payment Links**
    * **Quick Link:** Generate instant payment requests with amount, currency (ZAR, USD, EUR), and description.
    * **Advanced Link:** Create detailed links with specific expiry dates, multi-PSP selection (ABSA Pay, Capitec Pay, PayShap, etc.), and custom notification settings (Email, SMS, Webhook).

* **📝 eMandate Onboarding**
    * Streamlined 3-step wizard for debit order registration:
        1.  Product Selection
        2.  Banking Details
        3.  Identity Verification

* **📈 Analytics & Reporting**
    * Detailed charts for Total Link Clicks, Conversion Rates, and Average Payment Time.
    * **Payment Method Performance:** Comparative analysis of success rates across different providers (e.g., ABSA Pay vs. Capitec Pay).

* **🛠️ Link Management**
    * Centralised table to track link status (Active, Paid, Expired).
    * Monitor engagement metrics like clicks and payment counts per link.

## 🛠️ Tech Stack

This project leverages the latest cutting-edge web technologies:

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
* **UI Library:** [React 19](https://react.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
* **Components:** [Radix UI](https://www.radix-ui.com/) (Primitive UI components)
* **Charts:** [Recharts](https://recharts.org/)
* **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
* **Date Handling:** [date-fns](https://date-fns.org/)
* **Icons:** [Lucide React](https://lucide.dev/)

## ⚡ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

* Node.js 18+ (LTS recommended)
* bun (recommended), npm, or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/scol-payment-boutique.git](https://github.com/your-username/scol-payment-boutique.git)
    cd scol-payment-boutique
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    bun install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    bun dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router pages
│   ├── analytics/        # Analytics route
│   ├── dashboard/        # Dashboard specific components/data
│   ├── emandate/         # eMandate wizard route
│   ├── layout.tsx        # Root layout (Metadata, Fonts)
│   └── page.tsx          # Main Dashboard view
├── components/           # Reusable UI components
│   ├── ui/               # Primitive components (Button, Card, Input, etc.)
│   └── ...               # Feature-specific components
├── public/               # Static assets
└── styles/               # Global styles
