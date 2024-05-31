import xlsx from 'xlsx';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Path to the Excel file
const excelFilePath = 'excel.xlsx';

// Read the Excel file
const workbook = xlsx.readFile(excelFilePath);
const sheetName = 'Emission Factors'; // The name of the sheet to read
const worksheet = workbook.Sheets[sheetName];

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/').replace(/\/scripts$/, '/public');

// Define the table ranges
const tableRanges = {
	Table11: '$B$1029:$H$1064',
	Table12: '$B$1066:$H$1129',
	EF_Stationary_Combustion: '$B$10:$K$83',
	Table17: '$B$1131:$H$1196',
	Mobile_S1_EF: '$B$235:$O$261',
	S3_Transport_EF: '$B$421:$K$514',
	Table5: '$B$633:$K$687',
	Table6: '$B$793:$K$858',
	Table8: '$B$863:$J$864',
	Table7: '$B$957:$F$1025',
};

// Extract the tables and create the JSON object
const tablesData = {};
const isSourceColumn = (column) => {
	switch (column) {
		case 'Source':
			return true;
		case 'Source 1':
			return true;
		case 'Source 2':
			return true;
		case 'Column1':
			return true;
		case 'Column2':
			return true;
		default:
			return false;
	}
}
const cleanColumnName = (name) => {
	return name.replace(/[^\w\s()]/g, '').replace(/\s+/g, ' ').trim();
};
for (const [tableName, range] of Object.entries(tableRanges)) {
	const tableData = xlsx.utils.sheet_to_json(worksheet, {
		range: range.replace(/\$/g, ''),
		header: 1,
	});

	if (tableData.length === 0) {
		console.error(`No data found for table: ${tableName} with range: ${range}`);
		continue;
	}

	const [headerRow, ...dataRows] = tableData;
	const formattedData = dataRows.map((row) => {
		const rowObject = {};
		headerRow.forEach((column, index) => {
			if (isSourceColumn(column)) return;
			const cleanColumn = cleanColumnName(column);
			rowObject[cleanColumn] = row[index];
		});
		return rowObject;
	});

	tablesData[tableName] = formattedData;
}

// Write the JSON object to a file
const jsonFilePath = `${__dirname}/tables.json`;
fs.writeFileSync(jsonFilePath, JSON.stringify(tablesData, null, 2));

console.log('Tables extracted and saved to tables.json');