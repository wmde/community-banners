# Wikimedia Deutschland Community Banners

This project is used for developing community banners for Wikimedia Deutschland to be uploaded
to [Central Notice](https://meta.wikimedia.org/w/index.php?title=Special:CentralNotice).

## Getting Started

1. Clone this repo `$ git clone git@github.com:wmde/community-banners.git`.
2. Run `$ npm install` to install the project dependencies.
3. Run `$ npm run start` to run the project.
4. Go to [http://localhost:8085/](http://localhost:8085/) in your browser.

## Adding a Banner

1. Create a new configuration item in the `banners.toml`. The easiest thing to do is to copy/paste an existing one.
2. Duplicate the `banners/sample` folder, and point the `filename` item in your config to the javascript entry point (usually `banners/MY_BANNER/index.js`).
3. If you're already running the project restart it to load the new config.
4. Edit your html.

## A Brief Description of how the Environment Works

The 3 main things we do to make this development environment work:

1. Proxy Wikipedia pages into our local banner URLs.  
2. Request a [development banner](https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners/edit/B24_WMDE_Community_Dev_Banner) that contains code to inject a script tag into Wikipedia that points to our local banner's entry point.
3. Load our banner html as a module and inject that into the development banner.

## Deploying a banner

1. You first need to be a Central Notice admin, or contact the Fundraising Team's PM to ask them to upload it.
2. After that uploading is straight forward, you need to create an empty [banner](https://meta.wikimedia.org/wiki/Special:CentralNoticeBanners) and then create a [campaign](https://meta.wikimedia.org/w/index.php?title=Special:CentralNotice) and add the banner to it. 
3. You can then copy and paste your css/html/js from your banner.html into the Central Notice banner you created. 
4. You can preview your banner in the live environment by going to Wikipedia and requesting a banner: `https://en.wikipedia.org/wiki/Main_Page?banner=[MY_CN_BANNER]`.

## Language Items

Central Notice uses a [community translation service](https://meta.wikimedia.org/wiki/Help:CentralNotice#Working_with_Translations), if you add translation tags into you banner and upload it to a banner it will automatically make a translation item for you to enter your text.  This is a problem for the local environment as when working on your banner locally it won't replace the items with the translations for you. This means that you need to manually replace the translations in the banner entry point. Here's an example:

```js
import text from './Banner.html';
let html = String( text );

const translations = {
    '{{{MY_TRANSLATION_KEY}}}' : 'This is my translated text',
};

Object.keys( translations ).forEach( key => html = html.replace( key, translations[ key ] ) );

document.getElementById( 'WMDE-comunity-dev-banner' ).innerHTML = html;
```
