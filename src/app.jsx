import { useEffect, useState } from 'react';

export function App() {

	const [Data, setData] = useState([]);
	const [TableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const json = await response.json();
      setData(json);
      setTableHeaders(Object.keys(json[0]));
    }

    fetchData();
	}, []);

	return (
		<table>
			<thead>
				<tr>
					{TableHeaders.map((Header, Index) => (
						<th scope='col' key={Index}>{Header}</th>
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
