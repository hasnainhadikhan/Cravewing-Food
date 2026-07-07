# CraveWing — Laravel API Backend

Laravel 13 + Sanctum API for the CraveWing frontend. Stores every form submission in a MySQL database (manageable via **phpMyAdmin**).

---

## 1. Requirements
- PHP 8.2+ (project built on 8.3)
- Composer
- MySQL running (XAMPP / Laragon / WAMP — the same server phpMyAdmin uses)

## 2. Database (phpMyAdmin)
The migrations expect a database named **`cravewing`**.

- Open **phpMyAdmin** → **New** → create a database called `cravewing` (collation `utf8mb4_unicode_ci`).
- If your MySQL uses a password, set it in `backend/.env`:
  ```env
  DB_DATABASE=cravewing
  DB_USERNAME=root
  DB_PASSWORD=your_password_here
  ```
  (Default XAMPP is user `root` with an empty password — already configured.)

## 3. Install & run
```bash
cd backend
composer install          # if vendor/ is missing
php artisan migrate       # creates all tables in the cravewing DB
php artisan serve         # API runs at http://localhost:8000
```

Keep this running while you use the site. Start the frontend in another terminal:
```bash
cd frontend
npm run dev               # http://localhost:5173
```

The frontend talks to the API via `frontend/.env` → `VITE_API_URL=http://localhost:8000/api`.

---

## 4. What gets saved (tables ↔ frontend forms)

| Table | Frontend form | Endpoint |
|-------|---------------|----------|
| `users` | Login / Signup (AuthPage) | `POST /api/register`, `POST /api/login` |
| `contacts` | Get in Touch (Home) | `POST /api/contact` |
| `catering_requests` | Request a Quote (Catering) | `POST /api/catering` |
| `job_applications` | Careers → Apply Now | `POST /api/careers/apply` |
| `subscribers` | Footer newsletter | `POST /api/subscribe` |
| `orders` + `order_items` | Checkout → Pay Now | `POST /api/orders` |

Auth-protected: `GET /api/me`, `POST /api/logout` (send `Authorization: Bearer <token>`).
Order tracking: `GET /api/orders/{reference}`.

View any submitted data live in **phpMyAdmin** → `cravewing` → pick a table → **Browse**.

---

## 5. Quick test (optional)
```bash
curl -X POST http://localhost:8000/api/contact \
  -H "Content-Type: application/json" -H "Accept: application/json" \
  -d '{"name":"Test","email":"t@x.com","message":"hello"}'
```
A `201` with a JSON body means it saved — refresh the `contacts` table in phpMyAdmin to see the row.

---

## 6. Notes
- All endpoints validate input and return Laravel's standard `422` JSON with field errors, which the frontend displays.
- Auth uses Sanctum **personal access tokens** (returned as `token` on register/login); the frontend stores it in `localStorage` and sends it as a Bearer header.
- CORS is configured in `config/cors.php` to allow the Vite dev server (`5173`/`5174`). Add your production domain there before deploying.
