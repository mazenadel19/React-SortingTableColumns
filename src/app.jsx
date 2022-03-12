import { useEffect, useState } from 'react';

const HeadersSchema = [
	{
		name: 'userId',
		order: 2,
	},
	{
		name: 'id',
	},
	{
		name: 'title',
		order: 2,
	},
	{
		name: 'completed',
		order: 9,
	},
];

export function App() {
	const [Data, setData] = useState([]);
	const [TableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {

		const fetchData = async () => {
			const response = await fetch('https://jsonplaceholder.typicode.com/todos');
			const json = await response.json();
			const TableHeaders = [];

			const HandlingHeaders = Num => {
				if (!TableHeaders[Num]) return Num;
				else return HandlingHeaders(Num + 1);
			};

			Object.keys(json[0]).forEach(Key => {
				HeadersSchema.forEach(Header => {
					if (Header.name === Key) {
						const HeaderOrder = HandlingHeaders(Header.order ? Header.order : 99);
						TableHeaders[HeaderOrder] = Key;
					}
				});
			});

			setTableHeaders(TableHeaders.filter(Header => Header));
			setData(json);
		};
		fetchData();
	}, []);

	return (
		<table>
			<thead>
				<tr>
					{TableHeaders.map((Header, Index) => (
						<th scope='col' key={Index}>
							{Header}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{Data?.map((Row, RowIndex) => (
					<tr key={RowIndex}>
						{TableHeaders.map((Header, ColumnIndex) => (
							<td key={ColumnIndex}>{Row[Header]?.toString()}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
