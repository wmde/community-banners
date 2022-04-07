# Developer Guide

This document is for external developers and contains an overview of how this project works and where the banners are used. For technical information on how to run the environment please read the [README](README.md).

## What is a banner?

We run various campaigns on Wikipedia. We do this by displaying banners to targeted users. These banners are run through campaigns on Wikipedia and appear to the user on the top of the page when it loads.

## How does this developer environment work?

* This is a node/npm based development environment that builds banners as minified strings, then wraps them in Wikitext tags so they can be added to Wikipedia. 
* You can run it in Docker by using the commands in the Makefile. You can also run it in your local node environment. 
* Once it's running you can view it at http://localhost:8085. 
* The campaign links you see at that URL are configured in the `campaign_info.toml` file found in the root of the project.
* There is a proxy that inserts the dev banner onto Wikipedia so you can test it locally while working on it.

## How do I get started?

1. Fork the current default branch of this repo into your GitHub account.
2. Create a new branch to work on.
3. Copy a banner folder that has similar functionality to the banner you need to build and rename it.
4. Add configuration for that banner to `campaign_info.toml`. it must have campaign and banner configuration. Point the filename of the banner configuration item to your banner entry point.
5. Start the environment using the commands in the Makefile. There is information on how to do that in the [README](README.md).
6. If you don't want to use Docker/Make you can look into the Makefile to see the npm commands and run it in your local Node.

## Developing for Wikipedia Skins

Usually we aim community banners at logged in members. These members are able to choose their preferred Wikipedia skin. Because of this we need to make sure a banner works on all the available skins.

**Skins:**
* Vector
* Minerva
* Monobook
* Timeless

To look at your banner on these skins you can change the `useskin` in the URL. For you convenience, you can also add multiple campaigns in the `campaign_info.toml` that specify the skin per campaign in the url in the `preview_link`. Take a look at the below example, you can see each campaign has a different name, but all point to the same banner and are using a different skin.

Please remove the different campaign variations from the configuration file before submitting your pull request.

```toml
[paidwriting]
campaign_tracking = "WMDE_paid_editing_survey"
preview_link = "/wiki/Wikipedia:Hauptseite?useskin=vector&banner=B17WMDE_webpack_prototype&devbanner={{banner}}"
wrapper_template = "wikipedia_org"

[paidwriting.banners.ctrl]
filename = "./wikipedia_paidwriting/banner_ctrl.js"
pagename = "B22WMDE_paid_editing_survey"
tracking = "WMDE_paid_editing_survey"

[paidwriting_monobook]
campaign_tracking = "WMDE_paid_editing_survey"
preview_link = "/wiki/Wikipedia:Hauptseite?useskin=monobook&banner=B17WMDE_webpack_prototype&devbanner={{banner}}"
wrapper_template = "wikipedia_org"

[paidwriting_monobook.banners.ctrl]
filename = "./wikipedia_paidwriting/banner_ctrl.js"
pagename = "B22WMDE_paid_editing_survey_b1_monobook"
tracking = "WMDE_paid_editing_survey_b1_monobook"

[paidwriting_minerva]
campaign_tracking = "WMDE_paid_editing_survey"
preview_link = "/wiki/Wikipedia:Hauptseite?useskin=Minerva&banner=B17WMDE_webpack_prototype&devbanner={{banner}}"
wrapper_template = "wikipedia_org"

[paidwriting_minerva.banners.ctrl]
filename = "./wikipedia_paidwriting/banner_ctrl.js"
pagename = "B22WMDE_paid_editing_survey_b1_minerva"
tracking = "WMDE_paid_editing_survey_b1_minerva"

[paidwriting_timeless]
campaign_tracking = "WMDE_paid_editing_survey"
preview_link = "/wiki/Wikipedia:Hauptseite?useskin=timeless&banner=B17WMDE_webpack_prototype&devbanner={{banner}}"
wrapper_template = "wikipedia_org"

[paidwriting_timeless.banners.ctrl]
filename = "./wikipedia_paidwriting/banner_ctrl.js"
pagename = "B22WMDE_paid_editing_survey_b1_timeless"
tracking = "WMDE_paid_editing_survey_b1_timeless"
```

## How do I target specific users?

We have access to Wikipedia javascript objects in the banner. This is how we are able to target specific user groups.

If you look in the folder of a banner that is targeting a group you'll see a `shouldShowBanner.js` file. These are a good way to keep that logic in a single place and are then used by the banner entry point. Here is an example:

```js
export default function shouldShowBanner() {
	const urlParams = new URLSearchParams( window.location.search );
	const loggedIn = mw.config.get( 'wgUserRegistration' );
	const editCount = mw.config.get( 'wgUserEditCount' );
    
	// This is for the developer and preview environments
    // to force the banners to always show there
	if ( urlParams.has( 'banner' ) ) {
		return true;
	}
	
	// Only show to logged in members
	if ( !loggedIn ) {
		return false;
	}
    
	// This campaign is targeting people who never edited
    // or edited more than 200 times
	if ( editCount < 1 || editCount > 200 ) {
		return false;
	}

	return true;
}
```

The `mw.config` object is a global Wikipedia object that the banner can use. Depending on the banner requirements you will have to create a custom version of this file for your project. 

## How do I submit my changes?

When your banner is ready to be submitted:

1. Create a Pull Request in GitHub from your branch into the master branch in our banner repo.
2. We will review it in the PR and any changes can be done there.
3. Once the review has passed we will build it and add it to our banner tool to be displayed.
4. Once the campaign is over we will merge the PR into our codebase.