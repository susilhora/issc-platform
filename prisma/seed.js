const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database with realistic KIEC records...');

  // --- Countries ---
  const countriesData = [
    { name: 'Australia', slug: 'australia', description: 'Top destination for quality education and post-study work rights.' },
    { name: 'United Kingdom', slug: 'uk', description: 'Home to world-renowned universities and a vibrant culture.' },
    { name: 'United States', slug: 'usa', description: 'Unparalleled academic flexibility and global career opportunities.' },
    { name: 'Canada', slug: 'canada', description: 'Welcoming environment with excellent pathways to permanent residency.' }
  ];

  const countries = {};
  for (const c of countriesData) {
    countries[c.slug] = await prisma.country.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // --- Cost Estimates ---
  const costEstimates = [
    { tuitionMin: 25000, tuitionMax: 45000, livingCost: 21000, countryId: countries['australia'].id },
    { tuitionMin: 14000, tuitionMax: 35000, livingCost: 12000, countryId: countries['uk'].id },
    { tuitionMin: 20000, tuitionMax: 60000, livingCost: 18000, countryId: countries['usa'].id },
    { tuitionMin: 15000, tuitionMax: 35000, livingCost: 15000, countryId: countries['canada'].id }
  ];

  for (const ce of costEstimates) {
    await prisma.costEstimate.create({ data: ce });
  }

  // --- Visa Roadmaps ---
  const visaRoadmaps = [
    // Australia
    { stepNumber: 1, title: 'Offer Letter Acceptance', description: 'Accept the offer and pay the initial tuition deposit.', countryId: countries['australia'].id },
    { stepNumber: 2, title: 'Obtain CoE', description: 'Receive your Confirmation of Enrolment from the university.', is_expert_tip: true, countryId: countries['australia'].id },
    { stepNumber: 3, title: 'OSHC Purchase', description: 'Purchase Overseas Student Health Cover for your stay.', countryId: countries['australia'].id },
    { stepNumber: 4, title: 'GTE Assessment', description: 'Pass the Genuine Temporary Entrant requirement.', is_expert_tip: true, countryId: countries['australia'].id },
    { stepNumber: 5, title: 'Lodge Visa', description: 'Submit subclass 500 visa application online.', countryId: countries['australia'].id },
    
    // UK
    { stepNumber: 1, title: 'Accept Unconditional Offer', description: 'Ensure your offer is unconditional before proceeding.', countryId: countries['uk'].id },
    { stepNumber: 2, title: 'Request CAS', description: 'Receive the Confirmation of Acceptance for Studies.', is_expert_tip: true, countryId: countries['uk'].id },
    { stepNumber: 3, title: 'Financial Proof', description: 'Show 28 days of maintained funds in your bank.', is_expert_tip: true, countryId: countries['uk'].id },
    { stepNumber: 4, title: 'IHS Payment', description: 'Pay the Immigration Health Surcharge.', countryId: countries['uk'].id },
    { stepNumber: 5, title: 'Visa Application', description: 'Apply for the Student Visa online and book biometrics.', countryId: countries['uk'].id },
    
    // USA
    { stepNumber: 1, title: 'Receive I-20', description: 'Get the I-20 form from your SEVP-approved school.', countryId: countries['usa'].id },
    { stepNumber: 2, title: 'Pay SEVIS Fee', description: 'Pay the I-901 SEVIS fee before booking the interview.', is_expert_tip: true, countryId: countries['usa'].id },
    { stepNumber: 3, title: 'Complete DS-160', description: 'Fill out the online nonimmigrant visa application.', countryId: countries['usa'].id },
    { stepNumber: 4, title: 'Schedule Interview', description: 'Book your F-1 visa interview at the embassy.', countryId: countries['usa'].id },
    { stepNumber: 5, title: 'Mock Interview Prep', description: 'Prepare for intent to return questions.', is_expert_tip: true, countryId: countries['usa'].id },
    
    // Canada
    { stepNumber: 1, title: 'Letter of Acceptance', description: 'Get acceptance from a DLI (Designated Learning Institution).', countryId: countries['canada'].id },
    { stepNumber: 2, title: 'Provincial Attestation', description: 'Obtain a PAL if required for your program.', is_expert_tip: true, countryId: countries['canada'].id },
    { stepNumber: 3, title: 'GIC Deposit', description: 'Deposit 20,635 CAD into a Guaranteed Investment Certificate.', is_expert_tip: true, countryId: countries['canada'].id },
    { stepNumber: 4, title: 'Upfront Medicals', description: 'Complete a medical exam by an approved panel physician.', countryId: countries['canada'].id },
    { stepNumber: 5, title: 'Lodge Study Permit', description: 'Submit SDS or Non-SDS application online.', countryId: countries['canada'].id }
  ];

  for (const vr of visaRoadmaps) {
    await prisma.visaRoadmap.create({ data: vr });
  }

  // --- Document Templates ---
  const documentTemplates = [
    { title: 'SOP Template - MS in Computer Science (USA)', content: 'This template provides a strong narrative structure for a Computer Science Master\'s in the US, emphasizing technical projects and research goals.', category: 'Statement of Purpose' },
    { title: 'SOP Template - MBA (UK)', content: 'A template focused on leadership experience, career progression, and how an MBA aligns with future managerial goals.', category: 'Statement of Purpose' },
    { title: 'SOP Template - Nursing (Australia)', content: 'Highlights clinical experience, compassion, and the GTE requirements for Australian student visas.', category: 'Statement of Purpose' }
  ];

  for (const dt of documentTemplates) {
    await prisma.documentTemplate.create({ data: dt });
  }

  console.log('Database successfully seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
