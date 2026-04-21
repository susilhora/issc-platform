const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const countries = [
  {
    name: 'Australia', slug: 'australia',
    description: 'Australia is home to world-class universities and a multicultural student community. Known for its high quality of life, post-study work rights, and strong job market.',
    tuitionMin: 18000, tuitionMax: 45000, livingCost: 21000,
    universities: [
      { name: 'University of Melbourne', city: 'Melbourne' },
      { name: 'University of Sydney', city: 'Sydney' },
      { name: 'Australian National University', city: 'Canberra' },
      { name: 'University of Queensland', city: 'Brisbane' },
      { name: 'Monash University', city: 'Melbourne' },
      { name: 'UNSW Sydney', city: 'Sydney' },
      { name: 'University of Western Australia', city: 'Perth' },
      { name: 'University of Adelaide', city: 'Adelaide' },
      { name: 'Queensland University of Technology', city: 'Brisbane' },
      { name: 'Deakin University', city: 'Melbourne' },
      { name: 'La Trobe University', city: 'Melbourne' },
      { name: 'RMIT University', city: 'Melbourne' },
      { name: 'Macquarie University', city: 'Sydney' },
      { name: 'University of Newcastle', city: 'Newcastle' },
      { name: 'Curtin University', city: 'Perth' },
      { name: 'Griffith University', city: 'Brisbane' },
      { name: 'University of South Australia', city: 'Adelaide' },
      { name: 'Swinburne University of Technology', city: 'Melbourne' },
      { name: 'James Cook University', city: 'Townsville' },
      { name: 'Victoria University', city: 'Melbourne' },
      { name: 'Southern Cross University', city: 'Lismore' },
      { name: 'Charles Darwin University', city: 'Darwin' },
      { name: 'University of Tasmania', city: 'Hobart' },
      { name: 'Western Sydney University', city: 'Sydney' },
      { name: 'University of Canberra', city: 'Canberra' },
      { name: 'Bond University', city: 'Gold Coast' },
      { name: 'Torrens University Australia', city: 'Adelaide' },
      { name: 'Charles Sturt University', city: 'Wagga Wagga' },
      { name: 'Edith Cowan University', city: 'Perth' },
      { name: 'Federation University Australia', city: 'Ballarat' },
    ],
    visaSteps: [
      { stepNumber: 1, title: 'Obtain Confirmation of Enrolment (CoE)', description: 'Apply and receive acceptance from your chosen Australian institution. The university will issue your CoE, which is mandatory for the student visa application.', is_expert_tip: false },
      { stepNumber: 2, title: 'Get Overseas Student Health Cover (OSHC)', description: 'Purchase OSHC before applying for your visa. OSHC is mandatory for the entire duration of your stay in Australia. KIEC recommends Medibank or Bupa for coverage.', is_expert_tip: true },
      { stepNumber: 3, title: 'Gather Financial Evidence', description: 'You must prove sufficient funds: tuition fees + AUD 21,041 per year living costs + travel costs. Bank statements should be from the last 3-6 months in the applicant\'s name.', is_expert_tip: false },
      { stepNumber: 4, title: 'Lodge Student Visa (Subclass 500) Online', description: 'Create an ImmiAccount at homeaffairs.gov.au and submit your online application. Attach your CoE, OSHC certificate, English proficiency results, and financial evidence.', is_expert_tip: false },
      { stepNumber: 5, title: 'Complete Biometrics Collection', description: 'After submitting your application, you will be asked to provide biometric data (fingerprints and photo) at a designated collection center in Nepal.', is_expert_tip: false },
      { stepNumber: 6, title: 'Receive Visa Grant Notice', description: 'Processing typically takes 4-6 weeks. Once granted, you will receive an electronic visa grant notice. Print it and carry it with your passport.', is_expert_tip: true },
    ],
    scholarships: [
      { name: 'Australia Awards Scholarship', amount: 'Full Tuition + Living Allowance', description: 'Funded by the Australian Government for students from developing countries. Covers tuition, return airfare, and living costs.' },
      { name: 'Research Training Program (RTP)', amount: 'Full Tuition Waiver', description: 'For domestic and international students undertaking research higher degrees (PhD or Masters by Research) at Australian universities.' },
      { name: 'Destination Australia', amount: 'AUD 15,000/year', description: 'Supports international students studying in regional Australia. Offered by participating institutions in regional areas.' },
    ],
    sops: [
      { title: 'Australia IT Masters SOP', category: 'Australia | Master | IT', content: 'I am writing to express my sincere interest in the Master of Information Technology program at your esteemed institution. With a Bachelor\'s degree in Computer Science from Tribhuvan University and three years of professional experience as a software developer in Kathmandu, I have developed a strong foundation in programming, system design, and database management.\n\nAustralia\'s technology sector has been experiencing rapid growth, and I am drawn to the opportunity to specialize in Artificial Intelligence and Machine Learning — fields that are reshaping industries globally. Your university\'s IT program, with its emphasis on applied research and industry partnerships, aligns perfectly with my academic and professional ambitions.\n\nMy goal upon completing this degree is to contribute to the development of AI-driven solutions for the education sector in Nepal. I am confident that the skills and global perspective I gain in Australia will be invaluable in achieving this vision. I am fully committed to returning to Nepal and applying my learnings to contribute to its growing technology ecosystem.' },
      { title: 'Australia Business MBA SOP', category: 'Australia | Master | Business', content: 'The MBA program at your institution represents the ideal next step in my professional journey. With five years of experience managing operations at a mid-sized manufacturing company in Nepal, I have developed a strong understanding of business strategy, supply chain management, and team leadership.\n\nHowever, I recognize that to lead an organization in today\'s globalized economy, I must deepen my understanding of international finance, strategic management, and entrepreneurship. Australia\'s dynamic business environment and its strong trade ties with the Asia-Pacific region make it the perfect place to gain this perspective.\n\nI intend to leverage the skills gained through this MBA to launch a sustainable agro-processing enterprise in Nepal upon my return, creating employment opportunities and contributing to the country\'s export economy.' },
    ],
  },
  {
    name: 'United Kingdom', slug: 'uk',
    description: 'The UK offers some of the world\'s most prestigious universities with focused one-year master\'s programs. Home to Oxford, Cambridge, and a rich academic tradition spanning centuries.',
    tuitionMin: 14000, tuitionMax: 38000, livingCost: 12000,
    universities: [
      { name: 'University of Oxford', city: 'Oxford' },
      { name: 'University of Cambridge', city: 'Cambridge' },
      { name: 'Imperial College London', city: 'London' },
      { name: 'University College London (UCL)', city: 'London' },
      { name: 'University of Edinburgh', city: 'Edinburgh' },
      { name: 'King\'s College London', city: 'London' },
      { name: 'University of Manchester', city: 'Manchester' },
      { name: 'University of Bristol', city: 'Bristol' },
      { name: 'University of Warwick', city: 'Coventry' },
      { name: 'University of Glasgow', city: 'Glasgow' },
      { name: 'University of Birmingham', city: 'Birmingham' },
      { name: 'University of Sheffield', city: 'Sheffield' },
      { name: 'University of Leeds', city: 'Leeds' },
      { name: 'University of Exeter', city: 'Exeter' },
      { name: 'University of Nottingham', city: 'Nottingham' },
      { name: 'Coventry University', city: 'Coventry' },
      { name: 'University of Hertfordshire', city: 'Hatfield' },
      { name: 'Northumbria University', city: 'Newcastle' },
      { name: 'London South Bank University', city: 'London' },
      { name: 'Brunel University London', city: 'London' },
      { name: 'University of Greenwich', city: 'London' },
      { name: 'University of East London', city: 'London' },
      { name: 'Kingston University', city: 'London' },
      { name: 'Middlesex University', city: 'London' },
      { name: 'Anglia Ruskin University', city: 'Cambridge' },
      { name: 'University of Huddersfield', city: 'Huddersfield' },
      { name: 'University of Sunderland', city: 'Sunderland' },
      { name: 'Robert Gordon University', city: 'Aberdeen' },
      { name: 'Glasgow Caledonian University', city: 'Glasgow' },
      { name: 'University of the West of Scotland', city: 'Paisley' },
    ],
    visaSteps: [
      { stepNumber: 1, title: 'Receive Unconditional Offer Letter', description: 'You must hold an unconditional offer from a UK Visas and Immigration (UKVI) licensed sponsor institution before applying for your Student Visa (previously Tier 4).', is_expert_tip: false },
      { stepNumber: 2, title: 'Secure a CAS (Confirmation of Acceptance for Studies)', description: 'Your university will issue a CAS number once they have your deposit. This unique reference number is essential for your visa application and links your enrollment to your visa.', is_expert_tip: true },
      { stepNumber: 3, title: 'Prove English Proficiency (IELTS UKVI)', description: 'You must take an approved SELT (Secure English Language Test). The standard requirement is IELTS Academic 6.0-6.5 overall. Ensure your test is the UKVI-approved version.', is_expert_tip: true },
      { stepNumber: 4, title: 'Show Financial Evidence', description: 'Prove you have enough funds to cover your course fees plus living costs (£1,334/month for courses outside London; £1,023/month outside London) for up to 9 months.', is_expert_tip: false },
      { stepNumber: 5, title: 'Apply for Student Visa Online', description: 'Apply online at gov.uk. You will need to create an account, provide your CAS, financial documents, and book an appointment at a UK Visa Application Centre in Nepal.', is_expert_tip: false },
      { stepNumber: 6, title: 'Attend Biometrics Appointment', description: 'Visit the VFS Global application center in Kathmandu to submit your biometrics and documents. The centre is located in New Baneshwor, Kathmandu.', is_expert_tip: false },
    ],
    scholarships: [
      { name: 'Chevening Scholarship', amount: 'Full Funding', description: 'UK Government\'s global scholarship programme. Covers tuition, living allowance, and return flights for outstanding students worldwide.' },
      { name: 'Commonwealth Scholarship', amount: 'Full Funding', description: 'For students from Commonwealth countries to study at UK universities. Covers tuition, airfare, and a living allowance.' },
      { name: 'GREAT Scholarships', amount: '£10,000+', description: 'British Council scholarship in partnership with UK universities. Multiple scholarships available for Nepali students each year.' },
    ],
    sops: [
      { title: 'UK Nursing MSc SOP', category: 'UK | Master | Health', content: 'I am applying for the MSc Advanced Nursing Practice programme with the goal of elevating patient care standards in Nepal\'s healthcare system. With a BSc Nursing degree and four years of clinical experience at a tertiary hospital in Kathmandu, I have witnessed firsthand the critical need for advanced clinical expertise and evidence-based practice.\n\nThe UK\'s NHS system represents the gold standard in universal healthcare, and your university\'s programme — accredited by the Nursing and Midwifery Council — offers a curriculum that bridges theoretical knowledge with real-world clinical application. The opportunity to study in a system that serves over 60 million people will expose me to complex cases, diverse patient demographics, and cutting-edge medical technology.\n\nI plan to return to Nepal upon completion and contribute to the improvement of nursing protocols and education at the national level.' },
    ],
  },
  {
    name: 'Canada', slug: 'canada',
    description: 'Canada offers world-class education with a pathway to permanent residency through the Post-Graduation Work Permit (PGWP). Known for its safe, multicultural cities and strong job market.',
    tuitionMin: 15000, tuitionMax: 40000, livingCost: 15000,
    universities: [
      { name: 'University of Toronto', city: 'Toronto' },
      { name: 'University of British Columbia', city: 'Vancouver' },
      { name: 'McGill University', city: 'Montreal' },
      { name: 'University of Alberta', city: 'Edmonton' },
      { name: 'McMaster University', city: 'Hamilton' },
      { name: 'University of Waterloo', city: 'Waterloo' },
      { name: 'Western University', city: 'London' },
      { name: 'University of Ottawa', city: 'Ottawa' },
      { name: 'University of Calgary', city: 'Calgary' },
      { name: 'Dalhousie University', city: 'Halifax' },
      { name: 'Humber College', city: 'Toronto' },
      { name: 'George Brown College', city: 'Toronto' },
      { name: 'Seneca College', city: 'Toronto' },
      { name: 'Centennial College', city: 'Toronto' },
      { name: 'Conestoga College', city: 'Waterloo' },
      { name: 'British Columbia Institute of Technology (BCIT)', city: 'Burnaby' },
      { name: 'Langara College', city: 'Vancouver' },
      { name: 'Douglas College', city: 'New Westminster' },
      { name: 'Algonquin College', city: 'Ottawa' },
      { name: 'Fanshawe College', city: 'London' },
      { name: 'Sheridan College', city: 'Oakville' },
      { name: 'Durham College', city: 'Oshawa' },
      { name: 'Northern College', city: 'Timmins' },
      { name: 'Niagara College', city: 'Niagara-on-the-Lake' },
      { name: 'Cambrian College', city: 'Sudbury' },
      { name: 'Saskatchewan Polytechnic', city: 'Saskatoon' },
      { name: 'NAIT (Northern Alberta Institute of Technology)', city: 'Edmonton' },
      { name: 'SAIT Polytechnic', city: 'Calgary' },
      { name: 'Red River College Polytechnic', city: 'Winnipeg' },
      { name: 'University of Manitoba', city: 'Winnipeg' },
    ],
    visaSteps: [
      { stepNumber: 1, title: 'Receive Letter of Acceptance (LOA)', description: 'Apply to your chosen Designated Learning Institution (DLI) and receive an unconditional Letter of Acceptance. Only students enrolled at a DLI are eligible for a Canadian Student Permit.', is_expert_tip: false },
      { stepNumber: 2, title: 'Apply for a Study Permit Online', description: 'Apply through the IRCC (Immigration, Refugees and Citizenship Canada) online portal. You will need your LOA, proof of identity, financial documents, and a Statement of Purpose.', is_expert_tip: false },
      { stepNumber: 3, title: 'Provide Biometrics', description: 'Most applicants from Nepal must provide biometrics (fingerprints and photo) after submitting their online application. Visit the VFS Global center in Kathmandu.', is_expert_tip: false },
      { stepNumber: 4, title: 'Demonstrate Financial Capability', description: 'Prove you can afford tuition + CAD 10,000 for living expenses for the first year. Funds must be in a personal or parent\'s bank account, not a fixed deposit.', is_expert_tip: true },
      { stepNumber: 5, title: 'Get a Port of Entry (POE) Letter', description: 'If approved, you will receive a Letter of Introduction. You will get your actual Study Permit at the Canadian port of entry upon arrival, so carry all original documents.', is_expert_tip: true },
    ],
    scholarships: [
      { name: 'Vanier Canada Graduate Scholarship', amount: 'CAD 50,000/year', description: 'For doctoral students demonstrating academic excellence and leadership. Tenable at Canadian universities for three years.' },
      { name: 'Banting Postdoctoral Fellowship', amount: 'CAD 70,000/year', description: 'For exceptional postdoctoral researchers in health research, natural sciences, engineering, and social sciences.' },
      { name: 'Ontario Graduate Scholarship', amount: 'CAD 15,000', description: 'Merit-based scholarship for graduate students at publicly-assisted universities in Ontario.' },
    ],
    sops: [
      { title: 'Canada Supply Chain Management SOP', category: 'Canada | Post-Graduate | Business', content: 'I am applying for the Post-Graduate Certificate in Supply Chain Management at your institution, motivated by a deep desire to modernize Nepal\'s nascent logistics infrastructure.\n\nHaving completed a Bachelor\'s in Business Studies and worked for two years in procurement at a leading FMCG company in Kathmandu, I have developed practical insights into the inefficiencies that plague supply chains in developing economies: poor inventory management, unreliable supplier networks, and a lack of data-driven decision-making.\n\nCanada\'s global trade relationships and its position as a leader in logistics technology make it the ideal environment to study these challenges. Upon completion, I plan to return to Nepal and apply global supply chain best practices to help Nepali businesses compete on the international stage. The Post-Graduation Work Permit (PGWP) will also allow me to gain valuable Canadian industry experience before returning home.' },
    ],
  },
  {
    name: 'USA', slug: 'usa',
    description: 'The USA is home to the world\'s top-ranked universities and offers unmatched research opportunities. Known for its OPT/CPT work programs and a vibrant campus culture.',
    tuitionMin: 20000, tuitionMax: 55000, livingCost: 18000,
    universities: [
      { name: 'Massachusetts Institute of Technology (MIT)', city: 'Cambridge, MA' },
      { name: 'Stanford University', city: 'Stanford, CA' },
      { name: 'Harvard University', city: 'Cambridge, MA' },
      { name: 'California Institute of Technology (Caltech)', city: 'Pasadena, CA' },
      { name: 'University of Chicago', city: 'Chicago, IL' },
      { name: 'Columbia University', city: 'New York, NY' },
      { name: 'University of Pennsylvania', city: 'Philadelphia, PA' },
      { name: 'Yale University', city: 'New Haven, CT' },
      { name: 'Princeton University', city: 'Princeton, NJ' },
      { name: 'Cornell University', city: 'Ithaca, NY' },
      { name: 'University of California, Los Angeles (UCLA)', city: 'Los Angeles, CA' },
      { name: 'University of California, Berkeley', city: 'Berkeley, CA' },
      { name: 'University of Michigan', city: 'Ann Arbor, MI' },
      { name: 'New York University (NYU)', city: 'New York, NY' },
      { name: 'University of Texas at Austin', city: 'Austin, TX' },
      { name: 'Georgia Institute of Technology', city: 'Atlanta, GA' },
      { name: 'University of Illinois Urbana-Champaign', city: 'Champaign, IL' },
      { name: 'University of Washington', city: 'Seattle, WA' },
      { name: 'Arizona State University', city: 'Tempe, AZ' },
      { name: 'Purdue University', city: 'West Lafayette, IN' },
      { name: 'University of Minnesota', city: 'Minneapolis, MN' },
      { name: 'Ohio State University', city: 'Columbus, OH' },
      { name: 'University of Florida', city: 'Gainesville, FL' },
      { name: 'Pennsylvania State University', city: 'University Park, PA' },
      { name: 'Northeastern University', city: 'Boston, MA' },
      { name: 'University of Southern California (USC)', city: 'Los Angeles, CA' },
      { name: 'Drexel University', city: 'Philadelphia, PA' },
      { name: 'Suffolk University', city: 'Boston, MA' },
      { name: 'Webster University', city: 'Webster Groves, MO' },
      { name: 'Wichita State University', city: 'Wichita, KS' },
    ],
    visaSteps: [
      { stepNumber: 1, title: 'Receive I-20 from Your University', description: 'After receiving your acceptance letter and paying the enrollment deposit, your university\'s international office will issue your I-20 form. This is the foundational document for your F-1 student visa.', is_expert_tip: false },
      { stepNumber: 2, title: 'Pay the SEVIS I-901 Fee', description: 'Pay the Student and Exchange Visitor Information System (SEVIS) fee of $350 online at fmjfee.com. Keep the payment confirmation — you must present it at your visa interview.', is_expert_tip: true },
      { stepNumber: 3, title: 'Complete DS-160 Online Application', description: 'Fill out the DS-160 non-immigrant visa application at ceac.state.gov. Upload a compliant photo (white background, 2x2 inches). Print the DS-160 confirmation page.', is_expert_tip: false },
      { stepNumber: 4, title: 'Schedule Visa Interview at US Embassy', description: 'Schedule your F-1 visa interview at the U.S. Embassy in Kathmandu (Maharajgunj). Book early — appointment slots fill up quickly, especially between April and July.', is_expert_tip: true },
      { stepNumber: 5, title: 'Attend F-1 Visa Interview', description: 'Bring your I-20, DS-160 confirmation, SEVIS fee receipt, financial documents, acceptance letter, and academic transcripts. Dress professionally. Interviews are short — be concise and confident about your study plan and intent to return to Nepal.', is_expert_tip: false },
    ],
    scholarships: [
      { name: 'Fulbright Foreign Student Program', amount: 'Full Funding', description: 'Prestigious scholarship funded by the U.S. Government covering full tuition, living stipend, and round-trip travel for graduate study in the USA.' },
      { name: 'Hubert H. Humphrey Fellowship', amount: 'Full Funding', description: 'For experienced professionals seeking to strengthen their leadership skills through academic coursework and professional collaboration at U.S. universities.' },
      { name: 'Merit-Based Institutional Scholarships', amount: 'USD 5,000 - 30,000/year', description: 'Many U.S. universities offer merit scholarships to international students with strong academic profiles (GPA 3.5+, IELTS 7.0+, GRE/GMAT scores).' },
    ],
    sops: [
      { title: 'USA Computer Science MS SOP', category: 'USA | Master | IT', content: 'It is with great enthusiasm that I apply for the MS in Computer Science program at your university. My passion for computing began during my undergraduate studies in Engineering at Kathmandu University, where I completed a research thesis on lightweight cryptographic algorithms for IoT devices.\n\nThe United States remains the undisputed global leader in technology innovation, and your university\'s research lab — particularly its work in distributed systems and cybersecurity — makes it my first choice. I am particularly interested in working under Professor [X]\'s research group on network security protocols.\n\nWith the growing digitization of Nepal\'s financial sector, the cybersecurity expertise I develop here will be instrumental in helping Nepali banks and fintech companies protect against emerging threats. My long-term vision is to establish a cybersecurity research center at a Nepali university that bridges academic research and industry practice.' },
      { title: 'USA Public Health MPH SOP', category: 'USA | Master | Health', content: 'Nepal\'s healthcare system faces enormous challenges: geographic isolation, inadequate infrastructure, and limited trained medical professionals. I have spent the last three years working as a public health officer in the Karnali province, one of Nepal\'s most underserved regions, and I have witnessed the life-or-death impact of these systemic gaps.\n\nThe Master of Public Health program at your university, with its specialization in Global Health and Epidemiology, will equip me with the evidence-based tools and international perspective needed to design and implement scalable health interventions in resource-limited settings.\n\nI am particularly drawn to your faculty\'s expertise in infectious disease epidemiology and health systems strengthening — areas directly relevant to Nepal\'s post-COVID recovery priorities. I intend to return to Nepal and work with the Ministry of Health and Population to design community-based health programs.' },
    ],
  },
];

