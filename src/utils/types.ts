export interface Item {
	_id: string;
	name: string;
	category: Category;
	approved: boolean;
	__v: number;
}

export interface Category {
	_id: string;
	name: string;
	faIcon: string;
}
