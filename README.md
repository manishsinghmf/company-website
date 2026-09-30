# VimaTech Company Website

A production-oriented company website built with **Next.js 16** and **Strapi 5** as a Headless CMS.

The project is being developed as both a company-website assignment and an engineering training project. The focus is not only on making the application work, but also on learning and applying production-oriented architecture, TypeScript contracts, rendering strategies, accessibility, performance, testing, Git workflow, and maintainability.

---

## Documentation

Detailed project documentation:

- [Architecture](docs/architecture.md) — application architecture and design decisions
- [CMS Guide](docs/cms.md) — Strapi models, content management, and CMS integration
- [Development Guide](docs/development.md) — local setup, development workflow, and Git conventions

## Tech Stack

### Frontend

- Next.js 16.3.5
- React
- TypeScript
- App Router
- Tailwind CSS
- ESLint
- Prettier

### CMS

- Strapi 5
- SQLite for local development
- Strapi REST API

### Development Architecture

```text
Browser
   ↓
Next.js
   ↓
Server Components
   ↓
Resource-specific CMS service
   ↓
Generic cmsFetch()
   ↓
Strapi REST API
   ↓
SQLite / Strapi Media
```

The core architectural rule is:

> **Strapi owns content/data. Next.js owns presentation/rendering/behavior.**

---

# Project Goals

The application is designed to demonstrate:

- Next.js App Router
- Server Components
- Client Components where browser interactivity is required
- Static/cached CMS-driven pages
- ISR/revalidation
- Dynamic routing
- Dynamic metadata
- Strapi content modeling
- REST API integration
- TypeScript API contracts
- Loading states
- Error boundaries
- Not-found handling
- Responsive UI
- Accessibility
- Reusable components
- Production-oriented Git workflow

---

# Project Structure

The Next.js application does not use a `src/` directory.

The main structure is:

```text
company-website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── about/
│   │   ├── page.tsx
│   │   └── ...
│   ├── services/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── team/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   └── error.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── blog/
│   ├── layout/
│   ├── services/
│   └── team/
│
├── lib/
│   └── cms/
│       ├── client.ts
│       ├── site.ts
│       ├── services.ts
│       ├── team.ts
│       └── blog.ts
│
├── types/
│   ├── site.ts
│   ├── service.ts
│   ├── team.ts
│   └── blog.ts
│
├── public/
├── .env.example
├── .env.local
├── package.json
└── ...
```

The exact component structure may evolve as the project grows, but CMS communication remains separated under `lib/cms` and TypeScript contracts remain under `types`.

---

# Environment Configuration

Create `.env.local`:

```env
CMS_URL=http://localhost:1337
```

`.env.example` is maintained so that required configuration is documented without committing local secrets.

The CMS URL is intentionally server-side.

Do not expose private CMS credentials through `NEXT_PUBLIC_*` environment variables.

---

# Running the Project

## 1. Start Strapi

From the Strapi project:

```bash
npm install
npm run develop
```

Strapi should be available at:

```text
http://localhost:1337
```

The Strapi administration panel is available at:

```text
http://localhost:1337/admin
```

## 2. Start Next.js

From the Next.js project:

```bash
npm install
npm run dev
```

The frontend should be available at:

```text
http://localhost:3000
```

---

# Strapi Content Models

## Site Settings

A Strapi Single Type.

API ID:

```text
site-setting
```

Endpoint:

```text
/api/site-setting
```

Fields:

- `companyName`
- `logo`
- `footerText`
- `mission`
- `vision`

Site Settings are used for global company content such as company information, mission, vision, and footer content.

---

## Services

A Strapi Collection Type.

Fields:

- `title` — Short Text — required
- `description` — Long Text — required
- `price` — Decimal — required
- `image` — Media — single image — required

Endpoint:

```text
/api/services
```

With image population:

```text
/api/services?populate=image
```

---

## Team Members

A Strapi Collection Type used by the Team/About experience.

The Team data is consumed through the Next.js Team CMS service and rendered using reusable `TeamCard` components.

The model contains the team member information required by the assignment:

- name
- photo
- role/designation
- short bio

---

## Blog Posts

A Strapi Collection Type.

Blog posts support:

- title
- slug
- excerpt
- published date
- cover image
- Rich Text content

