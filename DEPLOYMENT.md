# 🚀 دليل النشر — GitHub Pages + دومين خاص

هذا الدليل يشرح خطوة بخطوة كيف تنشر الموقع مجاناً على **GitHub Pages**
وتربطه بالدومين الذي اشتريته.

---

## 1) تفعيل GitHub Pages (مرة واحدة فقط)

1. افتح مستودعك على GitHub: `Abdllauhramdan/Ramadan_website`
2. اذهب إلى **Settings** (الإعدادات) → من القائمة الجانبية اختر **Pages**
3. تحت **Build and deployment → Source** اختر: **GitHub Actions**

هذا كل شيء — ملف النشر جاهز في المستودع
(`.github/workflows/deploy-pages.yml`). من الآن فصاعداً:

> **كل push إلى الفرع الافتراضي = نشر تلقائي للموقع خلال ~دقيقتين** ✅

يمكنك متابعة عملية النشر من تبويب **Actions** في المستودع، وتشغيلها يدوياً
من هناك أيضاً (زر **Run workflow**).

---

## 2) ربط الدومين `ramadan-construction.com` (مسجَّل في Cloudflare)

### أ. في لوحة تحكم Cloudflare

1. ادخل إلى [dash.cloudflare.com](https://dash.cloudflare.com) واختر الدومين
   `ramadan-construction.com`
2. من القائمة الجانبية اختر **DNS → Records**
3. أضف السجلات التالية (زر **Add record**):

**4 سجلات `A` للدومين الرئيسي:**

| Type | Name | IPv4 address | Proxy status |
|------|------|--------------|--------------|
| A | `@` | `185.199.108.153` | ⚪ DNS only |
| A | `@` | `185.199.109.153` | ⚪ DNS only |
| A | `@` | `185.199.110.153` | ⚪ DNS only |
| A | `@` | `185.199.111.153` | ⚪ DNS only |

**وسجل `CNAME` لنسخة `www`:**

| Type | Name | Target | Proxy status |
|------|------|--------|--------------|
| CNAME | `www` | `abdllauhramdan.github.io` | ⚪ DNS only |

> ⚠️ **مهم جداً:** اجعل حالة البروكسي **DNS only** (السحابة رمادية ⚪ وليست
> برتقالية 🟠) — اضغط على أيقونة السحابة البرتقالية لتعطيلها. البروكسي
> البرتقالي يمنع GitHub من التحقق من الدومين وإصدار شهادة HTTPS.

### ب. في GitHub

1. افتح **Settings → Pages → Custom domain**: اكتب
   `ramadan-construction.com` واضغط **Save**.
2. انتظر حتى ينتهي فحص الـ DNS (علامة ✅ خضراء — عادة دقائق لأن Cloudflare
   سريع الانتشار).
3. فعّل خيار **Enforce HTTPS** (قد يحتاج من دقائق حتى ساعة ليصبح متاحاً بعد
   إصدار شهادة الأمان تلقائياً).

بعدها موقعك يعمل على: **`https://ramadan-construction.com`** 🎉
(و `www.ramadan-construction.com` سيحوَّل تلقائياً إليه)

---

## 3) تحديث الموقع بعد أي تعديل

1. عدّل المحتوى في **`frontend/src/content.js`**
   (نصوص، أرقام، مشاريع، خدمات، معلومات التواصل...)
2. لإضافة صور: ضعها في `frontend/public/projects/` واذكر مسارها في
   `content.js` هكذا `/projects/اسم-الصورة.jpg`
3. اعمل commit و push:

```bash
git add .
git commit -m "تحديث محتوى الموقع"
git push
```

الموقع يُحدَّث تلقائياً — تابع التقدم من تبويب **Actions**.

---

## 4) تجربة التعديلات محلياً قبل النشر (اختياري)

```bash
cd frontend
npm install     # أول مرة فقط
npm run dev     # يفتح الموقع على http://localhost:5173
```

---

## ❓ مشاكل شائعة

| المشكلة | الحل |
|---------|------|
| الموقع لا يظهر بعد التفعيل | تأكد أن **Source = GitHub Actions** في Settings → Pages، وأن آخر تشغيل في تبويب Actions نجح (أخضر) |
| فحص الدومين يفشل في GitHub | تأكد أن كل السجلات في Cloudflare بوضع **DNS only** (سحابة رمادية ⚪) وليست Proxied 🟠 |
| HTTPS لا يعمل | انتظر إصدار الشهادة ثم فعّل **Enforce HTTPS** |
| إعادة توجيه لا نهائية (redirect loop) | يحدث فقط إذا فعّلت البروكسي البرتقالي 🟠 — أعده إلى DNS only، أو اضبط SSL/TLS في Cloudflare على **Full** |
| صورة لا تظهر | تأكد أن الملف موجود في `frontend/public/...` وأن المسار في `content.js` يبدأ بـ `/` ويطابق اسم الملف تماماً (حساس لحالة الأحرف) |
