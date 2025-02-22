import {sortByItemCount, getSortFunction, sortByDate, sortOrders, sortTypes} from './sortOrders';


describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount({}, {});
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('right sort: left < right', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['item1', 'item2', 'item3'],
		};

		expect(sortByItemCount(order1, order2)).toBe(-1);
	});

	it('right sort: left > right', () => {
		const order1 = {
			items: ['item1', 'item2', 'item3'],
		};

		const order2 = {
			items: ['item1', 'item2'],
		};

		expect(sortByItemCount(order1, order2)).toBe(1);
	});

	it('empty objects', () => {
		expect(sortByItemCount({}, {})).toBe(0);
	});

});


describe('getSortFunction', () => {
	it('right date func', () => {
		expect(getSortFunction(sortTypes.DATE)).toBe(sortByDate);
	});

	it('right count func', () => {
		expect(getSortFunction(sortTypes.COUNT)).toBe(sortByItemCount);
	});
});

describe('sortByDate', () => {
	it('left < right', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 2,
		};

		expect(sortByDate(order1, order2)).toBe(1);
	});

	it('left > right', () => {
		const order1 = {
			date: 2,
		};

		const order2 = {
			date: 1,
		};

		expect(sortByDate(order1, order2)).toBe(-1);
	});

	it('equal', () => {
		const order1 = {
			date: 1,
		};

		const order2 = {
			date: 1,
		};

		expect(sortByDate(order1, order2)).toBe(0);
	});

	it('empty', () => {
		expect(sortByDate({}, {})).toBe(0);
	});

});

describe('sortOrders callbacks', () => {
	it('not call callback', () => {
		const orders: any = [];

		const clb = jest.fn();
		sortOrders(orders, clb);
		expect(clb).not.toHaveBeenCalled();
	});

	it('call callback', () => {
		const orders = [
			{items: ['item1', 'item2']},
			{items: ['item1', 'item2', 'item3']}
		];

		const clb = jest.fn();
		sortOrders(orders, clb);
		expect(clb).toHaveBeenCalled();
	});

});