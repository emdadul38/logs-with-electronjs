import React, {useState} from 'react'
import {
	Card,
	Form,
	Row,
	Col,
	Button
} from 'react-bootstrap'

const AddLogItem = ({ addItem }) => {
	const [text, setText] = useState('')
	const [user, setUser] = useState('')
	const [priority, setPriority] = useState('')
	const [status, setStatus] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		
		addItem({ text, user, priority, status });

		setText('')
		setUser('')
		setPriority('')
		setPriority(false)

	}
	return (
		<Card className="mt-5 mb-3">
			<Card.Body>
				<Form onSubmit={onSubmit}>
					<Row className="my-3">
						<Col>
							<Form.Control placeholder="Log" value={text} onChange={(e) => setText(e.target.value)} />
						</Col>
						<Col>
							<Form.Control 
								placeholder="User" 
								value={user} 
								onChange={(e) => setUser(e.target.value)}
								
							/>
						</Col>
					</Row>
						
					<Row className="my-3">
						<Col>
							<Form.Control 
								as="select"
								value={priority} 
								onChange={(e) => setPriority(e.target.value)}  >
									<option value="0"> Select Priority</option>
									<option value="low"> Low</option>
									<option value="moderate"> Moderate</option>
									<option value="high"> High </option>

							</Form.Control>
						</Col>

						<Col>
							<Form.Check 
								label="status"
								type="checkbox" 
								value={status}
								onClick={ (e) => setStatus(e.target.value)}
								>

							</Form.Check>
						</Col>
					</Row>
					<Row className="my-3">
						<Col>
							<Button type="submit" variant="secondary">Submit</Button>
						</Col>
					</Row>
				</Form>
			</Card.Body>
		</Card>
	)
}

export default AddLogItem
