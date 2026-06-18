# دليل رفع موقع RAMADAN على استضافة cPanel (دومين واحد)

هذا الدليل يشرح رفع الموقع كاملاً (الواجهة + الـ backend + قاعدة البيانات) على
**استضافة cPanel واحدة** بدومين واحد. يقدّم Laravel الواجهة (React) والـ API معاً،
فلا توجد مشاكل CORS ولا حاجة لساب‑دومين.

> **المتطلبات من الاستضافة:** PHP **8.2+** و **MySQL** و **Composer** (أو إمكانية
> رفع مجلد vendor)، وإمكانية تغيير «جذر الموقع» (Document Root) أو استخدام
> "Setup Node/PHP App". معظم خطط cPanel المدفوعة تدعم ذلك.

---

## الخطوة 1 — بناء الواجهة على جهازك

```bash
cd frontend
npm install
npm run build
```

سينتج مجلد `frontend/dist/`. (البناء يستخدم تلقائياً `VITE_API_URL=/api` من ملف
`.env.production`، أي أن الواجهة ستنادي الـ API على نفس الدومين.)

---

## الخطوة 2 — رفع ملفات الـ backend

1. اضغط مجلد `backend/` وارفعه إلى الاستضافة، مثلاً إلى `/home/USER/ramadan`
   (**خارج** `public_html` للأمان).
2. فك الضغط.
3. ثبّت الحزم: من **Terminal** في cPanel:
   ```bash
   cd ~/ramadan
   composer install --no-dev --optimize-autoloader
   ```
   > إن لم يتوفر Composer على الاستضافة، شغّل `composer install` على جهازك ثم ارفع
   > مجلد `vendor/` ضمن الرفع.

---

## الخطوة 3 — جذر الموقع (Document Root)

اجعل الدومين يشير إلى مجلد **`~/ramadan/public`**:

- من cPanel: **Domains → اختر الدومين → Document Root** = `ramadan/public`.
- أو إن كان الدومين الرئيسي يستخدم `public_html`، يمكنك بدلاً من ذلك وضع محتويات
  `public/` داخل `public_html` وتعديل المسارات في `public_html/index.php`
  ليشير إلى `~/ramadan` (الطريقة الأولى أنظف وموصى بها).

---

## الخطوة 4 — وضع الواجهة داخل Laravel

انسخ **محتويات** `frontend/dist/` (وليس المجلد نفسه) إلى **`~/ramadan/public/`**:

```
~/ramadan/public/
  index.php        ← موجود (Laravel)
  .htaccess        ← موجود (Laravel)
  index.html       ← من dist (الواجهة)
  assets/          ← من dist
  logo.svg         ← من dist
  ramadan-services.mp4
```

> Laravel يقدّم `index.html` لأي رابط غير `/api`، والـ API على `/api`. لن يتعارض
> `index.html` مع `index.php`.

---

## الخطوة 5 — قاعدة البيانات MySQL

1. من cPanel: **MySQL® Databases** → أنشئ قاعدة بيانات ومستخدماً وامنحه كل الصلاحيات.
2. احفظ: اسم القاعدة، اسم المستخدم، كلمة المرور.

---

## الخطوة 6 — إعداد ملف `.env`

في `~/ramadan/`:

```bash
cp .env.example .env
php artisan key:generate
```

ثم عدّل `.env`:

```env
APP_NAME=RAMADAN
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com        # دومينك بالضبط (مهم لروابط الصور)

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=اسم_القاعدة
DB_USERNAME=اسم_المستخدم
DB_PASSWORD=كلمة_المرور
```

---

## الخطوة 7 — التهيئة النهائية

من Terminal في `~/ramadan/`:

```bash
php artisan migrate --seed     # إنشاء الجداول + المحتوى الافتراضي + حساب الأدمن
php artisan storage:link       # لإتاحة الصور المرفوعة عبر /storage
php artisan config:cache
php artisan route:cache
```

تأكد أن مجلدي `storage/` و`bootstrap/cache/` قابلان للكتابة (عادة 755).

---

## الخطوة 8 — تسجيل الدخول وتغيير البيانات

افتح: `https://your-domain.com/#/dashboard`

| | |
|---|---|
| البريد | `admin@ramadan-eng.com` |
| كلمة المرور | `ramadan2026` |

**غيّر كلمة المرور فوراً** من تبويب «الحساب»، وعدّل بياناتك (الهاتف، واتساب،
البريد، العنوان، الصور…) من لوحة التحكم.

---

## تحديث الموقع لاحقاً

- **تعديل محتوى/صور:** من لوحة التحكم مباشرة (يُحفظ في قاعدة البيانات).
- **تعديل تصميم/كود الواجهة:** أعد `npm run build` محلياً وارفع `dist/` الجديد إلى
  `public/`.
- **تعديل كود الـ backend:** ارفع الملفات المعدّلة ثم `php artisan config:cache`.

---

## ربط الدومين

عند شراء الدومين، وجّه سجلات DNS (أو Nameservers) إلى استضافتك حسب التعليمات التي
تعطيك إياها شركة الاستضافة. بعد انتشار الـ DNS (دقائق إلى ساعات) يعمل الدومين.
فعّل أيضاً شهادة **SSL مجانية (Let's Encrypt)** من cPanel ليعمل `https`.

---

## ملاحظات مهمة

- **APP_URL** يجب أن يطابق دومينك بالضبط، وإلا لن تظهر روابط الصور المرفوعة.
- **الفيديو** (`ramadan-services.mp4`, ~24MB) يُرفع ضمن `public/`. إن كانت
  مساحة/سرعة الاستضافة محدودة، يمكن لاحقاً رفعه على يوتيوب ووضع رابطه بدل الملف.
- لا ترفع ملف `.env` لأي مكان عام، ولا تجعل `APP_DEBUG=true` في الإنتاج.
