# CMS Guide

## 1. CMS Role

Strapi is the content and editorial backend for the website.

```text
Strapi
  ↓
REST API
  ↓
Next.js CMS service
  ↓
Server Component
  ↓
UI
```

## 2. Development Setup

The project uses:

- Strapi 5
- SQLite for local development
- `http://localhost:1337`

Admin:

```text
http://localhost:1337/admin
```

Start Strapi:

```bash
npm install
npm run develop
```

## 3. Site Settings

**Type:** Single Type

**API ID:**

```text
site-setting
```

**Endpoint:**

```text
/api/site-setting
```

Fields:

- `companyName`
- `logo`
- `footerText`
- `mission`
- `vision`

Site Settings provide global company content.

Conceptual response:

```json
{
  "data": {
    "companyName": "VimaTech",
    "footerText": "Building technology for modern businesses.",
    "vision": "To make technology simpler and more accessible.",
    "mission": "We build reliable digital solutions for modern businesses."
  },
  "meta": {}
}
```

## 4. Services

**Type:** Collection Type

Endpoint:

```text
/api/services
```

With image population:

```text
/api/services?populate=image
```

Fields:

| Field | Type | Required |
|---|---|---|
| `title` | Short Text | Yes |
| `description` | Long Text | Yes |
| `price` | Decimal | Yes |
| `image` | Media, single image | Yes |

Flow:

```text
ServicesPage
  ↓
getServices()
  ↓
cmsFetch()
  ↓
Strapi
```

## 5. Team Members

**Type:** Collection Type

The assignment requires:

- name
- photo
- designation/role
- short bio

The Team page consumes this collection through:

```text
getTeamMembers()
```

and renders members with:

```text
components/team/TeamCard.tsx
```

The actual media population/query should remain aligned with the verified Strapi API response.

## 6. Blog Posts

**Type:** Collection Type

Blog posts support:

- title
- slug
- excerpt
- published date
- cover image
- Rich Text content

Routes:

```text
/blog
/blog/[slug]
```

Flow:

```text
BlogPage
  ↓
getBlogPosts()
  ↓
cmsFetch()
  ↓
Strapi
```

Detail:

```text
BlogDetailPage
  ↓
getBlogPostBySlug(slug)
  ↓
cmsFetch()
  ↓
Strapi
```

## 7. Blog Slugs

The slug identifies the dynamic route:

```text
/blog/[slug]
```

Known slugs are used by `generateStaticParams()`.

If a slug does not resolve:

```text
getBlogPostBySlug()
       ↓
notFound()
       ↓
not-found.tsx
```

A missing resource is therefore treated as a 404 rather than a generic application error.

## 8. Blog Rich Text

Strapi Rich Text is structured data:

```text
Strapi blocks
    ↓
BlogContent
    ↓
React elements
```

The current renderer supports paragraph blocks and inline formatting such as:

- bold
- italic
- underline
- strikethrough

Unsupported block types are not silently converted into paragraphs.

Potential future extensions include:

- headings
- lists
- links
- quotes
- code blocks

These should be implemented from verified Strapi block contracts.

## 9. Media

The frontend uses:

```text
getCmsUrl()
```

to construct media URLs.

Then:

```text
Strapi media
     ↓
getCmsUrl()
     ↓
next/image
```

Images should have meaningful alternative text.

## 10. CMS Service Layer

Resource access belongs under:

```text
lib/cms/
```

Current resources:

```text
lib/cms/
├── client.ts
├── site.ts
├── services.ts
├── team.ts
└── blog.ts
```

Generic infrastructure:

```text
cmsFetch()
```

Resource-specific functions:

```text
getSiteSettings()
getServices()
getTeamMembers()
getBlogPosts()
getBlogPostBySlug()
```

## 11. Type Contracts

Contracts live under:

```text
types/
```

Important distinction:

Single Type:

```json
{
  "data": {}
}
```

Collection Type:

```json
{
  "data": [],
  "meta": {}
}
```

Do not model a Collection Type as a Single Type response.

## 12. Publishing Content

When adding or changing CMS content:

1. Open Strapi Admin.
2. Create/update content.
3. Save.
4. Publish.
5. Verify the REST API response.
6. Refresh/revalidate the Next.js page as appropriate.

If content is missing, check:

- publication status
- endpoint
- query parameters
- media population
- CMS URL
- caching/revalidation

## 13. Adding a New CMS Resource

Follow:

```text
Create Strapi model
      ↓
Add sample content
      ↓
Publish
      ↓
Inspect actual API
      ↓
Create TypeScript contract
      ↓
Create lib/cms/<resource>.ts
      ↓
Create/reuse UI component
      ↓
Consume from Server Component
```

Do not define the contract from an assumed response.

## 14. CMS Content vs Presentation

CMS should contain business/editorial content:

- service title
- service description
- blog title
- blog excerpt
- team bio

Next.js should own presentation:

- grid columns
- spacing
- responsive breakpoints
- typography
- card layout
- hover behavior

Do not put Tailwind classes or layout configuration into Strapi unless there is a genuine editorial requirement.

## 15. Contact Messages

The Contact page UI exists, but submission persistence is not yet implemented.

Potential flow:

```text
Contact Form
   ↓
Server Action / Route Handler
   ↓
Zod validation
   ↓
Contact Message destination
```

A Contact Message Collection Type should only be introduced if the chosen architecture requires CMS persistence.

## 16. CMS Security

Before production, review:

- Strapi API permissions
- public read/write permissions
- admin authentication
- API tokens
- CORS
- environment variables
- media access
- Contact submission abuse protection

Never expose private CMS credentials to the browser.

## 17. Troubleshooting

### CMS connection failure

Check:

```text
CMS_URL
Strapi running
Strapi port
network connectivity
```

### Missing media

Check that the request populates the required media relationship.

### Content not appearing

Check:

```text
published status
API response
endpoint
cache/revalidation
```

### Type mismatch

Do not immediately use `any`.

Instead:

```text
actual API response
       ↓
identify mismatch
       ↓
update contract or mapper
```
