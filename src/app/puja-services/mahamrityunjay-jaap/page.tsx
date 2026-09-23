import PujaServicePage from "@/components/puja/PujaServicePage";
import { ServiceJsonLd } from "@/components/seo/StructuredData";
import { getPujaService } from "@/data/puja-services";
import { generateServiceMetadata } from "@/lib/seo";
const service = getPujaService("mahamrityunjay-jaap")!;
export const metadata = generateServiceMetadata(service);
export default function Page() { return <><ServiceJsonLd service={service} /><PujaServicePage service={service} /></>; }
