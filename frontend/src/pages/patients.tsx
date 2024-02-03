import { useState } from "react";
import { PatientsView } from "@/modules/patients/views";
import { Button, Checkbox, TextInput } from "@/common/components";

export default function CreateProject() {
	// const [value, setValue] = useState('');
	// const [selected, setSelected] = useState(false);

	return (
		<PatientsView />
		// <>
		// 	<div className="m-5 gap-2 flex">
		// 		<Button onClick={() => console.log('clicked!')}>
		// 			Test
		// 		</Button>
		// 		<Button variant="contained-secondary" onClick={() => console.log('clicked!')}>
		// 			Test 2
		// 		</Button>
		// 		<Button variant="contained-tertiary" onClick={() => console.log('clicked!')}>
		// 			Test 3
		// 		</Button>
		// 		<Button variant="contained-danger" onClick={() => console.log('clicked!')}>
		// 			Test 4
		// 		</Button>
		// 	</div>
		// 	<div className="m-5 gap-2 flex">
		// 		<Button variant="outlined-primary" onClick={() => console.log('clicked!')}>
		// 			Test 5
		// 		</Button>
		// 		<Button variant="outlined-secondary" onClick={() => console.log('clicked!')}>
		// 			Test 6
		// 		</Button>
		// 		<Button variant="outlined-tertiary" onClick={() => console.log('clicked!')}>
		// 			Test 7
		// 		</Button>
		// 		<Button variant="outlined-danger" onClick={() => console.log('clicked!')}>
		// 			Test 8
		// 		</Button>
		// 	</div>
		// 	<div className="m-5 gap-2 flex">
		// 		<TextInput value={value} placeholder="Type here" onChange={(e) => setValue(e.target.value)} />
		// 	</div>
		// 	<div className="m-5 gap-5 flex">
		// 		<Checkbox
		// 			id="my-checkbox"
		// 			checked={selected}
		// 			label="This is a test"
		// 			scale="small"
		// 			onChange={({ target }) => setSelected(target.checked)}
		// 		/>
		// 		<Checkbox
		// 			id="my-checkbox"
		// 			checked={selected}
		// 			label="This is a test 2"
		// 			onChange={({ target }) => setSelected(target.checked)}
		// 		/>
		// 		<Checkbox
		// 			id="my-checkbox"
		// 			checked={selected}
		// 			label="This is a test 3"
		// 			scale="large"
		// 			onChange={({ target }) => setSelected(target.checked)}
		// 		/>
		// 	</div>
		// </>
	);
}
