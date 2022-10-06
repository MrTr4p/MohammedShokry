import create, { StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { produce } from "immer";
import { v4 } from "uuid";
import _ from "lodash";

export type RecursivePartial<T> = {
	[P in keyof T]?: RecursivePartial<T[P]>;
};

export interface User {
	loggedIn: boolean;
	accountType: "edit" | "create" | "none";
}

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
	amount: number;
	date: string;
}

export interface Section {
	id: string;
	name: string;
}

export interface Expense {
	id: string;
	section?: Section;
	materialName: string;
	totalcost: number;
	day: string;
	date: string;
}

export interface State {
	user: User;
	dropdownWorkers: Worker[];
	homePublicBills: ProjectBill[];
	homeOfficeBills: ProjectBill[];
	searchState: "loading" | "empty" | "found";
	login: (password: string) => void;
	setHomePublicBills: (projectBills: ProjectBill[]) => void;
	setHomeOfficeBills: (projectBills: ProjectBill[]) => void;
	setDropdownWorkers: (workers: Worker[]) => void;
	newDropdownWorker: (worker: RecursivePartial<Worker>) => Promise<void>;
	setSearchState: (state: "empty" | "loading" | "found") => void;
}

const storeSlice: StateCreator<
	State & newProjectBill,
	[["zustand/devtools", never]],
	[],
	State
