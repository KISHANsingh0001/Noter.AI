# Noter.AI

A powerful PDF note-taking application with AI capabilities.

## Overview

Noter.AI allows you to upload PDF files, take notes, and leverage AI to extract and interact with information from your documents. Designed for students, researchers, and professionals who need to work effectively with PDF content.

## Features

- **PDF Upload & Management**: Upload and organize your PDF documents in one place
- **AI-Powered Search**: Find specific information within your PDFs quickly
- **Smart Note Taking**: Take and organize notes directly alongside your PDFs
- **Free & Premium Plans**:
  - Free: Upload up to 5 PDF files with unlimited notes
  - Premium: Unlimited PDF uploads and additional features like file deletion

## Technologies Used

- Next.js for the frontend and API routes
- Convex for backend and database
- Clerk for authentication
- PDF processing with AI vector embeddings
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`)
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The application requires the following environment variables:
- Clerk authentication keys
- Convex API keys
- OpenAI API key for AI functionality

See `.env.example` for the complete list of required variables.

## Usage

1. Sign up or log in to your account
2. Upload PDF files from the dashboard
3. Click on a PDF to open the workspace
4. Use the AI tool to ask questions about your PDF
5. Take and save notes as you study the document

## Copyright

© 2025 Kishan Singh Thakur. All Rights Reserved.

---

Created with ❤️