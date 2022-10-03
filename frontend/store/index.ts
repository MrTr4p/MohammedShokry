import create, { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { produce } from "immer";

interface ProjectBill {
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

interface Worker {
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

interface Revenue {
	id: string;
	amount: string;
	date: string;
}

interface Section {
	id: string;
	name: string;
	expenses: Expense[];
}

interface Expense {
	id: string;
	materialName: string;
	totalcost: number;
	day: string;
	section?: number;
	date: string;
}

interface State {
	workers: Worker[];
	homeProjectBills: ProjectBill[];
	homeAnotherBills: ProjectBill[];
	setHomeProjectBills: (projectBills: ProjectBill[]) => void;
	setHomeAnotherBills: (projectBills: ProjectBill[]) => void;
	setWorkers: (workers: Worker[]) => void;
	newWorker: (worker: Worker) => void;
}

const storeSlice: StateCreator<
	State & ProjectBill,
	[["zustand/devtools", never], ["zustand/persist", unknown]],
	[],
	State
> = (set) => ({
	workers: [],
	homeProjectBills: [],
	homeAnotherBills: [],
	setHomeProjectBills: (bills) => set(() => ({ homeProjectBills: bills })),
	setHomeAnotherBills: (bills) => set(() => ({ homeAnotherBills: bills })),
	setWorkers: (workers) => set(() => ({ workers: workers })),
	newWorker: (worker) =>
		set((state) => {
			return { workers: [...state.workers, worker] };
		}),
});

interface newProjectBill {
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
	[["zustand/devtools", never], ["zustand/persist", unknown]],
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
		persist(
			(...a) => ({ ...newProjectBillSlice(...a), ...storeSlice(...a) }),
			{
				name: "app-storage",
			},
		),
	),
);
