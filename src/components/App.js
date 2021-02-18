import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {Container, Table, Alert} from 'react-bootstrap'
import LogItem from './LogItem'
import AddLogItem from './AddLogItem';


const App = () => {
	const [logs, setLogs] = useState([])

	useEffect(() => {
		console.log(`Use Effect Call`);
		axios.get("http://localhost:4002/todos").then((response) => {
			const {data} = response;
			setLogs(data);
			
			console.log(logs)
		}).catch((err) => {
			console.log(err);
		})
	}, [])
	
	const [alert, setAlert] = useState({
		show: false,
		message: '',
		variant: 'success'
	});
	
	const addItem = (item) => {
		
		if(item.text === '' || item.user === '' || item.priority === '') {
			showAlert("Please enter all fields!", "danger");
			return false;
		}
		const {
			text,
			user,
			priority,
			status
		} = item;
		console.log(item);

		axios({
			method: 'POST',
			url: "http://localhost:4002/todos",
			data: {
				user,
				text,
				priority
			}
		}).then((res) => {
			const { todo } = res.data
			console.log(todo);
			setLogs([...logs, todo]);
		}).catch(err => {
			console.error(err);
		})

		showAlert("Add logs");
	}

	const deleteItem = (id) => {
		axios.delete(`http://localhost:4002/delete-todo/${id}`).then((res) => {
			console.log(res);
			setLogs(logs.filter((item) => item._id !== id));

		}).catch(err => {
			console.error(err);
		})
		showAlert("Delete logs");
	}

	function showAlert(message, variant="success", second=3000) {
		setAlert({
			show: true,
			message,
			variant
		});

		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'success'
			});
		}, second)
	}

	return (
		<Container>
			<AddLogItem addItem={addItem} />
			{alert.show && <Alert variant={alert.variant} > {alert.message} </Alert>}
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>Created</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{ 
					
					logs.map( (log) => (
						<LogItem key={log._id} logs={log} deleteItem={deleteItem} />
					)) }

				</tbody>
			</Table>
		</Container>
	)
}

export default App