async function main() {
  console.log('Seeding the KIEC database with real institutional data...');

  // Clear existing data
  await prisma.documentTemplate.deleteMany();
  await prisma.scholarship.deleteMany();
  await prisma.visaRoadmap.deleteMany();
  await prisma.costEstimate.deleteMany();
  await prisma.university.deleteMany();
  await prisma.country.deleteMany();

  for (const c of countries) {
    const country = await prisma.country.create({
      data: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        universities: {
          create: c.universities.map(u => ({ name: u.name, city: u.city })),
        },
        costEstimates: {
          create: [{ tuitionMin: c.tuitionMin, tuitionMax: c.tuitionMax, livingCost: c.livingCost }],
        },
        visaRoadmaps: {
          create: c.visaSteps,
        },
        scholarships: {
          create: c.scholarships,
        },
      },
    });
    console.log(`  ✓ ${country.name} — ${c.universities.length} universities, ${c.visaSteps.length} visa steps`);
  }

  // Seed all SOPs from all countries
  const allSOPs = countries.flatMap(c => c.sops);
  await prisma.documentTemplate.createMany({ data: allSOPs });
  console.log(`  ✓ ${allSOPs.length} SOP templates seeded`);

  const uCount = await prisma.university.count();
  const tCount = await prisma.documentTemplate.count();
  console.log(`\nDatabase successfully seeded!`);
  console.log(`  Universities: ${uCount}`);
  console.log(`  Countries:    ${countries.length}`);
  console.log(`  SOP Templates: ${tCount}`);
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
