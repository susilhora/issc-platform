const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const mammoth = require('mammoth');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Heuristic Engine: Tag "Expert Tips"
function checkExpertTip(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return lowerText.includes('note:') || lowerText.includes('important:');
}

// Heuristic Engine: Route "Statement of Purpose"
function isSOPDocument(text) {
  if (!text) return false;
  return text.toLowerCase().includes('statement of purpose');
}

async function processTabularData(buffer) {
  console.log("Parsing tabular data using xlsx engine...");
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  
  console.log(`Parsed ${data.length} rows from Excel buffer.`);
  // Further mapping and database insertion logic will be implemented here
  // based on the specific columns of the ingested sheet.
  
  return data;
}

async function processWordDocument(buffer, title) {
  console.log(`Extracting text from Word .docx buffer: ${title}`);
  try {
    const result = await mammoth.extractRawText({ buffer: buffer });
    const text = result.value;

    if (isSOPDocument(text)) {
      console.log(`[Heuristic Match] Routing '${title}' to DocumentTemplate table...`);
      await prisma.documentTemplate.create({
        data: {
          title: title,
          content: text,
          category: 'Statement of Purpose'
        }
      });
    } else {
      console.log(`Document '${title}' processed, but not routed as SOP.`);
    }
  } catch (error) {
    console.error('Error processing document:', error);
  }
}

async function runScraper() {
  console.log("Starting Deep Clone Scraper...");
  
  // Scraper execution logic will fetch remote buffers and process them
  // e.g. 
  // const excelRes = await axios.get('URL_TO_SHEET', { responseType: 'arraybuffer' });
  // await processTabularData(excelRes.data);
  
  // const wordRes = await axios.get('URL_TO_DOCX', { responseType: 'arraybuffer' });
  // await processWordDocument(wordRes.data, "Example Document");

  console.log("Scrape completed.");
}

// Execution block, currently waiting for review/data sources before full run
if (require.main === module) {
  // runScraper().catch(console.error).finally(() => prisma.$disconnect());
  console.log("Scraper architecture is ready. Execution is pending review and valid data sources.");
}

module.exports = {
  runScraper,
  processTabularData,
  processWordDocument,
  checkExpertTip,
  isSOPDocument
};
