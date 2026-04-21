import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { VisionValues } from "@/components/sections/VisionValues";
import { Commitment } from "@/components/sections/Commitment";
import { PersonalInsurance } from "@/components/sections/PersonalInsurance";
import { BusinessInsurance } from "@/components/sections/BusinessInsurance";
import { Reinsurance } from "@/components/sections/Reinsurance";
import { TreatyAlternative } from "@/components/sections/TreatyAlternative";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />
      <WhoWeAre dict={dict.whoWeAre} />
      <VisionValues dict={dict.vision} />
      <Commitment dict={dict.commitment} />
      <PersonalInsurance
        lang={lang}
        dict={dict.personal}
        cta={dict.common.cta.learnMore}
      />
      <BusinessInsurance
        lang={lang}
        dict={dict.business}
        cta={dict.common.cta.learnMore}
      />
      <Reinsurance
        lang={lang}
        dict={dict.reinsurance}
        cta={dict.common.cta.learnMore}
      />
      <TreatyAlternative dict={dict.treaty} />
      <Testimonials dict={dict.testimonials} />
      <CtaBand lang={lang} dict={dict.ctaBand} />
    </>
  );
}
