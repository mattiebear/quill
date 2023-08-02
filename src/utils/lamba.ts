export const propEq = <T>(prop: keyof T, value: any) => {
	return (object: Record<keyof T, any>) => object[prop] === value;
};
