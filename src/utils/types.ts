import { IconName } from '@/components/Icon/Icon';

export interface Item {
	_id: string;
	name: string;
	category: Category;
	approved: boolean;
	__v: number;
	obtained?: boolean;
}

export interface List {
	_id: string;
	name: string;
	items: Item[];
	createdBy: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Category {
	_id: string;
	name: string;
	faIcon: IconName;
}
