import create, { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { produce } from "immer";

export interface ProjectBill {
	id: number;
	name: string;
	clientName: string;
	clientAddress: string;
	officePrecentage: number;
	workers: Worker[];
	revenues: Revenue[];
	expenses: Expense[];
	sections: Section[];
	date: string;
}

export interface Worker {
	id: string;
	name: string;
	work: string;
	project?: {
		id: number;
		salary: number;
		precentage?: number;
		date: string;
	};
}

export interface Revenue {
	id: string;
	amount: string;
	date: string;
}

export interface Section {
	id: string;
	name: string;
	expenses: Expense[];
}

export interface Expense {
	id: string;
	materialName: string;
	totalcost: number;
	day: string;
	section?: number;
	date: string;
}

export interface State {
	workers: Worker[];
	homePublicBills: ProjectBill[];
	homeOfficeBills: ProjectBill[];
	setHomePublicBills: (projectBills: ProjectBill[]) => void;
	setHomeOfficeBills: (projectBills: ProjectBill[]) => void;
	setWorkers: (workers: Worker[]) => void;
	newWorker: (worker: Worker) => void;
}

const storeSlice: StateCreator<
	State & ProjectBill,
	[["zustand/devtools", never]],
	[],
	State
> = (set) => ({
	workers: [],
	homePublicBills: [],
	homeOfficeBills: [],
	setHomePublicBills: (bills) => set(() => ({ homePublicBills: bills })),
	setHomeOfficeBills: (bills) => set(() => ({ homeOfficeBills: bills })),
	setWorkers: (workers) => set(() => ({ workers: workers })),
	newWorker: (worker) =>
		set((state) => {
			return { workers: [...state.workers, worker] };
		}),
});

export interface newProjectBill {
	id: number;
	name: string;
	clientName: string;
	clientAddress: string;
	officePrecentage: number;
	workers: Worker[];
	revenues: Revenue[];
	expenses: Expense[];
	sections: Section[];
	date: string;
}

const newProjectBillSlice: StateCreator<
	newProjectBill & State,
	[["zustand/devtools", never]],
	[],
	newProjectBill
> = (set) => ({
	id: 0,
	officePrecentage: 0,
	name: "",
	clientName: "",
	clientAddress: "",
	date: "",
	expenses: [],
	revenues: [],
	sections: [],
	workers: [],
});

export const useStore = create<State & newProjectBill>()(
	devtools(
		(...a) => ({ ...newProjectBillSlice(...a), ...storeSlice(...a) }),
		{
			name: "app-storage",
		},
	),
);
