# RAMADAN — Engineering Office Website / موقع مكتب رمضان الهندسي

موقع **static** ثنائي اللغة (عربي/إنجليزي) لمكتب رمضان الهندسي، مع وضع
**داكن/فاتح**. كل المحتوى يُعدَّل مباشرة من الكود — لا حاجة لأي سيرفر أو قاعدة
بيانات — ويُنشر تلقائياً على **GitHub Pages**.

A bilingual (Arabic/English) **static** website for the RAMADAN engineering
office. All content is edited directly in code and deployed automatically to
**GitHub Pages** — no server or database required.

---

## 🧱 البنية / Architecture

```
ramadan_website/
├── frontend/                    ← موقع React + Vite (هذا هو الموقع)
│   ├── src/content.js           ← ✏️ كل محتوى الموقع — عدّل من هنا
│   └── public/                  ← الصور واللوغو والملفات الثابتة
└── .github/workflows/
    └── deploy-pages.yml         ← نشر تلقائي على GitHub Pages
```

---

## ✏️ تعديل محتوى الموقع / Editing content

**كل النصوص والأرقام والمشاريع والخدمات في ملف واحد:**

> 📄 **`frontend/src/content.js`**

- كل نص له نسختان: `ar` (عربي) و `en` (إنكليزي).
- لإضافة مشروع أو خدمة: انسخ عنصراً موجوداً `{ ... }` وعدّله (غيّر الـ `id`).
- **الصور:** ضع ملف الصورة في `frontend/public/projects/` مثلاً، ثم اكتب
  مساره في `content.js` هكذا: `/projects/my-image.jpg`
- **اللوغو:** استبدل `frontend/public/logo.svg`.

بعد أي تعديل: اعمل commit و push إلى الفرع الافتراضي — الموقع يُحدَّث تلقائياً
خلال دقيقة أو دقيقتين عبر GitHub Actions.

---

## ✨ الميزات / Features

- 🌐 لغتان: العربية (RTL، الافتراضية) والإنجليزية (LTR)
- 🌗 وضع داكن وفاتح
- 🎨 هوية ألوان مستوحاة من اللوغو (ذهبي + فضي)
- 📄 صفحات: الرئيسية، من نحن، الخدمات، الأعمال (مع فلترة ومعرض صور)، تواصل معنا
- 📱 نموذج تواصل يرسل الرسالة مباشرة عبر **واتساب** أو **البريد الإلكتروني**
- ⚡ static بالكامل: سريع، مجاني الاستضافة، بدون قاعدة بيانات

---

## 🚀 التشغيل محلياً / Local development

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

البناء للإنتاج:

```bash
npm run build      # ينتج frontend/dist/
```

---

## 🌍 النشر على GitHub Pages + الدومين الخاص

📘 **راجع [`DEPLOYMENT.md`](DEPLOYMENT.md)** — دليل خطوة بخطوة لتفعيل
GitHub Pages وربط الدومين الذي اشتريته.

باختصار:

1. من GitHub: **Settings → Pages → Source: GitHub Actions**
2. كل push إلى الفرع الافتراضي ينشر الموقع تلقائياً.
3. أضف دومينك في **Settings → Pages → Custom domain** واضبط DNS عند مزوّد
   الدومين (التفاصيل في `DEPLOYMENT.md`).