> = (set) => ({
	user: {
		loggedIn: false,
		accountType: "none",
	},
	dropdownWorkers: [],
	homePublicBills: [],
	homeOfficeBills: [],
	searchState: "empty",
	login: (password) => {
		
	},
	setHomePublicBills: (bills) => set(() => ({ homePublicBills: bills })),
	setHomeOfficeBills: (bills) => set(() => ({ homeOfficeBills: bills })),
	setDropdownWorkers: (workers) =>
		set(
			produce<State & newProjectBill>((draft) => {
				draft.dropdownWorkers =
					(workers || []).length > 0 ? workers : [];
			}),
		),
	newDropdownWorker: async (workerData) => {
		let { data } = await axios({
			url: "http://localhost:3000/create/worker",
			method: "POST",
			data: workerData,
		});

		set((state) => {
			return { dropdownWorkers: [...state.dropdownWorkers, data] };
		});
	},
	setSearchState: (state) => set(() => ({ searchState: state })),
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

	setState: (data: ProjectBill) => void;
	restState: () => void;
	setName: (name: string) => void;
	setClientName: (name: string) => void;
	setClientAddress: (address: string) => void;
	setOfficePrecentage: (precentage: number) => void;
	setDate: (date: string) => void;
	saveBill: () => Promise<any>;
	editBill: () => Promise<any>;
	addWorker: (workerId?: string) => void;
	updateWorker: (workerId: string, data: RecursivePartial<Worker>) => void;
	removeWorker: (id: string) => void;
	addRevenue: () => void;
	updateRevenue: (id: string, data: RecursivePartial<Revenue>) => void;
	removeRevenue: (id: string) => void;
	addExpense: (sectionId: string) => void;
	updateExpense: (id: string, data: RecursivePartial<Expense>) => void;
	removeExpense: (id: string) => void;
	addSection: (data: RecursivePartial<Section>) => void;
	updateSection: (id: string, data: RecursivePartial<Section>) => void;
	removeSection: (id: string) => void;
}

const projectBillSlice: StateCreator<
	State & newProjectBill,
	[["zustand/devtools", never]],
	[],
	newProjectBill
> = (set, get) => ({
	id: -1,
	officePrecentage: 0,
	name: "",
	clientName: "",
	clientAddress: "",
	date: "",
	expenses: [],
	revenues: [],
	sections: [],
	workers: [],

	setState: (data) => {
		set((state) => data);
	},
	saveBill: async () => {
		let {
			officePrecentage,
			clientAddress,
			clientName,
			date,
			expenses,
			workers,
			sections,
			name,
			revenues,
			restState,
		} = get();
		let { data } = await axios({
			url: "http://localhost:3000/create/bill/project",
			method: "post",
			data: {
				officePrecentage,
				clientAddress,
				clientName,
				date,
				expenses,
				workers,
				sections,
				name,
				revenues,
			},
		});

		restState();
		console.log(data);
		return data;
	},
	editBill: async () => {
		let {
			id,
			officePrecentage,
			clientAddress,
			clientName,
			date,
			expenses,
			workers,
			sections,
			name,
			revenues,
			restState,
		} = get();

		let { data } = await axios({
			url: "http://localhost:3000/update/bill/project?id=" + id,
			method: "put",
			data: {
				officePrecentage,
				clientAddress,
				clientName,
				date,
				expenses,
				workers,
				sections,
				name,
				revenues,
			},
		});

		restState();
		console.log(data);
		return data;
	},
	restState: () =>
		set((state) => ({
			clientAddress: "",
			clientName: "",
			officePrecentage: 0,
			date: "",
			name: "",
			expenses: [],
			revenues: [],
			sections: [],
			workers: [],
		})),
	setName: (name) => set(() => ({ name })),
	setClientName: (name) => set(() => ({ clientName: name })),
	setClientAddress: (address) => set(() => ({ clientAddress: address })),
	setOfficePrecentage: (precentage) =>
		set(() => ({ officePrecentage: precentage })),
	setDate: (date) => set(() => ({ date: date })),
	addWorker: async (workerId) => {
		if (workerId) {
			let { data }: { data: undefined | Worker } = await axios({
				url:
					"http://localhost:3000/search/workers/get/single?id=" +
					workerId,
			});
			set(
				produce<State & newProjectBill>((draft) => {
					if (!data) return;
					draft.workers.push({
						...data,
						project: { date: "", salary: 0, precentage: 0 } as any,
					});
				}),
			);
		} else {
			set(
				produce<State & newProjectBill>((draft) => {
					draft.workers.push({
						id: v4(),
						name: "",
						work: "",
						project: { date: "", salary: 0, precentage: 0 } as any,
					});
				}),
			);
		}
	},
	updateWorker: (workerId, data) => {
		set(
			produce<State & newProjectBill>((draft) => {
				let workerIndex = draft.workers.findIndex(
					(worker) => worker.id === workerId,
				);
				draft.workers[workerIndex] = _.merge<
					Worker,
					RecursivePartial<Worker>
				>(draft.workers[workerIndex], data);
			}),
		);
	},
	removeWorker: (workerId) => {
		set(
			produce<State & newProjectBill>((draft) => {
				draft.workers = draft.workers.filter(
					(worker) => worker.id !== workerId,
				);
				//console.log(draft.workers, workerId);
			}),
		);
	},
	addRevenue: () => {
		set(
			produce<State & newProjectBill>((draft) => {
				draft.revenues.push({
					id: v4(),
					amount: 0,
					date: "",
				});
			}),
		);
	},
	updateRevenue(revenueId, data) {
		set(
			produce<State & newProjectBill>((draft) => {
				let revenueIndex = draft.revenues.findIndex(
					(revenue) => revenue.id === revenueId,
				);
				draft.revenues[revenueIndex] = _.merge<
					Revenue,
					Partial<Revenue>
				>(draft.revenues[revenueIndex], data);
			}),
		);
	},
	removeRevenue: (revenueId) => {
		set(
			produce<State & newProjectBill>((draft) => {
				draft.revenues = draft.revenues.filter(
					(revenue) => revenue.id !== revenueId,
				);
			}),
		);
	},
	addSection: (data) => {
		set(
			produce<State & newProjectBill>((draft) => {
				draft.sections.push({ id: v4(), name: data.name });
			}),
		);
	},
	updateSection(sectionId, data) {
		set(
			produce<State & newProjectBill>((draft) => {
				let sectionIndex = draft.sections.findIndex(
					(section) => section.id === sectionId,
				);
				draft.sections[sectionIndex] = _.merge<
					Section,
					RecursivePartial<Section>
				>(draft.sections[sectionIndex], data);
			}),
		);
	},
	removeSection: (sectionId) => {
		set(
			produce<State & newProjectBill>((draft) => {
				let sectionIndex = draft.sections.findIndex(
					(section) => section.id === sectionId,
				);
				if (sectionIndex)
					draft.sections = draft.sections.splice(sectionIndex, 1);
			}),
		);
	},
	addExpense: (sectionId) => {
		set(
			produce<State & newProjectBill>((draft) => {
				let sectionIndex = draft.sections.findIndex(
					(section) => section.id === sectionId,
				);
				let newExpense: Expense = {
					id: v4(),
					section: draft.sections[sectionIndex],
					date: "",
					day: "",
					materialName: "",
					totalcost: 0,
				};
				draft.expenses.push(newExpense);
			}),
		);
	},
	updateExpense(expenseId, data) {
		set(
			produce<State & newProjectBill>((draft) => {
				let expenseIndex = draft.expenses.findIndex(
					(expense) => expense.id === expenseId,
				);
				draft.expenses[expenseIndex] = _.merge<
					Expense,
					RecursivePartial<Expense>
				>(draft.expenses[expenseIndex], data);
			}),
		);
	},
	removeExpense: (expenseId) => {
		set(
			produce<State & newProjectBill>((draft) => {
				let expenseIndex = draft.expenses.findIndex(
					(expense) => expense.id === expenseId,
				);

				draft.expenses.splice(expenseIndex, 1);
			}),
		);
	},
});

export interface AnotherPaymentsBill {
	id: number;
	projectName: string;
	amount: number;
	date: string;
	inReturn: string;
	description?: string;
}

export interface AnotherPaymentsBillStore {
	id: number;
	projectName: string;
	amount: number;
	date: string;
	inReturn: string;
	description?: string;
	setState: (data: AnotherPaymentsBill) => void;
	resetState: () => void;
	saveBill: () => Promise<{ message: string; error: boolean }>;
	editBill: () => Promise<{ message: string; error: boolean }>;
	setProjectName: (name: string) => void;
	setAmount: (amount: number) => void;
	setDate: (date: string) => void;
	setInReturn: (inReturn: string) => void;
	setDescription: (description: string) => void;
}

const anotherPaymentsBillStore: StateCreator<
	AnotherPaymentsBillStore,
	[["zustand/devtools", never]],
	[],
	AnotherPaymentsBillStore
> = (set, get) => ({
	id: -1,
	amount: 0,
	date: "",
	inReturn: "",
	projectName: "",
	description: "",

	resetState: () => {
		set(() => ({
			id: -1,
			amount: 0,
			date: "",
			description: "",
			inReturn: "",
			projectName: "",
		}));
	},

	setState: (data) => {
		set(() => ({
			id: data.id,
			amount: data.amount,
			date: data.date,
			description: data.description,
			inReturn: data.inReturn,
			projectName: data.projectName,
		}));
	},
	editBill: async () => {
		const {
			amount,
			date,
			id,
			inReturn,
			projectName,
			description,
			resetState,
		} = get();

		return { message: "done", error: false };
	},
	saveBill: async () => {
		const {
			amount,
			date,
			id,
			inReturn,
			projectName,
			description,
			resetState,
		} = get();

		let { message, error } = await axios({
			url: "http://localhost:3000/create/bill/anotherBill",
			method: "post",
			data: {
				amount,
				date,
				id,
				inReturn,
				projectName,
				description,
			},
		})
			.then(({ data }) => ({ message: data.message, error: false }))
			.catch((err) => ({
				message: err?.reponse?.data?.message,
				error: true,
			}));

		return { message, error };
	},
	setProjectName: (name: string) => set({ projectName: name }),
	setAmount: (amount: number) => set({ amount }),
	setDate: (date: string) => set({ date }),
	setInReturn: (inReturn: string) => set({ inReturn }),
	setDescription: (description: string) => set({ description }),
});

export const useAnotherPaymentsBillStore = create<AnotherPaymentsBillStore>()(
	devtools(anotherPaymentsBillStore, { name: "another-bill-storage" }),
);

export const useStore = create<State & newProjectBill>()(
	devtools((...a) => ({ ...storeSlice(...a), ...projectBillSlice(...a) }), {
		name: "app-storage",
	}),
);
