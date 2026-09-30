# Architecture

## 1. High-Level Architecture

The application uses **Next.js as the frontend/presentation layer** and **Strapi as the Headless CMS/content layer**.

```text
Browser
   ↓
Next.js
   ↓
Server Components
   ↓
Resource-specific CMS service
   ↓
cmsFetch()
   ↓
Strapi REST API
   ↓
SQLite / Strapi Media
```

The primary architectural rule is:

> **Strapi owns content/data. Next.js owns presentation/rendering/behavior.**

## 2. Responsibilities

### Strapi

Strapi owns:

- CMS administration
- Content modeling
- Content creation and publishing
- Content APIs
- Media/content storage
- Editorial control

Current content includes:

- Site Settings
- Services
- Team Members
- Blog Posts

### Next.js

Next.js owns:

- Routing
- Rendering
- Layout
- Responsive presentation
- Server Components
- Client-side interaction where required
- Loading UI
- Error UI
- Not-found UI
- SEO metadata
- Image presentation/optimization

## 3. Data Flow

CMS access follows:

```text
Page
  ↓
Resource-specific CMS service
  ↓
cmsFetch()
  ↓
Strapi REST API
```

Examples:

```text
ServicesPage → getServices() → cmsFetch() → Strapi
TeamPage     → getTeamMembers() → cmsFetch() → Strapi
BlogPage     → getBlogPosts() → cmsFetch() → Strapi
BlogDetail   → getBlogPostBySlug() → cmsFetch() → Strapi
```

This keeps Strapi-specific API access out of presentation components.

## 4. CMS Client Boundary

`lib/cms/client.ts` contains generic CMS communication infrastructure.

It should not contain resource-specific functions such as:

```text
getServices()
getBlogPosts()
getTeamMembers()
```

Those belong in their respective resource files.

```text
lib/cms/
├── client.ts
├── site.ts
├── services.ts
├── team.ts
└── blog.ts
```

## 5. TypeScript Contract Boundary

CMS contracts live under:

```text
types/
├── site.ts
├── service.ts
├── team.ts
└── blog.ts
```

The intended flow is:

```text
Strapi response
      ↓
TypeScript contract
      ↓
CMS service
      ↓
Page/component
```

Types should be based on verified Strapi responses. The project avoids `any` for CMS data.

If an external Strapi DTO and frontend model eventually differ, the transformation should be explicit.

## 6. Server vs Client Components

The default rule is:

> **Use Server Components unless browser interactivity requires a Client Component.**

Most pages are Server Components:

- Home
- About
- Services
- Team
- Blog
- Blog detail

Client Components are used for genuine browser behavior, such as:

- Mobile navigation
- Error boundaries using `reset()`

Do not make an entire page a Client Component merely because one child component is interactive.

## 7. Global Layout Boundary

The shared `SiteShell` owns the page-level `<main>` landmark:

```text
SiteShell
├── Sidebar
├── Header
├── main
└── Footer
```

Individual pages should therefore return page content without another page-level `<main>`.

## 8. Route-Level States

```text
loading.tsx  → loading state
error.tsx    → runtime/data-fetching error
notFound()   → missing resource
```

These represent different system conditions and should not be treated as interchangeable.

## 9. Blog Detail

The dynamic route is:

```text
/blog/[slug]
```

Flow:

```text
/blog/my-post
       ↓
getBlogPostBySlug("my-post")
       ↓
post exists?
   ├── yes → render article
   └── no  → notFound()
                    ↓
              not-found.tsx
```

The route also uses:

- `generateStaticParams()`
- `generateMetadata()`
- `notFound()`
- caching/revalidation

## 10. Rendering and Caching

The project uses App Router concepts:

- Server Components
- fetch caching
- revalidation
- `generateStaticParams()`
- `loading.tsx`
- `error.tsx`
- `notFound()`
- `generateMetadata()`

Intended strategy:

```text
Home       → cached/static CMS content
About      → cached/static CMS content
Services   → cached/static CMS content
Blog       → CMS-driven listing with caching/revalidation
Blog detail→ dynamic route with ISR/revalidation
Contact    → interactive form submission
```

Actual caching behavior should be verified against the implementation rather than inferred only from route names.

## 11. Why React Query/SWR Is Not Used

Most CMS data is requested on the server and rendered through Server Components.

React Query/SWR should only be introduced if a genuine client-side server-state requirement appears, such as:

- client-driven updates
- background refetching
- optimistic mutations
- complex client-side cache synchronization

## 12. Image Architecture

```text
Strapi media
     ↓
getCmsUrl()
     ↓
next/image
```

Strapi owns the media asset. Next.js controls presentation and optimization.

## 13. Architecture Principles

- Keep CMS access out of UI components.
- Keep server-only concerns server-side.
- Do not expose private CMS credentials through `NEXT_PUBLIC_*`.
- Do not over-abstract.
- Do not guess external API contracts.
- Keep Strapi responsible for content/data and Next.js responsible for presentation/rendering/behavior.
