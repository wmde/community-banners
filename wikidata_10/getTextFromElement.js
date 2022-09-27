export default function ( elementId ) {
	const element = document.getElementById( elementId );
	if ( element === null ) {
		return null;
	}
	return element.innerText;
}
