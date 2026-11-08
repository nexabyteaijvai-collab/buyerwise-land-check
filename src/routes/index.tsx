import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import contextImage from "@/assets/01_Context_Buyer_Uncertainty.jpg.asset.json";
import expansionImage from "@/assets/02_Urban_Expansion_Peripheral_Risk.jpg.asset.json";
import familyImage from "@/assets/03_Family_Rights_Disagreement.jpg.asset.json";
import warningImage from "@/assets/04_Physical_Warning_Not_Enough.jpg.asset.json";
import pathImage from "@/assets/05_LandSecure_Clear_Path.jpg.asset.json";
import verificationImage from "@/assets/06_PrePurchase_Verification.jpg.asset.json";
import consultationImage from "@/assets/07_Rights_Holder_Consultation.jpg.asset.json";
import monitoringImage from "@/assets/08_Remote_Monitoring_After_Purchase.jpg.asset.json";
import surveyImage from "@/assets/09_Field_Survey_Services.jpg.asset.json";
import assistanceImage from "@/assets/10_Contact_Client_Assistance.jpg.asset.json";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleAlert,
  Compass,
  FileCheck2,
  Fingerprint,
  MapPinned,
  Menu,
  MessageCircle,
  MoveRight,
  ScanLine,
  ShieldCheck,
  Signpost,
  Smartphone,
  UsersRound,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";

const phone = "+237 678 426 212";
const whatsappUrl = "https://wa.me/237678426212";

const navLinks = [
  ["Why it matters", "#why-it-matters"],
  ["Our services", "#services"],
  ["How it works", "#how-it-works"],
  ["About us", "#about"],
  ["Contact", "#contact"],
];

const risks = [
  {
    number: "01",
    title: "A plot sold twice",
    text: "The same parcel may already have been promised, committed or sold to someone else.",
    icon: FileCheck2,
  },
  {
    number: "02",
    title: "Family rights left unspoken",
    text: "An absent relative, heir or rights-holder can turn an apparent agreement into a dispute.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Boundaries nobody agrees on",
    text: "Missing or moved markers make it difficult to know exactly what is being sold.",
    icon: ScanLine,
  },
  {
    number: "04",
    title: "Pressure to pay, questions unanswered",
    text: "A rush to close can leave a buyer without the history or clarity they need.",
    icon: CircleAlert,
  },
];

const services = [
  {
    icon: ShieldCheck,
    name: "Pre-purchase verification",
    text: "Organize available plot information and surface gaps, inconsistencies and questions before you commit.",
  },
  {
    icon: UsersRound,
    name: "Rights-holder clarification",
    text: "Understand which family members, rights-holders and stakeholders may be part of the story.",
  },
  {
    icon: MapPinned,
    name: "Plot and boundary support",
    text: "Connect the parcel on the ground with the information under review, and coordinate suitable field checks.",
  },
  {
    icon: FileCheck2,
    name: "A clear parcel record",
    text: "Keep useful documents, dates, observations and transaction history organized after purchase.",
  },
  {
    icon: Smartphone,
    name: "Remote visibility",
    text: "Stay informed when relevant parcel activity or new information is recorded through LANDSECURE.",
  },
  {
    icon: Compass,
    name: "Practical next-step guidance",
    text: "Know when a question needs a qualified professional, an official process or another field check.",
  },
];

