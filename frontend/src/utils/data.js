import { Sparkles, BarChart2, Mail, FileText } from "lucide-react";
import {
  LayoutDashboard,
  Plus,
  Users
} from "lucide-react";

export const FEATURES = [
    {
        icon: Sparkles,
        title: "Intelligent AI Generation",
        description:
            "Provide raw text, email snippets, or receipt details, and watch our artificial intelligence build a flawless, fully-structured invoice instantly.",
    },
    {
        icon: BarChart2,
        title: "Financial Insight Hub",
        description:
            "Visualize actionable cashflow analytics and financial trends computed dynamically from your invoicing data.",
    },
    {
        icon: Mail,
        title: "Automated Payment Chasers",
        description:
            "Send polite, high-converting payment follow-up letters to clients with outstanding balances in a single click.",
    },
    {
        icon: FileText,
        title: "Unified Billing Control",
        description:
            "Track invoice lifecycles, log incoming payments, and oversee client profiles within one secure, centralized billing panel.",
    },
];

export const TESTIMONIALS = [
    {
        quote: "This platform has completely reshaped my billing workflow. I can prepare and dispatch complex client invoices in under a minute.",
        author: "Sarah Jenkins",
        title: "Freelance Creative Director",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    },
    {
        quote: "The easiest, most responsive invoicing solution we've ever integrated. Our clients love the detail, and we get paid days faster.",
        author: "Marcus Vance",
        title: "Agency Co-Founder",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    },
    {
        quote: "The business analytics and revenue forecasting tools give me complete control over cashflow without using tedious spreadsheets.",
        author: "Elena Rostova",
        title: "Strategy Consultant",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    },
];

export const FAQS = [
    {
        question: "How does the AI generator analyze my text?",
        answer: "Our natural language processing algorithms parse names, item quantities, prices, and dates from raw inputs like emails or notes to compile structured invoices automatically.",
    },
    {
        question: "Is there a free trial period?",
        answer: "Yes, you can register for our 14-day trial to experience our entire suite of features with no credit card required.",
    },
    {
        question: "Am I locked into a specific plan?",
        answer: "No, our plans grow as your business grows. You can scale, upgrade, or downgrade your billing tier at any moment by contacting support.",
    },
    {
        question: "Can I cancel my membership?",
        answer: "Of course. If your requirements change, cancel your subscription through your profile. No recurring fees will be processed, no questions asked.",
    },
    {
        question: "Can I personalize the invoice details?",
        answer: "Yes, you can append unique business terms, custom notes, local tax rates, and support logos to format documents exactly how you want.",
    },
    {
        question: "How is subscription billing handled?",
        answer: "Billing tiers are assigned to workspaces rather than individual profiles. This allows you to run basic free workspaces alongside upgraded premium workspaces.",
    },
];

// Navigation items configuration
export const NAVIGATION_MENU = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "invoices", name: "Invoices", icon: FileText },
  { id: "invoices/new", name: "Create Invoice", icon: Plus },
  { id: "profile", name: "Profile", icon: Users },
];