# RAMADAN — Engineering Office Website / موقع مكتب رمضان الهندسي

موقع إلكتروني **static** ثنائي اللغة (عربي/إنجليزي) لمكتب رمضان الهندسي، مع لوحة تحكم
لإدارة المحتوى، ووضع داكن/فاتح، مبني بـ **React + Vite**.

A static, bilingual (Arabic/English) website for the RAMADAN engineering office,
with a content dashboard, dark/light mode, built with **React + Vite**.

---

## ✨ الميزات / Features

- 🌐 لغتان: العربية (RTL) والإنجليزية (LTR) — الافتراضي العربية
- 🌗 وضع داكن وفاتح (يتذكر اختيار الزائر)
- 🎨 هوية ألوان مستوحاة من اللوغو (ذهبي + فضي/رمادي)
- 📄 صفحات كاملة: الرئيسية، من نحن، الخدمات، الأعمال، تواصل معنا
- 🛠️ لوحة تحكم `/#/dashboard` لإدارة كل المحتوى بدون برمجة
- 📦 محتوى ديناميكي من ملف `content.json`
- 💬 نموذج تواصل يفتح واتساب أو البريد مباشرة

---

## 🚀 التشغيل محلياً / Local development

```bash
npm install
npm run dev      # http://localhost:5173
```

## 🏗️ البناء للنشر / Build for production

```bash
npm run build    # ينتج مجلد dist/
npm run preview  # معاينة نسخة الإنتاج
```

---

## 🌍 النشر على الاستضافة / Deploy to hosting

الموقع **static** بالكامل، لذا:

1. شغّل `npm run build`.
2. ارفع **محتويات مجلد `dist/`** (وليس المجلد نفسه) إلى مجلد `public_html`
   في استضافتك (cPanel / أي استضافة static).
3. الموقع يعمل من أي مجلد لأن `base` نسبي، والروابط تستخدم `#` (HashRouter)
   فلا حاجة لإعدادات إعادة توجيه على السيرفر.

> If you prefer, you can also drop the `dist/` folder on Netlify, Vercel,
> GitHub Pages, or Cloudflare Pages.

---

## 🛠️ لوحة التحكم / Content Dashboard

- الرابط: `https://your-site.com/#/dashboard`
- كلمة المرور الافتراضية: **`ramadan2026`**
  (غيّرها فوراً من تبويب «الحساب» داخل اللوحة).

### كيف يعمل تحديث المحتوى (مهم)

الموقع static فلا يوجد سيرفر يحفظ التعديلات. الآلية:

1. عدّل المحتوى في اللوحة ثم اضغط **حفظ** → التغييرات تظهر فوراً **على متصفحك**
   (محفوظة في `localStorage`).
2. لنشر التعديلات **لكل الزوار**: اضغط **تصدير `content.json`**، ثم ارفع الملف
   الناتج إلى **جذر موقعك** (نفس مكان `index.html`) ليستبدل القديم.
3. زر **استيراد JSON** يتيح تحميل ملف محتوى موجود لمتابعة التعديل عليه.

> الصور تُضاف عبر رابط (URL). ضع صور مشاريعك على الاستضافة أو أي خدمة استضافة صور
> وانسخ الرابط في الحقل المخصص.

---

## 📁 بنية المشروع / Project structure

```
public/
  content.json        ← كل محتوى الموقع (المصدر المنشور)
  logo.svg            ← اللوغو (استبدله بشعارك الفعلي عند الرغبة)
src/
  context/            ← اللغة، الثيم، المحتوى، المصادقة
  components/          ← Navbar, Footer, Cards, Icon ...
  pages/              ← Home, About, Services, Projects, Contact, Dashboard
  i18n/translations.js← نصوص الواجهة الثابتة (عربي/إنجليزي)
  styles/             ← التنسيقات
```

## 🖼️ استبدال اللوغو / Replacing the logo

ضع شعارك في `public/` (مثلاً `logo.png`) ثم حدّث المسار:
- في لوحة التحكم → إعدادات الموقع → حقل Logo، أو
- في `public/content.json` الحقل `site.logo`، و`index.html` رابط الـ favicon.
