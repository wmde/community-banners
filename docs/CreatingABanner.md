# Creating a Banner

This document covers the basics of what you need to do to in order to create a new community banner.

## Getting Started

There's a sample banner that contains all you need to get started. You can find it in `banners/sample`. This consists of 2 files:

- `banner.html`: The code for the banner. This includes all the html, css, and javascript. The contents of this file are then pasted into [Central Notice](https://meta.wikimedia.org/w/index.php?title=Special:CentralNotice) to go live.
- `devBanner.js`: This is used for development only, and handles inserting the banner code into the correct place on Wikipedia when you're running the dev environment. It also has some  code to do string replacement in case you need to use localisations in your banner.

To create a new banner you should first make a copy of this folder.

Next you should edit the `banners.toml` file in the root of the project and add a new configuration item for your banner. You can copy and edit the config for the sample banner. Be sure to update the `filename` path to point at your new folder.

Once that's done you run `npm install` and then `npm run start` to start the development environment. You can then load `http://localhost:8085` in the browser and should see a list of the banners. Clicking the link to your banner will open a proxied Wikipedia and insert the code from `Banner.html`.

## Conditionally Showing a Banner

The sample banner contains a function called `shouldShowBanner()` that has some examples of different ways you can conditionally show the banner. You can also look through the mw object on wikipedia using the browser console for a more comprehensive list of items stored about a person.

**Note 1:** To make sure there's no flash of visible banner before the javascript decides it should be hidden you should load the banner with the css style `display: none;` then add a class to override that when the banner is to be shown. This is how the sample banner does it so you can copy that.

**Note 2:** One of the checks in the `shouldShowBanner()` function is looking for a `banner` URL parameter. This is used to make sure the banner will always be visible in the development and preview environments so you should keep that in and make sure that that check is the first one in the function.

## Impression Counting

There's a class in the script of the banner called `ImpressionCounter`. This is used to store the amount of times a wikipedian has seen a banner, and is used for tracking the amount of times they've seen a banner before interacting with it. It may also be used to ensure that they don't see a banner more than n number of times in the `shouldShowBanner()` function.

## Tracking

There's a tracking function called `trackEvent()` in the banner code. This is used to record interactions and is mostly called through click event handlers. There's a couple of sample functions that track the close and interact events included in the sample banner.

## Localisation

Sometimes a banner needs to be localised. In production the localisations are managed through the [language feature in Central Notice](https://meta.wikimedia.org/wiki/Help:CentralNotice#Working_with_Translations). The way it works is instead of putting the text content in the banner, you put in locale tags which in Central Notice are formatted like: `{{{my_language_item}}}`. Then Central Notice will replace these variables with the correct localisation when loading the banner.

The problem with that is it doesn't work in our development environment, so we have to manually insert the text into the banner so we can see actual content while developing. This is done in the `devBanner.js` file in the banner folder. You should create an item in there for each localisation string you put into the banner, and what it should be output as. It will then do a find and replace and replace the variable tags with the text you provided. That way you can get a better idea of what the banner will look like in production.

If you don't need localisation you can delete the `translations` variable and the loop that does the string replacement in `devBanner.js`.