const steps = [
  "Identify the land you’re considering.",
  "Tell us what you know and what you need to check.",
  "Clarify the available information and people involved.",
  "Review what’s known, what’s missing and what needs attention.",
  "Decide whether to proceed, pause or ask more questions.",
  "If you buy, keep an organized record and stay informed.",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LANDSECURE — Buy land with clarity, not fear" },
      {
        name: "description",
        content:
          "Before you pay, understand the land, the people connected to it and the questions worth asking. Practical land verification and owner support in Cameroon.",
      },
      { property: "og:title", content: "LANDSECURE — Buy land with clarity, not fear" },
      {
        property: "og:description",
        content:
          "Before you buy, verify. After purchase, keep a clear record and stay informed. Practical land support in Cameroon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -56px 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function submitToWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello LANDSECURE, I’d like to request a land verification.",
      `Name: ${form.get("name")}`,
      `Phone / WhatsApp: ${form.get("phone")}`,
      `Email: ${form.get("email") || "Not provided"}`,
      `City / locality: ${form.get("location")}`,
      `Service: ${form.get("service")}`,
      `Message: ${form.get("message")}`,
    ].join("\n");
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setFormStatus("Your message is ready in WhatsApp. Send it there to reach our team.");
  }

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-lockup" href="#home" aria-label="LANDSECURE home">
            <span className="brand-mark" aria-hidden="true">
              <ShieldCheck />
            </span>
            <span className="brand-wordmark">
              <strong>LANDSECURE</strong>
              <small>LAND CLARITY. PEACE OF MIND.</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navLinks.map(([label, href]) => (
              <a href={href} key={href}>{label}</a>
            ))}
          </nav>
          <Button asChild className="header-cta">
            <a href="#contact">Request verification <ArrowUpRight aria-hidden="true" /></a>
          </Button>
          <details className="mobile-nav">
            <summary aria-label="Open navigation"><Menu /><ChevronDown className="menu-chevron" /></summary>
            <nav aria-label="Mobile navigation">
              {navLinks.map(([label, href]) => (
                <a href={href} key={href}>{label}<ArrowRight aria-hidden="true" /></a>
              ))}
              <a className="mobile-nav-cta" href="#contact">Request verification <ArrowUpRight aria-hidden="true" /></a>
            </nav>
          </details>
        </div>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <img className="hero-image" src={contextImage.url} alt="A family and land buyer reviewing a plot in the Cameroon countryside" fetchPriority="high" />
        <div className="hero-overlay" />
        <div className="hero-content content-width">
          <p className="eyebrow hero-eyebrow"><span /> LAND DECISIONS, MADE CLEARER</p>
          <h1 id="hero-title">Buy land with<br /><span>clarity, not fear.</span></h1>
          <p className="hero-copy">Before you pay, understand the plot, the people connected to it, the boundaries and the information available. After purchase, keep a clear record and stay informed.</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="button-lime"><a href="#contact">Request a land verification <ArrowRight /></a></Button>
            <a className="hero-secondary" href={whatsappUrl} target="_blank" rel="noreferrer"><span className="whatsapp-icon"><MessageCircle /></span> Talk to LANDSECURE</a>
          </div>
          <p className="hero-footnote"><MapPinned /> Cameroon-based support <span /> Bamoumgoum – Bafoussam</p>
        </div>
        <div className="hero-note"><span className="hero-note-mark"><Fingerprint /></span><span><strong>Before you buy, verify.</strong><small>After purchase, keep watch.</small></span></div>
        <a className="scroll-cue" href="#why-it-matters"><span>THE LAND BUYING REALITY</span><ArrowDown /></a>
      </section>

      <section id="why-it-matters" className="context-section section-pad">
        <div className="content-width context-grid">
          <div className="context-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> A BIG DECISION, TOO OFTEN MADE IN THE DARK</p>
            <h2>A land purchase can represent <span>years of savings.</span></h2>
            <p>Yet many buyers commit money without a complete view of who is selling, who else has a say, where the parcel ends or whether someone made an earlier commitment.</p>
            <p>In Cameroon’s growing towns and changing communities, the full story isn’t always easy to see. Sometimes the hard questions only surface after payment.</p>
            <Button asChild variant="outline" className="context-cta"><a href="#contact">Ask before you pay <ArrowRight /></a></Button>
          </div>
          <figure className="context-image-wrap" data-reveal>
            <img src={expansionImage.url} alt="A land buyer and field representative discuss a plot on the edge of a growing Cameroon city" loading="lazy" />
            <figcaption><span className="caption-pin"><MapPinned /></span><span><strong>Growing places. Important decisions.</strong><small>Look beyond the plot line to understand the story.</small></span></figcaption>
          </figure>
        </div>
      </section>

      <section className="risk-section section-pad" aria-labelledby="risk-title">
        <div className="content-width">
          <div className="section-heading" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> THE QUESTIONS THAT MATTER</p>
            <h2 id="risk-title">One unanswered question<br />can change <span>everything.</span></h2>
            <p>Land problems don’t always look like problems until after the money changes hands.</p>
          </div>
          <div className="risk-grid">
            {risks.map(({ number, title, text, icon: Icon }, index) => (
              <article className="risk-item" data-reveal key={number} style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}>
                <span className="risk-number">{number}</span>
                <Icon className="risk-icon" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <MoveRight className="risk-arrow" aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="risk-image-row" data-reveal>
            <img src={familyImage.url} alt="A family and land buyer talk through rights and parcel information" loading="lazy" />
            <div className="risk-image-note"><span className="risk-note-icon"><UsersRound /></span><p><strong>A simple sale can involve more people than you think.</strong><br />Clarifying who’s involved can be as important as identifying the land.</p></div>
            <img className="risk-warning" src={warningImage.url} alt="A weathered warning sign beside a parcel boundary" loading="lazy" />
          </div>
          <p className="risk-bottom-line" data-reveal><CircleAlert /> After payment, a mistake can become much more expensive.</p>
        </div>
      </section>

      <section className="solution-section" aria-labelledby="solution-title">
        <div className="content-width solution-grid">
          <figure className="solution-image" data-reveal>
            <img src={pathImage.url} alt="A clear path across a Cameroon landscape, symbolizing a more informed land decision" loading="lazy" />
            <figcaption><span className="solution-image-icon"><Check /></span> A clearer step before payment.</figcaption>
          </figure>
          <div className="solution-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> MEET LANDSECURE</p>
            <h2 id="solution-title">Take the clearer path <span>before you pay.</span></h2>
            <p>LANDSECURE helps bring together the key information around a plot, understand the people and rights involved, and identify what’s missing or needs a closer look.</p>
            <p>So you can make your next move with more perspective — before making a commitment that’s hard to reverse.</p>
            <ul className="solution-list">
              <li><Check /> Understand what’s known and what isn’t</li>
              <li><Check /> Clarify questions around people and boundaries</li>
              <li><Check /> Make a more informed decision before paying</li>
            </ul>
            <Button asChild size="lg" className="button-blue"><a href="#contact">Start a verification <ArrowRight /></a></Button>
          </div>
        </div>
      </section>

      <section className="services-section section-pad" id="services" aria-labelledby="services-title">
        <div className="content-width">
          <div className="services-heading" data-reveal>
            <div><p className="eyebrow"><span className="eyebrow-dot" /> PRACTICAL SUPPORT, BEFORE AND AFTER</p><h2 id="services-title">The right questions.<br /><span>A clearer next step.</span></h2></div>
            <p>Useful, human support for each part of the land ownership journey — from first look to ongoing records.</p>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, name, text }, index) => (
              <article className="service-item" data-reveal key={name} style={{ "--reveal-delay": `${(index % 3) * 80}ms` } as React.CSSProperties}>
                <span className="service-icon"><Icon aria-hidden="true" /></span>
                <span className="service-index">0{index + 1}</span>
                <h3>{name}</h3><p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="journey-section section-pad" id="how-it-works" aria-labelledby="journey-title">
        <div className="content-width journey-layout">
          <div className="journey-intro" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> A CALMER WAY FORWARD</p>
            <h2 id="journey-title">From plot idea<br />to <span>clearer decision.</span></h2>
            <p>Start with what you know. We’ll help you find the questions worth asking next.</p>
            <img src={consultationImage.url} alt="A landowner and family representatives reviewing parcel information together" loading="lazy" />
            <span className="journey-image-note"><MessageCircle /> A conversation starts the process.</span>
          </div>
          <ol className="journey-steps">
            {steps.map((step, index) => (
              <li data-reveal key={step} style={{ "--reveal-delay": `${index * 55}ms` } as React.CSSProperties}>
                <span className="step-number">{String(index + 1).padStart(2, "0")}</span><p>{step}</p>
                {index < steps.length - 1 && <span className="step-connector" aria-hidden="true" />}
              </li>
            ))}
            <li className="journey-end"><span><Signpost /></span><p><strong>Your decision stays yours.</strong><br />LANDSECURE helps make the picture clearer.</p></li>
          </ol>
        </div>
      </section>

      <section className="monitor-section" aria-labelledby="monitor-title">
        <div className="content-width monitor-grid">
          <div className="monitor-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> YOUR LAND STORY DOESN’T END AT PURCHASE</p>
            <h2 id="monitor-title">Away from the land.<br /><span>Not out of the picture.</span></h2>
            <p>Whether you live in another city or abroad, it helps to have a clear record and a way to stay in the loop when relevant parcel activity is recorded through LANDSECURE.</p>
            <ul className="monitor-points">
              <li><Check /> Keep key documents, dates and observations together</li>
              <li><Check /> Maintain continuity when people or memories change</li>
              <li><Check /> Receive relevant updates recorded through the service</li>
            </ul>
            <Button asChild variant="outline" className="monitor-cta"><a href="#contact">Ask about land monitoring <ArrowRight /></a></Button>
            <small className="monitor-caveat">Updates relate to information or activity known to or recorded through LANDSECURE.</small>
          </div>
          <figure className="monitor-visual" data-reveal>
            <img src={monitoringImage.url} alt="A landowner checks parcel information while away from the land" loading="lazy" />
            <figcaption><span><Smartphone /></span><strong>Keep your parcel story close, wherever you are.</strong></figcaption>
          </figure>
        </div>
      </section>

      <section className="about-section section-pad" id="about" aria-labelledby="about-title">
        <div className="content-width about-grid">
          <div className="about-image" data-reveal><img src={surveyImage.url} alt="Land survey professionals check parcel boundaries in the field" loading="lazy" /><span className="about-stamp"><MapPinned /><strong>BAFOUSSAM</strong><small>CAMEROON</small></span></div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> LOCAL KNOWLEDGE. A HUMAN APPROACH.</p>
            <h2 id="about-title">A Cameroon-based response to a problem buyers <span>know too well.</span></h2>
            <p>LANDSECURE SARLU was created to make land decisions clearer before purchase and preserve useful traceability afterwards. We start with the question every buyer deserves to ask: “What do I need to know before I pay?”</p>
            <div className="about-quote"><span>“</span><p>Our role is to help you understand the situation better — and prepare the right next steps.</p></div>
            <p className="about-boundary"><ShieldCheck /> We provide verification and decision-support. Official procedures, legal recognition and judicial decisions remain with competent authorities and legally authorized professionals.</p>
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact" aria-labelledby="contact-title">
        <div className="content-width contact-layout">
          <div className="contact-copy" data-reveal>
            <p className="eyebrow"><span className="eyebrow-dot" /> YOUR NEXT STEP STARTS HERE</p>
            <h2 id="contact-title">Thinking about buying land?<br /><span>Start with verification.</span></h2>
            <p>Tell us where the land is and what you know. We’ll help you identify the next verification steps before you commit your money.</p>
            <a className="contact-callout" href={whatsappUrl} target="_blank" rel="noreferrer"><span className="contact-call-icon"><MessageCircle /></span><span><small>CALL OR WHATSAPP</small><strong>{phone}</strong></span><ArrowUpRight /></a>
            <a className="contact-email" href="mailto:contact@landsecure237.com">contact@landsecure237.com <ArrowUpRight /></a>
            <p className="contact-location"><MapPinned /> Bamoumgoum – Bafoussam, Cameroon</p>
            <img className="contact-team-image" src={assistanceImage.url} alt="The LANDSECURE team is ready to help answer a customer’s questions" loading="lazy" />
          </div>
          <form className="contact-form" onSubmit={submitToWhatsApp} data-reveal>
            <div className="form-heading"><span>01 / LET’S TALK</span><h3>Tell us a little about the land.</h3><p>We’ll help you figure out what to check next.</p></div>
            <div className="form-fields">
              <label className="form-field">Full name<Input required autoComplete="name" name="name" placeholder="Your name" /></label>
              <label className="form-field">Phone / WhatsApp<Input required autoComplete="tel" name="phone" type="tel" placeholder="+237 …" /></label>
              <label className="form-field">Email address <span className="optional-label">OPTIONAL</span><Input autoComplete="email" name="email" type="email" placeholder="you@example.com" /></label>
              <label className="form-field">City / locality<Input required name="location" placeholder="Where is the land?" /></label>
              <label className="form-field form-field-wide">How can we help?
                <select name="service" defaultValue="Pre-purchase land verification">
                  {services.map((service) => <option key={service.name}>{service.name}</option>)}
                  <option>Land transaction assistance</option>
                  <option>Other question</option>
                </select>
              </label>
              <label className="form-field form-field-wide">A short message<Textarea required name="message" placeholder="Share what you know about the land and what you would like help checking." rows={3} /></label>
            </div>
            <label className="consent-row"><Checkbox required id="privacy-consent" /><span>I agree to be contacted about my request and understand my information will be shared with LANDSECURE.</span></label>
            <Button type="submit" size="lg" className="form-submit">Continue with WhatsApp <ArrowRight /></Button>
            <p className="form-status" aria-live="polite">{formStatus}</p>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="content-width">
          <div className="footer-main">
            <a className="brand-lockup footer-brand" href="#home" aria-label="LANDSECURE home"><span className="brand-mark"><ShieldCheck /></span><span className="brand-wordmark"><strong>LANDSECURE</strong><small>LAND CLARITY. PEACE OF MIND.</small></span></a>
            <p>Before you buy, verify.<br />After purchase, stay informed.</p>
            <div className="footer-contact"><a href={whatsappUrl} target="_blank" rel="noreferrer">{phone} <ArrowUpRight /></a><a href="mailto:contact@landsecure237.com">contact@landsecure237.com <ArrowUpRight /></a><span>Bamoumgoum – Bafoussam, Cameroon</span></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} LANDSECURE SARLU</span><p>LANDSECURE supports verification and informed decisions. Official land procedures and legal recognition remain with competent authorities and legally authorized professionals.</p><a href="#home" aria-label="Back to top">BACK TO TOP <ArrowUpRight /></a></div>
        </div>
      </footer>
    </main>
  );
}