The blog list is available at:

```text
/blog
```

Individual posts use:

```text
/blog/[slug]
```

---

## Contact Messages

Contact message persistence has not yet been implemented.

The Contact page UI is implemented, but the actual submission architecture is still a planned feature.

The project will decide between a Next.js Server Action and Route Handler based on the final submission requirements.

---

# CMS Integration Architecture

CMS access follows a strict separation of responsibilities.

```text
Page
  ↓
Resource-specific CMS service
  ↓
cmsFetch()
  ↓
Strapi
```

For example:

```text
ServicesPage
  ↓
getServices()
  ↓
cmsFetch()
  ↓
Strapi
```

Blog:

```text
BlogPage
  ↓
getBlogPosts()
  ↓
cmsFetch()
  ↓
Strapi
```

Blog detail:

```text
BlogDetailPage
  ↓
getBlogPostBySlug()
  ↓
cmsFetch()
  ↓
Strapi
```

Team:

```text
TeamPage
  ↓
getTeamMembers()
  ↓
cmsFetch()
  ↓
Strapi
```

The generic CMS client should contain generic HTTP/CMS infrastructure only.

Resource-specific functions belong in their own files.

---

# Generic CMS Client

The application uses a shared `cmsFetch()` abstraction.

Conceptually:

```text
cmsFetch(endpoint)
    ↓
CMS_URL + endpoint
    ↓
fetch()
    ↓
validate response
    ↓
return typed JSON
```

This prevents individual pages and components from duplicating Strapi URL and HTTP handling.

---

# TypeScript Contracts

Types are defined from the actual Strapi API response rather than guessed.

For example:

```text
types/
├── site.ts
├── service.ts
├── team.ts
└── blog.ts
```

The project avoids `any` for CMS data.

The intended boundary is:

```text
Strapi response
      ↓
TypeScript contract
      ↓
CMS service
      ↓
Page/component
```

If the API DTO and UI/domain model eventually need to differ, the transformation should be explicit rather than hidden.

---

# Rendering Strategy

The project uses the Next.js App Router rather than Pages Router APIs.

We do not use:

- `getStaticProps`
- `getServerSideProps`

Instead, the application uses modern App Router concepts:

- Server Components
- fetch caching
- revalidation
- `generateStaticParams`
- `loading.tsx`
- `error.tsx`
- `notFound()`
- `generateMetadata()`

## Home

CMS-driven content is rendered using Server Components and cached/revalidated CMS access.

## About

CMS-driven mission, vision, and team content are rendered server-side.

## Services

Services are fetched server-side and rendered as a responsive CMS-driven grid.

## Blog

The Blog listing is CMS-driven.

## Blog Detail

The dynamic route:

```text
/blog/[slug]
```

uses:

- `generateStaticParams()`
- `generateMetadata()`
- `notFound()`
- CMS revalidation/ISR strategy

The exact caching/revalidation behavior should be verified against the current Next.js configuration rather than assumed from the route name alone.

## Contact

The Contact page will use an appropriate server/client submission boundary once submission handling is implemented.

---

# Server Components vs Client Components

The default rule is:

> **Use Server Components unless browser interactivity requires a Client Component.**

Most pages remain Server Components.

For example:

```text
BlogPage
TeamPage
ServicesPage
BlogDetailPage
```

do not need:

```text
'use client'
```

because they primarily fetch and render data.

Error boundaries are Client Components because they use interactive behavior such as:

```tsx
onClick={reset}
```

The mobile navigation is also a Client Component because it requires browser state and interaction.

---

# Global Layout

The application uses a shared shell:

```text
SiteShell
├── Sidebar
├── Header
├── main
└── Footer
```

The global `SiteShell` owns the page-level `<main>` landmark.

Individual pages therefore should not introduce another page-level `<main>`.

This avoids nested main landmarks and keeps the document structure semantically correct.

---

# Responsive Design

The UI is built using Tailwind CSS and is designed around responsive layouts.

Implemented patterns include:

- responsive sidebar/navigation
- mobile navigation
- responsive service grid
- responsive team grid
- responsive blog grid
- responsive article layout
- responsive typography
- responsive image sizing
- loading skeletons

---

# Image Handling

CMS images are served through Strapi.

