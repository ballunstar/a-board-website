# 📝 Post Management System

This module is a fully functional post management feature built using **React**, **Zustand**, **React Hook Form**, and **MUI**. It includes the ability to create, edit, delete, and comment on posts, along with infinite scroll and category filtering.

---

## 📦 Features

### 🔍 Post List Page
- ✅ Infinite scroll with page-wise fetching
- ✅ Debounced search input
- ✅ Category filter with Select dropdown
- ✅ Post preview with title, content snippet, author, and comment count
- ✅ "Create +" button to open the Create/Edit post dialog

### 🧾 Create & Edit Post Dialog
- ✅ Controlled with `react-hook-form` + `Controller`
- ✅ Form validation (required fields)
- ✅ Category selection using MUI Select
- ✅ Title and content input
- ✅ Shared dialog for both Create and Edit (determined by `post` prop)
- ✅ Submit handler triggers callback with form data

### 💬 Comment System
- ✅ Inline comment input (desktop)
- ✅ Fullscreen dialog comment input (mobile)
- ✅ Form validation using `react-hook-form`
- ✅ Comment author avatar and metadata
- ✅ Auto refresh comment list after submission
- ✅ Thai-friendly `formatDistanceToNow` display (with timezone adjustment)

### ✏️ Edit/Delete Post Buttons
- ✅ Only visible if current user is the post author (`profile.id === post.author.id`)
- ✅ Buttons open edit dialog or trigger delete API

---

## 🧱 Stack Used

| Library/Tool          | Purpose                                               |
|-----------------------|-------------------------------------------------------|
| **Next.js**           | Frontend Framework (React-based, SSR support)         |
| **NestJS**            | Backend Framework (modular, scalable Node.js server) |
| **MUI**               | UI Component Library and Design System                |
| **Zustand**           | Lightweight State Management (for post/profile store) |
| **MySQL**             | Relational Database for persistent data               |
| **Redis**             | In-memory caching (used for performance/session)      |
| **React Hook Form**   | Form state management and validation                  |
| **date-fns**          | Date utility library for formatting and calculation   |
| **Lodash**            | Utility library (used for debounce, etc.)             |
