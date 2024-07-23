import supabase from '@/supabase/supabaseClient';
import { AddEmissionArgType } from '@/types';

export async function addEmissionData({
	p_table_name,
	p_workbook_id,
	p_facility_id,
	p_year,
	p_note,
	p_data,
	p_results,
}: AddEmissionArgType) {
	const { data: emissionId, error } = await supabase.rpc(
		'add_emission_data',
		{
			p_table_name: p_table_name,
			p_workbook_id: p_workbook_id,
			p_facility_id: p_facility_id,
			p_year: p_year,
			p_note: p_note,
			p_data: p_data,
			p_results: p_results,
		},
	);

	if (error) {
		console.error('Error adding emission data:', error);
		return null;
	}

	return emissionId;
}
