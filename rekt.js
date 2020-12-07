import dispatcher from './dispatcher.js';

export function createElement(type, props, ...children){
	const element = {type, props, children};

	Object.freeze(element);
	Object.freeze(element.props);

	return element;
}

export function useState(defaultValue){
	return dispatcher.useState(defaultValue);
}

export function useRef(defaultValue){
	return dispatcher.useRef(defaultValue);
}

export function useEffect(callback, deps){
	return dispatcher.useEffect(callback, deps);
}