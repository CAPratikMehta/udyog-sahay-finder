# Udyog Sahay Pro

# Lovable Build Prompt — Udyog Sahay

Copy everything below into Lovable as your first message.

---

Build a single-page website called **"Udyog Sahay"** — a searchable directory of Central and Gujarat government schemes for MSMEs and industry, organised by sector. It's compiled and run by a practising Chartered Accountant as a reference tool for business owners and their advisors.

## Design direction

Aesthetic: an "official gazette / ledger" feel — trustworthy and archival, not a generic SaaS landing page. Avoid the default cream+terracotta AI-website look entirely.

**Colors:**
- `--navy: #1b2a4a` (primary — masthead, headings, buttons)
- `--navy-deep: #111a30` (footer, hover states)
- `--gold: #c9942f` / `--gold-deep: #a97a20` (accent — official seal / stamp feel)
- `--gujarat: #a6461f` (used only for the "Gujarat Govt" badge)
- `--green-ok: #2f5233` (used only for the "Central Govt" badge)
- `--paper: #faf7f0` (page background)
- `--paper-2: #f1ecdf` (tag backgrounds)
- `--line: #d9d2bd` (borders)
- `--ink: #1c2438` (body text)

**Typography:** 'Source Serif 4' (Google Fonts) for headings — gives it a gazette/legal-document character. 'Inter' for body text. 'JetBrains Mono' for labels, badges, scheme codes, and eyebrow text (uppercase, letter-spaced) — this monospace-for-metadata pattern is a signature element, use it consistently for anything that reads like a record/reference number.

**Signature elements:**
- A circular "seal" badge (like an official stamp) next to the site name in the header, with a double-line gold border under the whole masthead
- Scheme cards styled like index cards/file entries — a mono-font "code" (e.g. CG-01, GJ-09) in the corner of each card, like a filing reference
- Level badges (CENTRAL GOVT / GUJARAT GOVT) as small pill labels in green/rust respectively
- Dashed divider between card body and footer (like a tear-off receipt line)

**Layout:**
1. Dark navy masthead with: seal + site name + tagline on the left, "compiled by a practising Chartered Accountant" credential line on the right, a large headline ("Every subsidy, guarantee and incentive your industry qualifies for"), a short lede, and a 3-stat strip (Schemes Listed / Sectors Covered / Jurisdictions = 2)
2. Sticky search + filter bar below the masthead: a text search input, a Central/Gujarat/All toggle, and a row of pill-shaped industry filter chips (multi-row wrap, click to filter, only one active at a time)
3. A responsive grid of scheme cards (min 320px per card). Each card: level badge + scheme code top row, scheme name (serif, bold), issuing agency (mono, small, muted), 2-line description, up to 3 industry tags, and a footer row with the headline benefit (bold navy) and a "View details →" hint
4. Clicking a card opens a modal with: level badge, full scheme name, all industry tags, full benefit + description, eligibility, how-to-apply, a button linking to the official portal, and a small disclaimer that terms are subject to government revision
5. A contact section (navy background, gold double-line top border) with a short pitch on the left and a form on the right (Name, Company, Email, Industry, Query). On submit, build a `mailto:` link (no backend) to **capratikmehta2017@gmail.com** with the form fields formatted into the subject and body, and redirect the browser to it.
6. A dark footer with an independent-compiler disclaimer (this is not an official government site, scheme terms change, verify before relying on any figure) and a "Compiled by a practising Chartered Accountant" line.

**Interaction requirements:**
- Search filters across scheme name, description, agency, benefit and industries (case-insensitive substring match)
- Central/Gujarat/All toggle and industry chip filter combine with search (AND logic)
- Show a live result count ("18 of 35 schemes")
- Show an empty state ("No schemes match that filter") when a filter returns nothing
- Modal closes on backdrop click, close button, or Escape key
- Fully responsive down to mobile (stack the masthead hero and contact section to single column under ~760px)

## Content — full scheme dataset

