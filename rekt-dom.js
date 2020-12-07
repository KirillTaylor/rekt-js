function renderElement(element){
	const {type, props, children} = element;

	// component support
	if(typeof type === 'function'){
		return renderElement(type(props));
	}

	const domElement = document.createElement(type);

	// child support
	children.forEach( child => {
		let node = null;
		if(typeof child === 'string'){
			node = document.createTextNode(child);
		} else {
			node = renderElement(child);
		}

		domElement.appendChild(node);
	});

	// props support
	Object.keys(props).forEach( key => {
		if(key.startsWith('on')){
			const eventName = key.slice(2).toLowerCase();
			domElement.addEventListener(eventName, props[key]);
		}
	});

	return domElement;
}

let _currentApp = null;
let _element = null;
let _container = null;

export function render(element = _element, container = _container){
	_element = element;
	_container = container;

	const app = renderElement(element);

	_currentApp 
		? container.replaceChild(app, _currentApp)
		: container.appendChild(app);

	_currentApp = app;
	
	idx = 0;
}

let hooks = [];
let idx = 0;
export function useState(initialValue){
	let state = hooks[idx] || initialValue;
	let _idx = idx;

	function setState(newState){
		hooks[_idx] = newState;
		render();
	}

	idx++;

	return [ state, setState ];
}

export function useRef(initialValue) {
	if(!hooks[idx]){
		hooks[idx] = Object.seal({current: initialValue});
	}

	let ref = hooks[idx];
	idx++;

	return ref;
}

export function useEffect(callback, depsArr){
	const prevDeps = hooks[idx];
	let hasChanged = true;
	if(prevDeps){
		hasChanged = depsArr.some( (dep, idx) => 
			!Object.is(dep, prevDeps[idx])
		);
	}

	if(hasChanged){
		callback();
	}
	hooks[idx] = depsArr;
}