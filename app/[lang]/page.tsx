import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Numbers } from "@/components/sections/Numbers";
import { Sectors } from "@/components/sections/Sectors";
import { AnpgCertification } from "@/components/sections/AnpgCertification";
import { ArSegCompliance } from "@/components/sections/ArSegCompliance";
import { VisionValues } from "@/components/sections/VisionValues";
import { Commitment } from "@/components/sections/Commitment";
import { PersonalInsurance } from "@/components/sections/PersonalInsurance";
import { BusinessInsurance } from "@/components/sections/BusinessInsurance";
import { Reinsurance } from "@/components/sections/Reinsurance";
import { TreatyAlternative } from "@/components/sections/TreatyAlternative";
import { Partners } from "@/components/sections/Partners";
import { CtaBand } from "@/components/sections/CtaBand";

export default async function HomePage(props: PageProps<"/[lang]">) {
  const { lang } = await props.params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />
      <WhoWeAre chapter="01" dict={dict.whoWeAre} />
      <Numbers dict={dict.numbers} />
      <Sectors chapter="03" lang={lang} dict={dict.sectors} />
      <AnpgCertification dict={dict.anpg} />
      <ArSegCompliance dict={dict.arseg} />
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
      <Partners chapter="05" dict={dict.partners} />
      <CtaBand lang={lang} dict={dict.ctaBand} />
    </>
  );
}
