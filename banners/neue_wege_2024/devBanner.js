import text from './Banner.html';

import { insertDevBanner } from '../../src/insertDevBanner';

let html = String( text );

insertDevBanner( document.getElementById( 'WMDE-community-dev-banner' ), html );