A CMS URL helper is used to convert Strapi media paths into usable frontend URLs.

Next.js `Image` is used where appropriate:

```tsx
<Image
  src={getCmsUrl(image.url)}
  alt={image.alternativeText ?? fallback}
  ...
/>
```

Responsive `sizes` values are provided for responsive images where appropriate.

The goal is to keep CMS content ownership in Strapi while letting Next.js control image presentation and optimization.

---

# Blog Rich Text

Blog content comes from Strapi as structured Rich Text blocks.

The frontend renders the structured content through:

```text
components/blog/BlogContent.tsx
```

The current renderer supports paragraph blocks and inline formatting such as:

- bold
- italic
- underline
- strikethrough

The renderer intentionally does not silently render unsupported block types.

A future improvement is to expand the renderer to support additional Strapi Rich Text structures such as:

- headings
- lists
- links
- quotes
- code blocks

This should be done based on the actual Strapi response contract.

---

# Loading and Error Handling

Route-level loading and error UI is implemented where appropriate.

Example:

```text
services/
├── page.tsx
├── loading.tsx
└── error.tsx
```

Blog:

```text
blog/
├── page.tsx
├── loading.tsx
├── error.tsx
└── [slug]/
    ├── page.tsx
    ├── loading.tsx
    ├── error.tsx
    └── not-found.tsx
```

The application distinguishes between:

### Loading

The request/rendering work has not completed yet.

```text
loading.tsx
```

### Runtime Error

The CMS request or rendering process fails.

```text
error.tsx
```

### Not Found

The requested resource does not exist.

```text
notFound()
    ↓
not-found.tsx
```

These are intentionally different states.

---

# SEO and Metadata

Blog detail pages use:

```text
generateMetadata()
```

Metadata is generated from the CMS post.

The blog post metadata includes:

- title
- description
- Open Graph title
- Open Graph description
- Open Graph image

The metadata is therefore derived from the actual CMS content rather than hardcoded per post.

---

# Accessibility

Accessibility is treated as part of the implementation rather than a final styling step.

Current practices include:

- semantic HTML
- associated labels and inputs
- keyboard focus styles
- accessible navigation attributes
- `aria-expanded`
- `aria-controls`
- Escape handling for mobile navigation
- focus return when the mobile menu closes
- meaningful image alt text
- semantic `<time>` for publication dates
- accessible buttons and links

A remaining accessibility improvement is a complete focus trap for the mobile navigation plus automated accessibility testing.

---

# Git Workflow

Every feature follows the same workflow.

```text
develop
   ↓
feature branch
   ↓
implementation
   ↓
verification
   ↓
lint
   ↓
build
   ↓
commit
   ↓
push
   ↓
Pull Request
   ↓
review
   ↓
merge into develop
   ↓
update develop
   ↓
next feature branch
```

Example:

```bash
git switch develop
git pull origin develop

git switch -c feat--example-feature
```

After implementation:

```bash
npm run lint
npm run build

git status
git diff
```

Then:

```bash
git add .
git commit -m "feat: implement example feature"
git push -u origin feat--example-feature
```

Create a PR:

```text
feat--example-feature → develop
```

After merging:

```bash
git switch develop
git pull origin develop
```

The next feature starts from the updated `develop`.

---

# Current Feature History

Completed feature branches include:

```text
feat--strapi-integration
feat--blog-integration
feat--responsive-ui
feat--about-page
feat--services-page
feat--contact-page
feat--blog-team-pages
```

Features are merged into `develop` through Pull Requests.

---

# Current Implementation Status

## Completed

### Foundation

- Next.js project setup
- App Router
- TypeScript
- Tailwind CSS
- ESLint
- Prettier
- Git/GitHub workflow
- basic routing
- shared layout
- responsive navigation

### CMS

- Strapi 5 setup
- Site Settings Single Type
- Services Collection Type
- Team Members Collection Type
- Blog Posts Collection Type
- verified CMS API responses
- generic `cmsFetch()`
- resource-specific CMS services
- explicit TypeScript contracts
- CMS image URL handling

### Pages

- Home
- About
- Services
- Team
- Blog
- Blog detail
- Contact UI

### Blog

