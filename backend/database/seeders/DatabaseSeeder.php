<?php

namespace Database\Seeders;

use App\Models\About;
use App\Models\ContactSetting;
use App\Models\Hero;
use App\Models\Project;
use App\Models\Service;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\User;
use App\Models\WhyUs;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ----- Admin user -----
        User::updateOrCreate(
            ['email' => 'admin@ramadan-eng.com'],
            ['name' => 'RAMADAN Admin', 'password' => Hash::make('ramadan2026')]
        );

        // ----- Site settings -----
        Setting::updateOrCreate(['id' => 1], [
            'name' => ['ar' => 'RAMADAN', 'en' => 'RAMADAN'],
            'tagline' => [
                'ar' => 'هندسة • استشارات • إكساء • تجهيز معامل',
                'en' => 'Engineering • Consulting • Finishing • Plant Fit-out',
            ],
            'logo' => '/logo.svg',
            'phone' => '+963 998 556 619',
            'whatsapp' => '963998556619',
            'email' => 'info@ramadan-eng.com', // مؤقت — استبدله ببريدك الحقيقي
            'address' => ['ar' => 'دمشق — الميدان', 'en' => 'Damascus — Al-Midan'],
            'working_hours' => ['ar' => 'السبت – الخميس: 9 صباحاً – 5 مساءً', 'en' => 'Sat – Thu: 9 AM – 5 PM'],
            'social' => ['facebook' => '', 'instagram' => '', 'linkedin' => '', 'x' => ''],
        ]);

        // ----- Hero -----
        Hero::updateOrCreate(['id' => 1], [
            'badge' => ['ar' => 'منذ عام 1990', 'en' => 'Since 1990'],
            'title' => [
                'ar' => 'نبني الثقة ونُصمّم المستقبل',
                'en' => 'We Build Trust and Design the Future',
            ],
            'subtitle' => [
                'ar' => 'أكثر من ثلاثة عقود من الخبرة في الهندسة والاستشارات والإكساء وتجهيز المعامل، نحوّل أفكارك إلى مشاريع متكاملة بجودة عالية ولمسة عصرية.',
                'en' => 'Over three decades of experience in engineering, consulting, finishing and plant fit-out — turning your ideas into integrated, high-quality projects with a modern touch.',
            ],
            'image' => 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
            'cta_primary' => ['ar' => 'تصفّح أعمالنا', 'en' => 'View Our Work'],
            'cta_secondary' => ['ar' => 'تواصل معنا', 'en' => 'Contact Us'],
        ]);

        // ----- About -----
        About::updateOrCreate(['id' => 1], [
            'title' => ['ar' => 'من نحن', 'en' => 'About Us'],
            'lead' => [
                'ar' => 'خبرة تتجاوز ثلاثة عقود في الهندسة والإبداع',
                'en' => 'Over three decades of engineering expertise and creativity',
            ],
            'body' => [
                'ar' => 'تأسس مكتب RAMADAN الهندسي عام 1990 ليكون شريكاً موثوقاً في بناء وتصميم المشاريع. على مدى أكثر من ثلاثين عاماً، راكمنا خبرة واسعة في التصميم المعماري والإنشائي، الاستشارات والإشراف الهندسي، وأعمال الإكساء والديكور الداخلي والخارجي، إضافةً إلى تجهيز المعامل والمنشآت الصناعية. يقوم عملنا على كادر متكامل ومتخصص يجمع بين الخبرة والدقة، ورؤيتنا أن نقدّم حلولاً هندسية عملية وجمالية تواكب أحدث المعايير وتلبّي تطلعات عملائنا.',
                'en' => 'RAMADAN Engineering Office was founded in 1990 to be a trusted partner in building and designing projects. Over more than thirty years we have built deep experience in architectural and structural design, engineering consultancy and supervision, interior and exterior finishing and decor, as well as the fit-out of factories and industrial facilities. Our work is driven by a fully integrated, specialized team that combines experience with precision, and our vision is to deliver practical, aesthetic engineering solutions that meet the latest standards and our clients\' aspirations.',
            ],
            'image' => 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
            'points' => [
                ['id' => 'p1', 'ar' => 'كادر متكامل ومتخصص', 'en' => 'Fully integrated specialized team'],
                ['id' => 'p2', 'ar' => 'خبرة منذ عام 1990', 'en' => 'Experience since 1990'],
                ['id' => 'p3', 'ar' => 'التزام بالمواعيد والجودة', 'en' => 'Commitment to deadlines and quality'],
                ['id' => 'p4', 'ar' => 'متابعة كاملة من الفكرة حتى التسليم', 'en' => 'Full follow-up from concept to delivery'],
            ],
        ]);

        // ----- Contact intro -----
        ContactSetting::updateOrCreate(['id' => 1], [
            'title' => ['ar' => 'تواصل معنا', 'en' => 'Contact Us'],
            'subtitle' => [
                'ar' => 'نسعد بالإجابة عن استفساراتك ومناقشة مشروعك القادم.',
                'en' => 'We are happy to answer your questions and discuss your next project.',
            ],
        ]);

        // ----- Stats -----
        $stats = [
            ['value' => '36', 'label' => ['ar' => 'سنوات خبرة', 'en' => 'Years of Experience']],
            ['value' => '+2000', 'label' => ['ar' => 'مشروع منجز', 'en' => 'Completed Projects']],
            ['value' => '+735', 'label' => ['ar' => 'عميل', 'en' => 'Clients']],
            ['value' => '100%', 'label' => ['ar' => 'كادر متكامل ومتخصص', 'en' => 'Fully Integrated Team']],
        ];
        foreach ($stats as $i => $s) {
            Stat::create($s + ['sort' => $i]);
        }

        // ----- Services -----
        $services = [
            ['icon' => 'ruler', 'title' => ['ar' => 'الهندسة والتصميم', 'en' => 'Engineering & Design'], 'description' => ['ar' => 'تصميم معماري وإنشائي متكامل للمباني السكنية والتجارية مع مخططات تنفيذية دقيقة ونماذج ثلاثية الأبعاد.', 'en' => 'Integrated architectural and structural design for residential and commercial buildings with precise execution drawings and 3D models.']],
            ['icon' => 'chart', 'title' => ['ar' => 'الاستشارات الهندسية', 'en' => 'Engineering Consulting'], 'description' => ['ar' => 'دراسات جدوى، إشراف هندسي، تقييم فني، وحلول لمشاكل التنفيذ بما يضمن أعلى كفاءة وأقل تكلفة.', 'en' => 'Feasibility studies, engineering supervision, technical assessment, and execution problem-solving for maximum efficiency and lower cost.']],
            ['icon' => 'brush', 'title' => ['ar' => 'الإكساء والديكور', 'en' => 'Finishing & Decor'], 'description' => ['ar' => 'أعمال إكساء داخلي وخارجي وديكورات عصرية باختيار دقيق للخامات والتشطيبات لإبراز هوية المكان.', 'en' => 'Interior and exterior finishing and modern decor with careful selection of materials and finishes to highlight the identity of the space.']],
            ['icon' => 'factory', 'title' => ['ar' => 'تجهيز المعامل', 'en' => 'Factory & Plant Fit-out'], 'description' => ['ar' => 'تصميم وتجهيز المعامل والمنشآت الصناعية بالكامل: دراسة المخططات، توزيع خطوط الإنتاج، البنية التحتية والأعمال الكهروميكانيكية بكفاءة عالية.', 'en' => 'Complete design and fit-out of factories and industrial facilities: layout studies, production-line distribution, infrastructure and electromechanical works with high efficiency.']],
        ];
        foreach ($services as $i => $s) {
            Service::create($s + ['sort' => $i]);
        }

        // ----- Projects -----
        $projects = [
            ['title' => ['ar' => 'تصميم صالة عرض ذهب ومجوهرات', 'en' => 'Gold & Jewelry Showroom'], 'category' => 'decor', 'image' => '/projects/gold-showroom.jpg', 'year' => '2024', 'location' => ['ar' => 'دمشق', 'en' => 'Damascus'], 'description' => ['ar' => 'تصميم وتنفيذ صالة عرض فاخرة بخامات الأونيكس المضيء واللمسات الذهبية وإضاءة مدروسة تُبرز رقي المعروضات.', 'en' => 'Design and fit-out of a luxurious showroom with backlit onyx surfaces, gold accents and refined lighting that elevates the displays.']],
            ['title' => ['ar' => 'غرفة نوم رئيسية عصرية', 'en' => 'Modern Master Bedroom'], 'category' => 'decor', 'image' => '/projects/master-bedroom.jpg', 'year' => '2024', 'location' => ['ar' => 'دمشق', 'en' => 'Damascus'], 'description' => ['ar' => 'ديكور غرفة نوم رئيسية بطابع عصري هادئ، يمزج الأقمشة الرمادية مع لمسات تركوازية وخزائن مكسوّة وإضاءة دافئة.', 'en' => 'A calm, modern master bedroom blending grey upholstery with teal accents, fabric-clad wardrobes and warm lighting.']],
            ['title' => ['ar' => 'غرفة نوم بخامات وإضاءة فاخرة', 'en' => 'Bedroom with Premium Materials & Lighting'], 'category' => 'decor', 'image' => '/projects/bedroom-marble.jpg', 'year' => '2024', 'location' => ['ar' => 'دمشق', 'en' => 'Damascus'], 'description' => ['ar' => 'تصميم داخلي يجمع الرخام المضيء والخشب الطبيعي وأثاثاً مخصصاً مع توزيع إضاءة يمنح إحساساً بالدفء والفخامة.', 'en' => 'Interior design combining backlit marble, natural wood and custom furniture with a lighting layout that feels warm and elegant.']],
            ['title' => ['ar' => 'ركن تسريحة وديكور غرفة نوم', 'en' => 'Vanity Corner & Bedroom Decor'], 'category' => 'decor', 'image' => '/projects/dresser-corner.jpg', 'year' => '2025', 'location' => ['ar' => 'دمشق', 'en' => 'Damascus'], 'description' => ['ar' => 'ركن تسريحة أنيق مع ستائر متدرجة ومرايا وإضاءة خطية، ضمن تناغم لوني راقٍ يعزز الراحة والجمال.', 'en' => 'An elegant vanity corner with layered curtains, mirrors and linear lighting in a refined palette that balances comfort and beauty.']],
            ['title' => ['ar' => 'غرفة نوم بطراز معاصر', 'en' => 'Contemporary Bedroom Suite'], 'category' => 'decor', 'image' => '/projects/teal-bedroom.jpg', 'year' => '2025', 'location' => ['ar' => 'دمشق', 'en' => 'Damascus'], 'description' => ['ar' => 'غرفة نوم معاصرة بصدر سرير منجّد بالتركواز وجدران مرايا وخامات حديثة تمنح المكان عمقاً وأناقة.', 'en' => 'A contemporary bedroom with a teal upholstered headboard, mirrored walls and modern materials that add depth and elegance.']],
        ];
        foreach ($projects as $i => $p) {
            Project::create($p + ['sort' => $i]);
        }

        // ----- Why us -----
        $why = [
            ['icon' => 'shield', 'title' => ['ar' => 'جودة مضمونة', 'en' => 'Guaranteed Quality'], 'text' => ['ar' => 'نلتزم بأعلى معايير الجودة في كل مرحلة من مراحل المشروع.', 'en' => 'We commit to the highest quality standards at every project stage.']],
            ['icon' => 'clock', 'title' => ['ar' => 'تسليم في الوقت', 'en' => 'On-Time Delivery'], 'text' => ['ar' => 'نحترم الجدول الزمني ونسلّم المشاريع ضمن المدة المتفق عليها.', 'en' => 'We respect the timeline and deliver projects within the agreed period.']],
            ['icon' => 'users', 'title' => ['ar' => 'فريق محترف', 'en' => 'Professional Team'], 'text' => ['ar' => 'مهندسون وخبراء بخبرة طويلة في مختلف التخصصات.', 'en' => 'Engineers and experts with long experience across disciplines.']],
            ['icon' => 'spark', 'title' => ['ar' => 'تصاميم مبتكرة', 'en' => 'Innovative Designs'], 'text' => ['ar' => 'نمزج بين الوظيفة والجمال لتقديم تصاميم تترك أثراً.', 'en' => 'We blend function and beauty to deliver designs that leave an impact.']],
        ];
        foreach ($why as $i => $w) {
            WhyUs::create($w + ['sort' => $i]);
        }
    }
}
