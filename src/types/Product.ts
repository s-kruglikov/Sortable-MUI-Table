export interface Product {
	name: string,
	calories: number,
	fat: number,
	carbs: number,
	protein: number,
	[key: string] : string | number
}