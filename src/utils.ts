type ValuesOf<T extends any[]> = T[number];
/**
 * @param {Object} obj Any object you want to exclude keys from
 * @param {string[]} omit The keys you want to exclude from the object
 * @returns {Object} Returns the original object, less the keys instructed to omit
 * @private
 */
export function omitKeys<
	T,
	K extends (keyof T)[] = (keyof T)[],
	X extends string | number | symbol = ValuesOf<K>,
	R = Omit<T, X>
>(obj: T, ...omit: K): R {
	return Object.keys(obj).filter((origKey) => !omit.some((filterKey) => origKey === filterKey)).reduce((result, key) => {
		(result as Record<any, any>)[key] = (obj as Record<any, any>)[key];
		return result;
	}, ({} as R));
}