# RAMADAN — Engineering Office Platform / منصة مكتب رمضان الهندسي

موقع ثنائي اللغة (عربي/إنجليزي) لمكتب رمضان الهندسي، مع **لوحة تحكم متكاملة** لإدارة
المحتوى، ووضع **داكن/فاتح**. النظام مبني كـ:

- **Frontend:** React + Vite (مجلد `frontend/`)
- **Backend:** Laravel 13 + **MySQL**، واجهة API ومصادقة Sanctum (مجلد `backend/`)

A bilingual (Arabic/English) website for the RAMADAN engineering office, with a
full content **dashboard**, dark/light mode, a **React + Vite** front-end and a
**Laravel + MySQL** REST API backend.

---

## 🧱 البنية / Architecture

```
ramadan_website/
├── frontend/   ← React + Vite SPA (public site + /#/dashboard)
└── backend/    ← Laravel 13 REST API + MySQL + Sanctum auth
```

- الواجهة تقرأ المحتوى من `GET /api/content` وتعرضه ديناميكياً.
- لوحة التحكم تسجّل الدخول عبر `POST /api/login` (توكن Sanctum) وتعدّل المحتوى
  مباشرة في قاعدة البيانات عبر واجهات محمية.
- نموذج «تواصل معنا» يحفظ الرسائل في قاعدة البيانات وتظهر في تبويب **الرسائل**،
  مع زر واتساب مباشر.

---

## ✨ الميزات / Features

- 🌐 لغتان: العربية (RTL، الافتراضية) والإنجليزية (LTR)
- 🌗 وضع داكن وفاتح
- 🎨 هوية ألوان مستوحاة من اللوغو (ذهبي + فضي)
- 📄 صفحات: الرئيسية، من نحن، الخدمات، الأعمال (مع فلترة)، تواصل معنا
- 🛠️ لوحة تحكم كاملة: إعدادات الموقع، الهيرو، من نحن، التواصل، الأرقام، الخدمات،
  الأعمال، لماذا نحن، الرسائل، الحساب
- 🗄️ قاعدة بيانات MySQL مع API كامل واختبارات

---

## 🚀 التشغيل محلياً / Local development

### 1) Backend (Laravel + DB)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate

# اضبط قاعدة البيانات في .env (MySQL للإنتاج)، أو SQLite للتطوير السريع:
#   DB_CONNECTION=sqlite  ثم:  touch database/database.sqlite

# للتطوير المحلي اضبط APP_URL ليطابق عنوان السيرفر حتى تظهر روابط الصور المرفوعة:
#   APP_URL=http://127.0.0.1:8000

php artisan migrate --seed
php artisan storage:link     # مهم: لإتاحة الصور المرفوعة عبر /storage
php artisan serve            # http://127.0.0.1:8000
```

بيانات الدخول الافتراضية للوحة التحكم:

| | |
|---|---|
| البريد / Email | `admin@ramadan-eng.com` |
| كلمة المرور / Password | `ramadan2026` |

> غيّر كلمة المرور فوراً من تبويب **الحساب** داخل اللوحة بعد أول دخول.

### 2) Frontend (React)

```bash
cd frontend
npm install
cp .env.example .env          # اضبط VITE_API_URL إلى عنوان الـ API
npm run dev                   # http://localhost:5173
```

لوحة التحكم على: `http://localhost:5173/#/dashboard`

---

## 🧪 الاختبارات / Tests

```bash
cd backend
php artisan test              # يعمل على SQLite بالذاكرة
```

تغطّي الاختبارات: واجهة المحتوى العامة، المصادقة والصلاحيات، CRUD للأعمال
والخدمات والأقسام، رسائل التواصل، وتغيير كلمة المرور.

---

## 🌍 النشر / Deployment (cPanel أو أي استضافة PHP + MySQL)

> ⚠️ النظام ليس static — يحتاج استضافة تدعم **PHP 8.2+** و**MySQL**.
>
> 📘 **دليل مفصّل خطوة بخطوة لرفع كل شيء على استضافة cPanel واحدة (دومين واحد):
> راجع [`DEPLOYMENT.md`](DEPLOYMENT.md)** — Laravel يقدّم الواجهة والـ API معاً.
> (ملاحظة: GitHub Pages يصلح للواجهة فقط ولا يشغّل الـ backend.)

### Backend
1. ارفع مجلد `backend/` خارج `public_html` إن أمكن.
2. وجّه الدومين/الـ document root إلى `backend/public`.
3. أنشئ قاعدة MySQL من cPanel واضبط بياناتها في `.env`.
4. نفّذ:
   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan key:generate
   php artisan migrate --seed
   php artisan config:cache
   ```

### Frontend
1. اضبط `frontend/.env` → `VITE_API_URL=https://your-domain.com/api`
2. `npm run build` → ينتج `frontend/dist/`
3. ارفع محتويات `dist/` إلى مجلد الموقع الثابت (أو دومين فرعي للواجهة).

> راجع `backend/.env.example` لإعدادات MySQL، و`config/cors.php` لتقييد المصادر
> المسموح لها بالوصول إلى الـ API في الإنتاج. لا تنسَ `php artisan storage:link`
> على الاستضافة لإتاحة الصور المرفوعة، واضبط `APP_URL` على دومينك.

---

## 🏗️ بنية الكود (Clean Architecture)

الـ backend مبني بنمط طبقات واضح:

- **`app/Services/`** — منطق العمل: `ContentService`, `AuthService`, خدمة لكل قسم،
  و**`FileUploadService`** لرفع الصور بأمان (تحقق نوع/امتداد، أسماء عشوائية، منع
  المسارات الخبيثة)، و**`ApiResponseService`** للردود الموحّدة.
- **`app/Http/Requests/`** — التحقق من المدخلات (Form Requests) عبر `ApiFormRequest`.
- **`app/Http/Controllers/Api/`** — تحكّمات رفيعة تستدعي الخدمات فقط.

كل ردود الـ API بصيغة موحّدة:

```json
{ "status": "success", "message": "...", "data": { } }
```

## 📡 ملخص واجهات الـ API

| Method | Endpoint | الوصف | محمي؟ |
|---|---|---|---|
| GET | `/api/content` | كل محتوى الموقع | لا |
| POST | `/api/contact-messages` | إرسال رسالة تواصل | لا |
| POST | `/api/login` | تسجيل الدخول (توكن) | لا |
| POST | `/api/uploads` | رفع صورة وإرجاع رابطها | نعم |
| GET/PUT | `/api/settings` · `/api/hero` · `/api/about` · `/api/contact-settings` | الأقسام المفردة | نعم |
| CRUD | `/api/services` · `/api/projects` · `/api/stats` · `/api/why-us` | القوائم | نعم |
| GET/PUT/DELETE | `/api/contact-messages` | إدارة الرسائل | نعم |
| POST | `/api/change-password` | تغيير كلمة المرور | نعم |

## 🖼️ الصور

ارفع صور اللوغو/الهيرو/من نحن/الأعمال مباشرة من لوحة التحكم (زر «رفع صورة») —
تُخزَّن في `storage/app/public` وتُعرض عبر `/storage`. أو الصق رابط صورة خارجي.

## 🖼️ استبدال اللوغو

ضع شعارك في `frontend/public/logo.svg` (أو `logo.png` وحدّث المسار من لوحة التحكم
→ إعدادات الموقع → حقل Logo).
