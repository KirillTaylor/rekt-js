import { createElement as e, useState, useRef, useEffect } from './rekt.js';


// Button component
function Button({label, onClick}){
	return e('button', {onClick: onClick}, label);
}

// Counter component
function Counter(){
	const [ value, setValue ] = useState(0);
	let value2 = useRef(10); // basically like useState without the setter

	useEffect( () => {
		console.log('value changed!');
	}, [value])

	const increment = () => {
		setValue(value + 1);
	}

	const decrement = () => {
		setValue(value - 1);
	}

	return e('div', {},
		e('h2', {}, value.toString()),
		e(Button, {label: '+', onClick: increment }, []),
		e(Button, {label: '-', onClick: decrement }, [])
	);
}

const App = e('div', {},
	e('h1', {}, 'React IO'),
	e(Counter)
);

export default App;