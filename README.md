# CloudVault Web

Web front-end for CloudVault, built with Next.js 16, React 19, Tailwind CSS 4 and shadcn/ui
(Base UI). It uses the FastAPI backend from the `cloud_vault` repository.

## Getting started

1. Start the API (`cloud_vault`) on http://127.0.0.1:8000.
2. Install the dependencies and create the local settings:

   ```bash
   npm install
   copy .env.example .env.local
   ```

   On Linux / macOS use `cp .env.example .env.local`.

3. Run the development server and open http://localhost:3000:

   ```bash
   npm run dev
   ```

| Setting                 | Description                                                               |
| ----------------------- | ------------------------------------------------------------------------- |
| `API_URL`               | FastAPI base URL. Only the Next.js server calls it, so no CORS is needed. |
| `REFRESH_TOKEN_MAX_AGE` | Refresh cookie lifetime in seconds; keep it equal to the API setting.     |
| `COOKIE_SECURE`         | Send cookies over HTTPS only. Defaults to `true` in production builds.    |

Useful scripts: `npm run lint`, `npm run typecheck`, `npm run format`, `npm run build`.

To run the production build so it can be opened from other devices on the network, see
[docs/deployment.md](docs/deployment.md).

## Project structure

```
app/
  (auth)/           login and register pages (guests only)
  (app)/            pages for signed-in users: home, buckets, bucket details
  error.tsx         error page with a Try again button
components/
  ui/               shadcn components
  form/             FormField and the fields built on it (text, textarea, checkbox),
                    SubmitButton, FormAlert
  app/              application shell: sidebar, mobile menu, header, navigation links
  page-header.tsx, empty-state.tsx, detail-grid.tsx, confirm-dialog.tsx, ...
features/
  auth/
    actions.ts      Server Actions: login, register, logout
    schemas.ts      zod validation, same rules as the API
    types.ts        User, SessionTokens
    server/         server-only code: API calls, cookies, session, refresh,
                    apiRequestAsUser for protected endpoints
    ui/             AuthCard, LoginForm, RegisterForm, UserMenu
  buckets/
    actions.ts      Server Actions: create, update, delete
    schemas.ts      zod validation, same rules as the API
    server/         bucketsApi (/api/buckets) and the page queries
    ui/             BucketsTable, BucketForm and its dialog, delete dialog, badges
lib/
  api/              server-side API client and ApiError
  config.ts         server settings from the environment
  routes.ts         route paths and safe redirects
  forms.ts          FormState and form helpers shared by all Server Actions
  format.ts         size and date formatting
proxy.ts            session refresh and redirects before every page
```

Each feature keeps its server code in `server/` (marked `server-only`, so it can never be bundled
for the browser) and its components in `ui/`. Pages only compose feature components.

## Authentication

The app follows the backend-for-frontend pattern: the browser never sees the tokens.

1. **Login / register.** The forms post to Server Actions. The action validates the input with
   zod, calls `/api/auth/login` (or `/register` followed by `/login`) from the Next.js server and
   stores both tokens in cookies:
   - `cv_access_token`: the JWT, expires 30 seconds before the token itself;
   - `cv_refresh_token`: valid for `REFRESH_TOKEN_MAX_AGE`.

   Both cookies are `HttpOnly` (JavaScript cannot read them), `SameSite=Lax` and `Secure` in
   production.

2. **Requests.** Server Components read the access token with `getAccessToken()` and send it to
   the API as a Bearer token. `getCurrentUser()` calls `/api/auth/me` once per request.
3. **Refresh.** When the access cookie has expired, `proxy.ts` calls `/api/auth/refresh` with the
   refresh token, sets the new cookies on the response and passes them to the page in the same
   request. The API rotates refresh tokens and revokes every session when an old one is reused,
   so parallel requests with the same refresh token share a single refresh call.
4. **Protection.** The proxy redirects visitors without a session to `/login?next=<page>` and
   signed-in users away from `/login` and `/register`. Pages also check the session with
   `requireUser()`. The `next` parameter only accepts paths on this site.
5. **Logout.** The action revokes the refresh token in the API and deletes both cookies.

## Buckets

- `/buckets` lists the buckets the user owns or is a member of. **New bucket** opens a dialog;
  the shared flag can only be chosen when creating, as in the API.
- Each row has a menu with Open, Edit and Delete. Only the owner sees Edit and Delete.
- `/buckets/<id>` shows the bucket's access, size, owner, members and dates. A bucket that does
  not exist or is not accessible shows a not-found message.
- Business rules (duplicate names, the shared bucket limit of the tier, ownership) stay in the
  API. The forms show its messages, e.g. "The 'free' tier does not allow shared buckets."
- After a change, the actions call `revalidatePath`, so the list and the details page show the
  new data without a reload.
