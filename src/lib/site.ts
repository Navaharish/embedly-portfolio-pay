export const REGISTRATION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdzJmpaxI66ItK05FitoIQ7jOeOrA_vra4jAW717RMDhlQ1pw/viewform";
export const COURSE_NAME = "Hardware Internship (2 weeks)";
export const LINKEDIN_URL = "https://www.linkedin.com/in/akshay-venkatesan";
export const CONTACT_EMAIL = "admin@squaroots.com";
export const CONTACT_PHONES = ["+91 82480 74812", "+91 91502 55738"];
export const CONTACT_TEL = "tel:+918248074812";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/program", label: "Training Program" },
  { to: "/trainer", label: "Trainer" },
  { to: "/experience", label: "Learning Experience" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export const SITE_URL = "https://embeddly.in";
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE_URL },
    ],
  };
}
