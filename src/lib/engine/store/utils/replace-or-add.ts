import { Position } from '../../map';

export const replaceOrAdd = (array: any[], record: { position: Position }) => {
	const index = array.findIndex((tile) =>
		tile.position.equals(record.position)
	);

	if (index === -1) {
		array.push(record);
	} else {
		array[index] = record;
	}
};
