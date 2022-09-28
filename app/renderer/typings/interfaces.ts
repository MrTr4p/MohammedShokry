export interface Input {
	title: string;
	name: string;
	type: string;
	placeholder: string;
}

export interface Bill {
	clientAddress: string;
	clientName: string;
	name: string;
	date: string;
	precentage: number;

	workers: Worker[];
	expenses: Expense[];
	revenues: Revenue[];
}

export interface Worker {
	id: number;
	name: string;
	job: string;
	cost: number;
	date: string;
	precentage: number;
}

export interface Expense {
	id: number;
	materialName: string;
	totalcost: number;
	billCode: string;
	date: string;
	day: string;
}

export interface Revenue {
	id: number;
	amount: number;
	date: string;
}