- Blog listing
- Blog cards
- dynamic `/blog/[slug]`
- `generateStaticParams()`
- `generateMetadata()`
- `notFound()`
- loading state
- error state
- Rich Text rendering
- responsive article layout
- CMS cover images
- demo blog content

### UI

- responsive layout
- reusable cards
- responsive grids
- skeleton loading states
- empty states
- error states
- semantic HTML
- focus states
- responsive article presentation
- optimized CMS images with `next/image`

---

# Remaining Work

## High Priority

### 1. Contact form submission

Implement:

- form submission
- server-side validation
- Zod validation
- Server Action vs Route Handler decision
- success state
- validation errors
- server errors
- submission destination

Potential future CMS model:

```text
Contact Message
├── name
├── email
└── message
```

The Contact Messages model is optional according to the original assignment and should only be introduced if the final architecture requires CMS persistence.

---

### 2. Testing

Add a frontend test strategy.

Potential areas:

- CMS client
- CMS resource services
- BlogContent
- BlogCard
- ServiceCard
- TeamCard
- critical UI states
- Contact form validation

Add end-to-end coverage for important user journeys using a suitable browser testing framework.

---

### 3. CI/CD

Add CI to the repository.

Expected PR checks:

```text
Install
  ↓
Lint
  ↓
Typecheck
  ↓
Tests
  ↓
Build
```

The goal is to prevent broken code from being merged into `develop`.

---

### 4. Accessibility audit

Complete:

- mobile menu focus trap
- keyboard navigation audit
- error announcement review
- form error semantics
- automated accessibility testing

---

### 5. Security review

Review:

- Strapi public permissions
- CMS credentials
- environment variables
- CORS
- Contact form abuse protection
- server-side validation
- request rate limiting where required
- production Strapi administration security

---

### 6. Performance review

Measure and review:

- Core Web Vitals
- image loading
- CMS request caching
- revalidation strategy
- unnecessary client JavaScript
- bundle size
- duplicate CMS requests
- font loading

---

### 7. Documentation

Keep this README synchronized with:

- actual folder structure
- actual environment variables
- actual CMS models
- actual routes
- actual scripts
- deployment instructions

Documentation should describe implemented behavior rather than planned architecture as if it already exists.

---

# Engineering Principles

## 1. Strapi owns content

Content that needs editorial/business control belongs in Strapi.

Examples:

- company information
- services
- team members
- blog posts

## 2. Next.js owns presentation

Next.js owns:

- layout
- responsive behavior
- rendering
- navigation
- loading UI
- error UI
- client-side interaction

## 3. Server Components by default

Do not add:

```tsx
'use client';
```

unless the component actually requires client-side behavior.

## 4. Do not fetch CMS data directly from UI components

Prefer:

```text
Page
 ↓
CMS service
 ↓
cmsFetch
 ↓
Strapi
```

rather than:

```text
Component
 ↓
fetch(Strapi)
```

## 5. Do not over-abstract

Do not introduce:

- Redux
- React Query
- SWR
- additional API layers
- unnecessary CMS models

unless the application has a concrete requirement for them.

## 6. Do not guess external API contracts

Inspect the actual Strapi response before defining TypeScript types.

## 7. Treat loading, error, empty, and not-found as different states

They represent different system conditions and should have different user experiences.

## 8. Verify before merging

Every feature should pass:

```bash
npm run lint
npm run build
```

and be manually verified in the browser before the PR is merged.

---

# Assignment Requirements

The original assignment requires:

- Home page
- About page
- Services page
- Blog page
- Blog detail page
- Contact page
- Strapi integration
- CMS content modeling
- App Router
- TypeScript
- Tailwind CSS
- static/cached rendering
- ISR/revalidation
- dynamic routing
- loading states
- error handling

Bonus requirements include:

- dark mode
- client-side blog search
- `/team/[id]`
- Vercel deployment
- hosted CMS

Bonus features should only be added after the core production requirements are complete.

---

# Production Readiness Roadmap

The intended final progression is:

```text
Feature completion
      ↓
Testing
      ↓
Accessibility
      ↓
Security
      ↓
Performance
      ↓
CI/CD
      ↓
Deployment
      ↓
Documentation review
      ↓
Final engineering review
```

The goal is not simply to complete the assignment.

The goal is to finish with an application whose architecture, code quality, operational practices, and development workflow can be explained and defended in a technical interview.
