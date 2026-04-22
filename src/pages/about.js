import { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import i18n from "../i18n";


const About = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
  }, []);

  if (!mounted) return null; // 🔥 prevents hydration error

  const isRTL = i18n.language === "ar"; // true if Arabic
  

  return (
    <>
    <NextSeo
      title="About Us page- Femtotrade For Laboratory Supplies"
      description=""
    />
    <div className="about-us">
      {isRTL ? (
        <>
          <h1>من نحن</h1>
        <p>نحن شركة تجارية متخصصة في مجال مستلزمات ومعدات المختبرات</p>
        <p>
             نحن وكلاء للعديد من شركات المختبرات العالمية، مثل:

            شركة بوروسيل العالمية،

            شركة فالكون كورنينج العالمية،

            شركة كورنينج العالمية،

            شركة سي بي سي العالمية،

            شركة بيوإندو العالمية،

            شركة بلاستيلاب العالمية،

            شركة تي سي إس العالمية،

            شركة إيزولاب العالمية،

            وغيرها...

            نعمل في هذا المجال منذ عام ١٩٩٩
      </p>
      </>
      ) : (
        <>
          <h1>About Us</h1>
        <p>We are a specialized Trading Company In the domain of Laboratory Supplies & Laboratory equipment</p>
        <p>We are Agent of Many international Laboratory companies, such as:
           Borosil International Company,
           Falcon    Corning International Company,
           Corning   International Company,
           CPC       International Company,
           Bioendo   International Company,
           PlasTiLaB International Company,
           TCS       International Company,
           IsoLaB    International Company,
           and Others...
           We are in the Field Since 1999
                    </p>
        </>
      )}
    </div>
    </>
  );
}   

export default About;