Use this exact dataset as the site's content (35 schemes). Treat it as structured data (array of objects) that drives the cards, filters, and modal — not hardcoded HTML per scheme.

```js
const SCHEMES = [
  {
    code:"CG-01", name:"Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)",
    level:"Central", agency:"Ministry of MSME & SIDBI",
    industries:["All Industries","Manufacturing","Services"],
    benefit:"75–85% credit guarantee, collateral-free",
    desc:"Guarantee cover of 75–85% enabling banks and NBFCs to extend collateral-free credit up to ₹5 crore to eligible micro and small enterprises.",
    eligibility:"New and existing micro & small enterprises (manufacturing or service) with valid Udyam Registration; loan routed through a member lending institution.",
    apply:"Applied through the lending bank/NBFC at the time of loan sanction — no separate applicant portal.",
    link:"https://www.cgtmse.in"
  },
  {
    code:"CG-02", name:"Prime Minister's Employment Generation Programme (PMEGP)",
    level:"Central", agency:"Ministry of MSME (KVIC)",
    industries:["All Industries","Manufacturing","Services","Rural & Traditional"],
    benefit:"15–35% capital subsidy, project up to ₹50 lakh",
    desc:"Margin-money subsidy for setting up new micro-enterprises — 15–25% in urban areas and 25–35% in rural areas depending on applicant category, with the balance funded through a bank loan.",
    eligibility:"Individuals above 18 years, new units only (no expansion of existing units); manufacturing project cost up to ₹50 lakh, service project cost up to ₹20 lakh.",
    apply:"Online via the PMEGP e-Portal (kviconline.gov.in/pmegpeportal); DPR and Udyam Registration required.",
    link:"https://kviconline.gov.in/pmegpeportal/"
  },
  {
    code:"CG-03", name:"Credit Linked Capital Subsidy Scheme (CLCSS)",
    level:"Central", agency:"Ministry of MSME",
    industries:["Manufacturing","Engineering","Textiles","Chemicals & Pharma"],
    benefit:"15% capital subsidy on technology upgradation",
    desc:"Upfront capital subsidy to help MSEs replace old plant and machinery with state-of-the-art technology across specified sub-sectors and products.",
    eligibility:"Existing micro and small enterprises upgrading to approved, well-established, improved technology in an eligible sub-sector.",
    apply:"Through a Primary Lending Institution (PLI) — nationalised banks, select cooperative and regional rural banks.",
    link:"https://www.msme.gov.in"
  },
  {
    code:"CG-04", name:"PM Vishwakarma Scheme",
    level:"Central", agency:"Ministry of MSME",
    industries:["Traditional Industries","Rural & Traditional"],
    benefit:"Collateral-free loans up to ₹3 lakh + toolkit incentive",
    desc:"Support for 18 traditional artisan and craftsperson trades — carpenters, blacksmiths, goldsmiths, potters, cobblers, tailors, weavers and others — including skill training, a toolkit incentive and collateral-free credit in two tranches.",
    eligibility:"Artisans and craftspeople engaged in one of the 18 notified trades, verified through a village/urban body or family trade record.",
    apply:"Online via the PM Vishwakarma portal, followed by verification at the local body/CSC level.",
    link:"https://pmvishwakarma.gov.in"
  },
  {
    code:"CG-05", name:"Pradhan Mantri MUDRA Yojana (PMMY)",
    level:"Central", agency:"Ministry of Finance / MUDRA Ltd.",
    industries:["All Industries","Services","Manufacturing"],
    benefit:"Collateral-free loans up to ₹20 lakh",
    desc:"Loans in four categories — Shishu (up to ₹50,000), Kishor (up to ₹5 lakh), Tarun (up to ₹10 lakh) and Tarun Plus (up to ₹20 lakh) — for non-farm income-generating micro and small enterprises.",
    eligibility:"Non-corporate, non-farm small/micro enterprises; Tarun Plus available to borrowers who have satisfactorily repaid a prior Tarun loan.",
    apply:"Through member banks, NBFCs and MFIs; apply directly at the branch or via the Udyamimitra portal.",
    link:"https://www.mudra.org.in"
  },
  {
    code:"CG-06", name:"Zero Defect Zero Effect (ZED) Certification",
    level:"Central", agency:"Ministry of MSME (QCI)",
    industries:["Manufacturing","Engineering","Chemicals & Pharma","Electronics & IT"],
    benefit:"Up to 80% subsidy on certification cost (100% for women-led MSMEs)",
    desc:"Certifies MSMEs at Bronze, Silver or Gold level for quality manufacturing with minimal environmental impact; certified units gain preference in GeM procurement and additional CGTMSE rating benefit.",
    eligibility:"Manufacturing MSMEs with valid Udyam Registration undertaking a quality/environment self-assessment.",
    apply:"Apply and self-assess on the ZED portal; assessment carried out by empanelled bodies.",
    link:"https://zed.msme.gov.in"
  },
  {
    code:"CG-07", name:"Raising and Accelerating MSME Performance (RAMP)",
    level:"Central", agency:"Ministry of MSME (World Bank-supported)",
    industries:["All Industries","Manufacturing"],
    benefit:"Market access, technology & competitiveness support",
    desc:"World Bank-supported programme strengthening MSME institutions and governance at the Centre and State level, and improving access to market, credit and technology for MSMEs, with a focus on green and resilient growth.",
    eligibility:"Delivered mainly through state-level implementation units and MSME support institutions rather than direct individual applications.",
    apply:"Access through state RAMP cells and empanelled implementation agencies.",
    link:"https://www.msme.gov.in"
  },
  {
    code:"CG-08", name:"NSIC Raw Material Assistance Scheme",
    level:"Central", agency:"National Small Industries Corporation",
    industries:["Manufacturing","Engineering","Chemicals & Pharma","Textiles"],
    benefit:"Credit support for raw material procurement, up to 180 days",
    desc:"Helps micro and small enterprises procure both indigenous and imported raw material on credit terms, easing working-capital pressure.",
    eligibility:"Manufacturing MSEs with valid Udyam Registration and a satisfactory financial track record.",
    apply:"Apply at the nearest NSIC branch/zonal office with the raw-material requirement plan.",
    link:"https://www.nsic.co.in"
  },
  {
    code:"CG-09", name:"Micro & Small Enterprises – Cluster Development Programme (MSE-CDP)",
    level:"Central", agency:"Ministry of MSME",
    industries:["Manufacturing","Textiles","Engineering","Traditional Industries"],
    benefit:"Up to 70–90% grant for Common Facility Centres & infrastructure",
    desc:"Grant support for setting up Common Facility Centres (testing, training, raw material banks) and infrastructure development within recognised MSE industrial clusters.",
    eligibility:"Registered clusters/Special Purpose Vehicles of MSEs in an identified product or geographic cluster.",
    apply:"Proposal submitted by the cluster SPV through the state MSME nodal department to the Ministry of MSME.",
    link:"https://www.msme.gov.in"
  },
  {
    code:"CG-10", name:"Scheme of Fund for Regeneration of Traditional Industries (SFURTI)",
    level:"Central", agency:"Ministry of MSME (KVIC)",
    industries:["Traditional Industries","Rural & Traditional","Textiles"],
    benefit:"Grant support up to ₹5 crore per cluster",
    desc:"Organises traditional artisans and rural industries (khadi, coir, handicrafts, bamboo) into clusters, providing common infrastructure, branding and marketing support.",
    eligibility:"Groups of traditional artisans/producers organised through an implementing agency into a registered cluster.",
    apply:"Proposal filed by an implementing agency on the SFURTI portal.",
    link:"https://sfurti.msme.gov.in"
  },
  {
    code:"CG-11", name:"Production Linked Incentive (PLI) Schemes",
    level:"Central", agency:"DPIIT & Sectoral Ministries",
    industries:["Electronics & IT","Chemicals & Pharma","Engineering","Textiles"],
    benefit:"4–18% incentive on incremental sales",
    desc:"Sector-specific incentive on incremental sales of goods manufactured in India, across 14 strategic sectors including electronics, pharma, textiles (technical/MMF), auto components and specialty steel.",
    eligibility:"Sector-specific investment and turnover thresholds; largely oriented to larger manufacturing commitments, with some sub-schemes open to MSMEs.",
    apply:"Sector-wise application windows notified by the concerned ministry (e.g., MeitY, DoP, Ministry of Textiles).",
    link:"https://www.pli-fps.gov.in"
  },
  {
    code:"CG-12", name:"PM Formalisation of Micro Food Processing Enterprises (PM-FME)",
    level:"Central", agency:"Ministry of Food Processing Industries",
    industries:["Food Processing & Agro"],
    benefit:"35% capital subsidy on eligible project cost",
    desc:"Credit-linked capital subsidy for upgrading existing micro food-processing enterprises, along with support for common infrastructure, branding and FSSAI/quality certification.",
    eligibility:"Existing unorganised micro food-processing units (individual or FPO/SHG/cooperative-based) seeking to formalise and upgrade.",
    apply:"Applied through the state Food Processing nodal department / District Resource Person.",
    link:"https://pmfme.mofpi.gov.in"
  },
  {
    code:"CG-13", name:"Stand-Up India Scheme",
    level:"Central", agency:"Ministry of Finance / SIDBI",
    industries:["All Industries","Manufacturing","Services","Trading"],
    benefit:"Bank loans from ₹10 lakh to ₹1 crore",
    desc:"Facilitates bank loans for setting up a greenfield enterprise in manufacturing, services or trading, specifically for SC/ST and women entrepreneurs.",
    eligibility:"At least one SC/ST or woman entrepreneur per bank branch, for a new (greenfield) project; borrower's equity of at least 10%.",
    apply:"Apply via the Stand-Up India portal or directly at scheduled commercial bank branches.",
    link:"https://www.standupmitra.in"
  },
  {
    code:"CG-14", name:"Startup India — DPIIT Recognition & Tax Benefits",
    level:"Central", agency:"DPIIT, Ministry of Commerce & Industry",
    industries:["Startups","All Industries"],
    benefit:"3-year tax holiday (Sec. 80-IAC) + IPR fee rebates",
    desc:"Free DPIIT recognition unlocks a 100% income-tax exemption for any 3 consecutive years within the first 10 years, an 80% patent-fee rebate, 50% trademark-fee rebate, self-certification under labour and environmental laws, and access to the Fund of Funds, Credit Guarantee Scheme for Startups, and Seed Fund Scheme.",
    eligibility:"Private Ltd/LLP/registered partnership, not more than 10 years old, turnover under ₹100 crore in any financial year, working on innovation or a scalable business model.",
    apply:"Apply online and free of cost via the Startup India portal / NSWS; recognition typically processed within a few weeks.",
    link:"https://www.startupindia.gov.in"
  },
  {
    code:"CG-15", name:"Startup India Seed Fund Scheme (SISFS)",
    level:"Central", agency:"DPIIT, Ministry of Commerce & Industry",
    industries:["Startups"],
    benefit:"Grants up to ₹20 lakh + loans up to ₹50 lakh",
    desc:"Provides early-stage funding for proof-of-concept, prototype development and market entry, disbursed through DPIIT-empanelled incubators rather than directly to founders.",
    eligibility:"DPIIT-recognised startup, incorporated not more than 2 years before applying to an incubator, not having received more than ₹10 lakh support from certain other government schemes.",
    apply:"Apply to a DPIIT-empanelled incubator listed on the Startup India portal.",
    link:"https://seedfund.startupindia.gov.in"
  },
  {
    code:"CG-16", name:"RoDTEP — Remission of Duties & Taxes on Exported Products",
    level:"Central", agency:"Department of Revenue / DGFT",
    industries:["Manufacturing","Textiles","Chemicals & Pharma","Engineering"],
    benefit:"Duty remission of ~0.3–4.3% of FOB export value",
    desc:"Refunds embedded central, state and local duties/taxes on exported goods that are not otherwise rebated, credited as a transferable e-scrip on ICEGATE, with rates notified by HS code.",
    eligibility:"Exporters of goods under HS codes notified in Appendix 4R/4RE; excludes items covered under other export-incentive/PLI schemes.",
    apply:"Claimed on ICEGATE at the time of filing the shipping bill; requires the RoDTEP declaration to be ticked.",
    link:"https://www.dgft.gov.in"
  },
  {
    code:"CG-17", name:"Niryat Protsahan — Interest Subvention on Export Credit",
    level:"Central", agency:"DGFT, Ministry of Commerce & Industry",
    industries:["Manufacturing","Textiles","Engineering","Chemicals & Pharma"],
    benefit:"2.75% p.a. interest subvention, up to ₹50 lakh/exporter/year",
    desc:"Reduces the cost of pre- and post-shipment rupee export credit for MSME manufacturer and merchant exporters, under the Export Promotion Mission announced in Budget 2025-26, succeeding the earlier Interest Equalisation Scheme.",
    eligibility:"MSME exporters (manufacturer or merchant) exporting under a notified positive list of HSN tariff lines; excludes items already covered by RoDTEP/RoSCTL/PLI.",
    apply:"Applied for through the exporter's bank/lending institution under the DGFT-notified process.",
    link:"https://www.dgft.gov.in"
  },
  {
    code:"CG-18", name:"PLI Scheme for Automobile & Auto Components",
    level:"Central", agency:"Ministry of Heavy Industries",
    industries:["Auto & Auto Components","Engineering","Manufacturing"],
    benefit:"Incentive on incremental sales of Advanced Automotive Technology products",
    desc:"₹25,938 crore outlay (FY2022-23 to FY2026-27) rewarding incremental sales of Advanced Automotive Technology vehicles and components, with a specific focus on Zero Emission Vehicles — battery electric and hydrogen fuel-cell.",
    eligibility:"Automobile and auto-component manufacturers investing in eligible Advanced Automotive Technology products, subject to approved applicant status.",
    apply:"Apply through the Ministry of Heavy Industries PLI-Auto application window.",
    link:"https://heavyindustries.gov.in"
  },
  {
    code:"GJ-01", name:"Scheme for Assistance to Micro, Small & Medium Enterprises (MSME)",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["All Industries","Manufacturing"],
    benefit:"Capital investment, interest & CGTMSE-fee subsidy",
    desc:"Core Gujarat MSME support under the state Industrial Policy — capital investment subsidy, interest subsidy on term loans, and reimbursement of CGTMSE guarantee fees for eligible new and expanding MSME units.",
    eligibility:"New or expanding manufacturing MSME units set up in Gujarat with a valid Udyam Registration.",
    apply:"Online through the MSME Gujarat portal / iNDEXTb single window; supporting GR No. GID/102020/326692/G.",
    link:"https://msme.gujarat.gov.in"
  },
  {
    code:"GJ-02", name:"Assistance to GIDC for Multi-Storeyed Sheds for MSEs",
    level:"Gujarat", agency:"Industries & Mines Dept. / GIDC",
    industries:["Manufacturing","Engineering"],
    benefit:"Subsidised built-up shed space for micro & small units",
    desc:"Supports development of multi-storeyed industrial sheds in GIDC estates so that land-constrained micro and small enterprises can access affordable, ready-to-use built-up space.",
    eligibility:"Micro and small enterprises seeking shed space within notified GIDC estates.",
    apply:"Apply through the concerned GIDC regional office / iNDEXTb portal.",
    link:"https://gidc.gujarat.gov.in"
  },
  {
    code:"GJ-03", name:"Market Development Assistance to MSMEs",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["All Industries","Manufacturing","Textiles"],
    benefit:"Reimbursement for exhibition & trade-fair participation",
    desc:"Reimbursement of costs for MSME participation in state, national and international exhibitions and trade fairs, to help Gujarat units access new markets.",
    eligibility:"Gujarat-registered MSME manufacturing units participating in a recognised exhibition/trade fair.",
    apply:"Reimbursement claim filed with supporting bills through the MSME Gujarat portal; GR No. SSI/102020/332349/CH.",
    link:"https://msme.gujarat.gov.in"
  },
  {
    code:"GJ-04", name:"Scheme of Assistance for Environment Protection Measures",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Manufacturing","Chemicals & Pharma","Engineering"],
    benefit:"Subsidy on pollution-control & ZED-linked investment",
    desc:"Financial assistance towards effluent treatment, pollution-control equipment and environment compliance investment, including support linked to ZED certification for MSMEs.",
    eligibility:"MSME manufacturing units investing in approved environment-protection or pollution-control equipment.",
    apply:"Apply through the MSME Gujarat portal with technical approval from GPCB where applicable.",
    link:"https://msme.gujarat.gov.in"
  },
  {
    code:"GJ-05", name:"Scheme of Assistance for Research & Development Activities",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Manufacturing","Chemicals & Pharma","Engineering","Electronics & IT"],
    benefit:"Assistance up to ₹50 lakh for approved R&D projects",
    desc:"Supports MSMEs undertaking in-house or collaborative R&D for product/process innovation, including part-support for technical manpower engaged on the project.",
    eligibility:"MSME units in Gujarat carrying out an approved R&D project, generally with an academic/research institution linkage.",
    apply:"Apply through the MSME Gujarat portal with a detailed project proposal.",
    link:"https://msme.gujarat.gov.in"
  },
  {
    code:"GJ-06", name:"Scheme for Assistance to MSEs for Shed Developed by Private Developer",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Manufacturing"],
    benefit:"Subsidy support for units in privately developed sheds",
    desc:"Extends MSME assistance benefits to micro and small units operating out of industrial sheds built by approved private developers, widening access beyond GIDC estates.",
    eligibility:"MSEs operating from a shed built by an approved private industrial park/shed developer.",
    apply:"Apply through the MSME Gujarat portal along with shed occupancy proof.",
    link:"https://msme.gujarat.gov.in"
  },
  {
    code:"GJ-07", name:"Scheme of Assistance for Common Environment Infrastructure",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Manufacturing","Chemicals & Pharma"],
    benefit:"Grant support for shared CETP/CTF infrastructure",
    desc:"Assistance for creating Common Effluent Treatment Plants and other shared environmental infrastructure serving industrial estates and clusters.",
    eligibility:"Industry associations, SPVs or estate authorities setting up shared environmental infrastructure.",
    apply:"Proposal filed with the Industries & Mines Department; GR No. GID/102020/326692/G.",
    link:"https://msme.gujarat.gov.in"
  },
  {
    code:"GJ-08", name:"Viksit Gujarat Industrial Policy 2026 — Sector Incentives",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["All Industries","Manufacturing","Services"],
    benefit:"Capital, interest, land & employment-linked incentives",
    desc:"The state's five-year industrial framework effective 1 June 2026, covering MSME incentives, startup support, workforce-housing assistance, R&D support and sector-specific benefits for large, mega and ultra-mega projects, alongside a strengthened Single Window Clearance system.",
    eligibility:"New and expanding industrial units in Gujarat; incentive slabs vary by investment size, sector and taluka category.",
    apply:"Apply through the Gujarat Single Window Clearance system on the iNDEXTb portal.",
    link:"https://indextb.com"
  },
  {
    code:"GJ-09", name:"Gujarat Textile Policy 2024 (2024–2029)",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Textiles"],
    benefit:"Capital, interest & power-tariff subsidy for textile units",
    desc:"Dedicated five-year policy (1 Oct 2024 – 30 Sep 2029) for the textile and apparel value chain — spinning, weaving, processing, garmenting and technical textiles — with capital subsidy, interest subvention and power-cost support.",
    eligibility:"New and expanding textile-value-chain units set up in Gujarat during the policy period.",
    apply:"Apply through the iNDEXTb Single Window Clearance portal.",
    link:"https://indextb.com/policy"
  },
  {
    code:"GJ-10", name:"Gujarat IT/ITeS Policy 2022–27",
    level:"Gujarat", agency:"Dept. of Science & Technology, Govt. of Gujarat",
    industries:["Electronics & IT","Services"],
    benefit:"Capital subsidy, lease rental & power-tariff assistance",
    desc:"Incentives for IT/ITeS companies setting up or expanding in Gujarat, including capital investment subsidy, lease-rental reimbursement, power-tariff subsidy and support for GCC/data-centre investment.",
    eligibility:"IT/ITeS/data-centre/GCC units establishing operations in Gujarat during the policy period.",
    apply:"Apply through the Gujarat IT/ITeS single window facilitation cell.",
    link:"https://indextb.com/policy"
  },
  {
    code:"GJ-11", name:"Gujarat Electronics Policy 2022–28",
    level:"Gujarat", agency:"Dept. of Science & Technology, Govt. of Gujarat",
    industries:["Electronics & IT","Manufacturing"],
    benefit:"Capital subsidy, EMC support & PLI top-up incentives",
    desc:"Supports electronics system design and manufacturing (ESDM) — including a companion Electronics Component Manufacturing Policy — with capital subsidy, quality-certification support and top-up incentives layered on central PLI schemes.",
    eligibility:"ESDM/electronics-component manufacturing units investing in Gujarat during the policy period.",
    apply:"Apply through the iNDEXTb Single Window Clearance portal.",
    link:"https://indextb.com/policy"
  },
  {
    code:"GJ-12", name:"Gujarat Biotechnology Policy 2022–27",
    level:"Gujarat", agency:"Dept. of Science & Technology, Govt. of Gujarat",
    industries:["Chemicals & Pharma"],
    benefit:"Capital, R&D and clinical-trial cost support",
    desc:"Incentivises biotech, pharma and life-sciences manufacturing and R&D investment in Gujarat, including support for common bio-incubation infrastructure and product development costs.",
    eligibility:"Biotechnology, pharmaceutical and life-sciences units setting up or expanding in Gujarat.",
    apply:"Apply through the iNDEXTb Single Window Clearance portal.",
    link:"https://indextb.com/policy"
  },
  {
    code:"GJ-13", name:"Gujarat Renewable Energy Policy 2023",
    level:"Gujarat", agency:"Gujarat Energy Development Agency (GEDA)",
    industries:["Renewable Energy","Manufacturing"],
    benefit:"Land, banking & wheeling incentives for RE projects",
    desc:"Promotes solar, wind and hybrid renewable-energy generation in Gujarat, including for captive industrial use, with incentives on land allotment, power banking, wheeling and open access.",
    eligibility:"Developers and industrial units setting up renewable-energy generation for sale or captive consumption.",
    apply:"Apply through GEDA / Gujarat Urja Vikas Nigam Limited (GUVNL).",
    link:"https://geda.gujarat.gov.in"
  },
  {
    code:"GJ-14", name:"Startup Gujarat — Seed & Acceleration Support",
    level:"Gujarat", agency:"Industries & Mines Dept. (Startup Gujarat Portal)",
    industries:["Startups","Electronics & IT","Services"],
    benefit:"Seed funding, market development & acceleration grants",
    desc:"Supports registered startups with seed-stage funding, reimbursement for market-development exhibitions abroad, and sponsored acceleration-programme participation, under the state Industrial Policy startup provisions.",
    eligibility:"DPIIT-recognised startups incorporated and primarily operating in Gujarat.",
    apply:"Apply and track status via the Startup Gujarat portal.",
    link:"https://startup.gujarat.gov.in"
  },
  {
    code:"GJ-15", name:"Scheme for Financial Assistance by way of Net SGST Reimbursement",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Manufacturing","Chemicals & Pharma","Engineering","Textiles"],
    benefit:"Net SGST reimbursement up to 80%, over 7–10 years",
    desc:"Core state incentive reimbursing a share of net SGST paid, alongside capital and interest subsidy, electricity duty exemption and EPF reimbursement, for new and expanding MSME, large, mega and ultra-mega industrial units under the Aatmanirbhar Gujarat / Industrial Policy incentive framework.",
    eligibility:"New or expanding industrial undertakings in Gujarat; incentive slabs vary by category of taluka (industrially developing vs. developed) and investment size.",
    apply:"Apply through the iNDEXTb Single Window Clearance system for a Final Eligibility Certificate.",
    link:"https://indextb.com"
  },
  {
    code:"GJ-16", name:"Morbi Ceramic Cluster — Technology & Infrastructure Upgradation Support",
    level:"Gujarat", agency:"Industries & Mines Dept. / Industries Commissionerate, Gujarat",
    industries:["Ceramics & Traditional Crafts","Manufacturing"],
    benefit:"State incentive package (₹115+ crore disbursed to 2,200+ units)",
    desc:"State support for the Morbi ceramics cluster — India's largest, with an 80–90% share of national ceramic exports — covering technology upgradation, automation, renewable-energy adoption, waste recycling and logistics support, alongside the upcoming Ceramic Park at Morbi.",
    eligibility:"Ceramic manufacturing units within the Morbi cluster and allied units at the upcoming Ceramic Park.",
    apply:"Apply through the Industries Commissionerate, Gujarat, and the iNDEXTb Ceramic Park project office.",
    link:"https://ic.gujarat.gov.in"
  },
  {
    code:"GJ-17", name:"Gujarat Plastics Industry Policy Incentives",
    level:"Gujarat", agency:"Industries & Mines Dept., Govt. of Gujarat",
    industries:["Plastics & Polymers","Manufacturing"],
    benefit:"7% p.a. interest subsidy (up to ₹1 crore/year) + SGST reimbursement",
    desc:"Incentivises plastic-product manufacturing units (using polyolefins, PVC, nylon, polyester and similar polymers as primary raw material) with an interest subsidy on term loans and net SGST reimbursement of up to 80% over 7 years.",
    eligibility:"Units primarily engaged in manufacturing plastic products, meeting Gujarat-domicile employment norms (85% of workforce).",
    apply:"Apply through the Industries Commissionerate / iNDEXTb single window.",
    link:"https://ic.gujarat.gov.in"
  },
];
```

Industry filter list (chips, in this order): All Industries, Manufacturing, Textiles, Food Processing & Agro, Engineering, Chemicals & Pharma, Electronics & IT, Renewable Energy, Traditional Industries, Rural & Traditional, Services, Startups, Trading, Ceramics & Traditional Crafts, Plastics & Polymers, Auto & Auto Components.

## Footer disclaimer text (use verbatim)

> **Udyog Sahay** is an independent reference compiled for informational purposes only. Scheme names, subsidy rates, ceilings and eligibility norms are revised by government notification from time to time — always verify current terms on the issuing department's official portal or with a professional advisor before applying or relying on any figure shown here. This is not an official government website and does not process applications.

## Modal disclaimer text (use verbatim, shown in every scheme's detail view)

> Figures and eligibility conditions are indicative and subject to periodic government revision. Verify current terms on the official portal or with your Chartered Accountant before relying on this for a business decision.

## Technical notes

- No backend/database needed — all scheme data lives in the frontend as static structured data
- The contact form has no server — it should build a `mailto:` link on submit, pre-filled with subject and body from the form fields, and navigate the browser to it
- Site should work as a fully static build (deployable anywhere)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/51d8825a-c312-4f23-b835-ab7312a1e6c9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
