export interface Worker {
	id: string;
	name: string;
	job: string;
	cost: number;
	date: string;
	precentage: number;
}

export interface Input {
	title: string;
	name: string;
	type: string;
	placeholder: string;
}

export interface Bill {
	clientAddress: string;
	clientName: string;
	date: string;
	name: string;
	precentage: number;
	workers: any[];
	expenses: any[];
	revenues: any[];
}
