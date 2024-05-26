import xlsx from 'xlsx';
import { createObjectCsvWriter } from 'csv-writer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Path to the Excel file
const excelFilePath = 'C:/Users/nickl/OneDrive/OrcaSoftware/GHG Emissions Calculation_modified_MWH_1_31.xlsx';

// Read the Excel file
const workbook = xlsx.readFile(excelFilePath);
const sheetName = 'Zip-subregion'; // The name of the sheet to read
const worksheet = workbook.Sheets[sheetName];

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Convert the sheet to JSON
const rows = xlsx.utils.sheet_to_json(worksheet);

// Function to find and handle duplicates
function handleDuplicates(data) {
	const seen = new Map();
	const mergedData = [];

	data.forEach(row => {
		const key = row['ZIP (character)'];
		if (seen.has(key)) {
			// Merge subregions if duplicate is found
			const existingRow = seen.get(key);
			const existingSubregions = [
				existingRow['eGRID Subregion #1'],
				existingRow['eGRID Subregion #2'],
				existingRow['eGRID Subregion #3']
			].filter(subregion => subregion)
			const newSubregions = [
				row['eGRID Subregion #1'],
				row['eGRID Subregion #2'],
				row['eGRID Subregion #3']
			].filter(subregion => subregion)
			const concatedSubregions = existingSubregions.concat(newSubregions)
			existingRow['eGRID Subregion #1'] = concatedSubregions[0]
			existingRow['eGRID Subregion #2'] = concatedSubregions[1]
			existingRow['eGRID Subregion #3'] = concatedSubregions[2]
			console.log(`Found duplicate ${key} -- Merged to ${concatedSubregions.slice(0, 3)}`)
		} else {
			seen.set(key, row);
		}
	});

	seen.forEach(value => mergedData.push(value));
	return mergedData;
}

// Handle duplicates and prepare data for CSV
const mergedData = handleDuplicates(rows);

// Define the CSV writer with the required columns
const csvWriter = createObjectCsvWriter({
	path: path.join(__dirname, 'zip_egrid_mapping.csv'), // Output CSV file path
	header: [
		{ id: 'zip', title: 'zip_code' },
		{ id: 'egrid_subregion_1', title: 'subregion_1' },
		{ id: 'egrid_subregion_2', title: 'subregion_2' },
		{ id: 'egrid_subregion_3', title: 'subregion_3' }
	]
});

// Extract the relevant columns and prepare data for CSV
const csvData = mergedData.map(row => ({
	zip: row['ZIP (character)'],
	egrid_subregion_1: row['eGRID Subregion #1'],
	egrid_subregion_2: row['eGRID Subregion #2'],
	egrid_subregion_3: row['eGRID Subregion #3']
}));

// Write the data to a CSV file
csvWriter.writeRecords(csvData)
	.then(() => {
		console.log('CSV file written successfully.');
	})
	.catch(error => {
		console.error('Error writing CSV file:', error);
	});

