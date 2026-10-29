# Embeddly Website Plan

A premium, minimal hardware-learning website for **Embeddly**, an initiative by Squaroots Technology LLP, with a Razorpay registration/payment link.

## Brand and design
- Name everywhere: **Embeddly** (the brief's "Emberly" will be replaced).
- Tagline: "Learn by Building. Build by Doing."
- Deep navy background, white text, restrained electric-blue accent, subtle circuit-board line pattern.
- Modern sans-serif (Space Grotesk headings, DM Sans body). Smooth, light fade-in animations.
- Real brochure photos (trainer and achievements) pulled from the PDF; generated hardware imagery (PCBs, soldering, components) for the hero and cards, never labelled as student projects.

## Pages (each with its own link in the top menu)
1. **Home** – "Learn Hardware by Building It." hero, "An initiative by Squaroots Technology LLP", buttons: Register & Pay, Explore the Program. Short previews of the other sections.
2. **About** – "Beyond Theory. Into Real Hardware." plus three values: Learn by Doing, Build Real Hardware, Practical Engineering Skills.
3. **Training Program** – Hardware Internship Training Program info panel:
   - Duration: approx. 2 weeks
   - Proposed start: Late November 2026 (marked as proposed)
   - Mode: Offline, hands-on
   - Venue: Sai Foundation, Sona College of Technology, Salem, Tamil Nadu
   - Batch: 18 students only
   - Four learning cards: Electronics Fundamentals, PCB Design and Fabrication, Hands-on Hardware Development, Guided Project Development
   - Highlights: 30+ electronics component kit, mentor guidance
4. **Trainer** – Akshay V: former scientist associated with NASA (wording to be confirmed), Co-founder of Squaroots Technology LLP, world's first femto-satellite record holder, 7+ years of expertise, LinkedIn link, brochure achievement photos.
5. **Learning Experience** – step-by-step journey: components, circuits, PCB, testing, prototype.
6. **FAQ** – only facts from the brochure; no invented fees, stipends or job guarantees.
7. **Contact / Register** – prominent "Register & Pay" button opening https://rzp.io/rzp/embeddly in a new tab, plus LinkedIn link.

## Payment
- Every "Register" / "Apply" button links to the Razorpay page: https://rzp.io/rzp/embeddly. No other payment setup needed.

## Needs from you (can be added later)
- Embeddly and Squaroots logo files (otherwise a clean text wordmark is used).
- Contact email / phone number.
- Confirm the exact NASA wording ("Former Scientist @NASA" in the brochure).

## Technical details
- Separate route files per page with unique titles/descriptions; shared header/footer in the root layout.
- Design tokens (colors, gradients, fonts) defined in the global stylesheet; Razorpay URL kept in one constant.
- Brochure images extracted from the PDF and hosted as assets.
