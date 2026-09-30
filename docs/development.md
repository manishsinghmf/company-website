# Development Guide

## 1. Prerequisites

You need:

- Node.js
- npm
- Git
- Next.js project
- Strapi project

Frontend:

- Next.js 16.3.5
- TypeScript
- Tailwind CSS

CMS:

- Strapi 5
- SQLite for local development

## 2. Install

Clone the repository:

```bash
git clone <repository-url>
cd company-website
```

Install dependencies:

```bash
npm install
```

## 3. Environment

Create:

```text
.env.local
```

with:

```env
CMS_URL=http://localhost:1337
```

Keep `.env.example` synchronized with required variables.

Never commit `.env.local`.

Do not expose private CMS credentials through `NEXT_PUBLIC_*`.

## 4. Start Strapi

From the Strapi project:

```bash
npm install
npm run develop
```

Strapi:

```text
http://localhost:1337
```

Admin:

```text
http://localhost:1337/admin
```

## 5. Start Next.js

From the Next.js project:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## 6. Useful Commands

```bash
npm run dev
```

Start development server.

```bash
npm run lint
```

Run ESLint.

```bash
npm run build
```

Create a production build and verify compilation.

Keep this section synchronized with `package.json`.

## 7. Normal Development Workflow

```text
Start Strapi
     ↓
Verify CMS content
     ↓
Start Next.js
     ↓
Develop feature
     ↓
Verify browser behavior
     ↓
Run lint
     ↓
Run build
     ↓
Review diff
     ↓
Commit
     ↓
Push
     ↓
Pull Request
```

## 8. Working With Strapi Content

When a page depends on CMS content:

1. Open Strapi Admin.
2. Create/update content.
3. Publish it.
4. Verify the REST API response.
5. Open the corresponding Next.js route.
6. Verify rendering.
7. Check loading/error/empty behavior.

For a new CMS model:

```text
Strapi model
    ↓
publish sample content
    ↓
inspect API
    ↓
define TypeScript contract
    ↓
create CMS service
    ↓
integrate page
```

## 9. Feature Branch Workflow

Always start from the latest `develop`:

```bash
git switch develop
git pull origin develop
```

Create a feature branch:

```bash
git switch -c feat--feature-name
```

Examples:

```text
feat--contact-form
feat--blog-search
feat--accessibility
```

## 10. Verification Before Commit

Run:

```bash
npm run lint
npm run build
```

Then:

```bash
git status
git diff
```

Manually verify:

- normal state
- loading state
- empty state
- error state
- responsive behavior
- keyboard interaction where applicable
- CMS content
- images
- navigation

Do not commit accidental files, environment files, generated artifacts, or unrelated changes.

## 11. Commit

Use focused commit messages:

```bash
git commit -m "feat: add contact form"
```

Common prefixes:

```text
feat:
fix:
refactor:
docs:
test:
chore:
```

## 12. Push and Pull Request

Push:

```bash
git push -u origin feat--feature-name
```

Create:

```text
feature branch → develop
```

The PR should include:

- Summary
- Important implementation details
- Architecture impact where relevant
- Verification performed
- Known limitations

## 13. Merge Workflow

After merge:

```bash
git switch develop
git pull origin develop
git status
```

Only then create the next feature branch.

## 14. Component Guidelines

Use Server Components by default.

Add:

```tsx
'use client';
```

only when the component requires:

- state
- event handlers
- browser APIs
- interactive UI
- client-only behavior

Do not make a whole page client-side because one child component is interactive.

## 15. CMS Fetching Guidelines

Prefer:

```text
Page
 ↓
resource service
 ↓
cmsFetch
 ↓
Strapi
```

Avoid direct Strapi fetching inside UI components.

Do not create hooks merely to move server-side data fetching into another abstraction.

React Query/SWR should only be introduced for a real client-side server-state requirement.

## 16. TypeScript Guidelines

Avoid:

```typescript
any
```

for CMS data.

Prefer explicit contracts based on verified API responses.

If the Strapi DTO differs from the frontend model, use an explicit mapper instead of hiding the mismatch with unsafe casting.

## 17. UI State Guidelines

Treat these separately:

```text
Loading
Error
Empty
Not Found
Success
```

For example:

```text
loading.tsx
    ↓
data loaded
    ↓
empty OR populated

request failure
    ↓
error.tsx

resource doesn't exist
    ↓
notFound()
```

## 18. Image Guidelines

Use:

```text
getCmsUrl()
```

and `next/image` where appropriate.

Provide meaningful alt text.

Use responsive `sizes` values where rendered image size changes with the viewport.

Use high loading priority only for genuinely important above-the-fold images.

## 19. Responsive Development

Verify pages at:

```text
Mobile
Tablet
Desktop
```

Check:

- navigation
- grids
- typography
- images
- spacing
- buttons
- long content
- forms

## 20. Accessibility

When adding UI:

- use semantic HTML
- associate labels with form controls
- provide visible focus states
- ensure keyboard interaction works
- use ARIA only where necessary
- provide meaningful alt text
- maintain logical heading hierarchy
- distinguish error/success/informational states

## 21. Rendering Strategy

Use App Router concepts:

```text
Server Components
fetch caching
revalidation
generateStaticParams
generateMetadata
loading.tsx
error.tsx
notFound()
```

Do not use Pages Router APIs such as:

```text
getStaticProps
getServerSideProps
```

When changing caching behavior, verify actual runtime behavior.

## 22. CMS Debugging

Use this sequence:

```text
Is Strapi running?
        ↓
Is CMS_URL correct?
        ↓
Does the API endpoint work directly?
        ↓
Is content published?
        ↓
Is required media populated?
        ↓
Does cmsFetch receive the expected response?
        ↓
Does the TypeScript contract match?
        ↓
Does the resource service return expected data?
        ↓
Does the page render correctly?
```

Do not immediately change UI code when the underlying CMS response has not been verified.

## 23. Feature Completion

A feature is complete when:

```text
Implementation
    ↓
Browser verification
    ↓
Lint
    ↓
Build
    ↓
Diff review
    ↓
Commit
    ↓
Push
    ↓
Pull Request
    ↓
Review
    ↓
Merge
```

As automated tests and CI are added, they become part of this pipeline.

## 24. Engineering Rule

Before adding a change, ask:

```text
Does this solve a real requirement?
        ↓
Is this the simplest appropriate architecture?
        ↓
Does it preserve existing boundaries?
        ↓
Can it be tested?
        ↓
Can another engineer understand it?
```

The goal is intentional, explainable, maintainable engineering rather than adding technologies for their own sake.
