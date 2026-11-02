//
// Public
//

export interface Contact {
	pers_name: NameData;
	role: number;
	websites: string[];
}

export interface DateRange {
	from: string;
	to: string;
}

export interface Institution {
	relation_type: string;
	org_name: NameData;
	websites: string[];
}

export interface PlaceData {
	place_name: NameData;
	coordinates: Record<string, string>;
}

export interface RelatedEntity {
	relation_type: string;
	title: string;
	uuid: string;
}

//
// Private
//

interface NameData {
	text: string;
	ref: string[];
}
