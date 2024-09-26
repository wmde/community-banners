/**
 * When you set the innerHTML of an element with code that contains a script tag the javascript does not
 * get executed. This is only a problem for us in the dev environment, so what we do is grab the script
 * element after it's been set, then replace it with itself causing the javascript to then be run.
 */
export function insertDevBanner( element, html ) {
	element.innerHTML = html;

	const oldScriptElement = element.querySelector( 'script' );

	if ( !oldScriptElement ) {
		return;
	}

	const newScriptElement = document.createElement( 'script' );
	newScriptElement.appendChild( document.createTextNode( oldScriptElement.innerHTML ) );
	oldScriptElement.parentNode.replaceChild( newScriptElement, oldScriptElement );
}
