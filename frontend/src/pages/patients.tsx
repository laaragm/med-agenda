import { Button } from "@/common/components";

export default function CreateProject() {
	return (
		<>
			<div className="m-5 gap-2 flex">
				<Button onClick={() => console.log('clicked!')}>
					Test
				</Button>
				<Button variant="contained-secondary" onClick={() => console.log('clicked!')}>
					Test 2
				</Button>
				<Button variant="contained-tertiary" onClick={() => console.log('clicked!')}>
					Test 3
				</Button>
				<Button variant="contained-danger" onClick={() => console.log('clicked!')}>
					Test 4
				</Button>
			</div>
			<div className="m-5 gap-2 flex">
				<Button variant="outlined-primary" onClick={() => console.log('clicked!')}>
					Test 5
				</Button>
				<Button variant="outlined-secondary" onClick={() => console.log('clicked!')}>
					Test 6
				</Button>
				<Button variant="outlined-tertiary" onClick={() => console.log('clicked!')}>
					Test 7
				</Button>
				<Button variant="outlined-danger" onClick={() => console.log('clicked!')}>
					Test 8
				</Button>
			</div>
		</>
	);
}
