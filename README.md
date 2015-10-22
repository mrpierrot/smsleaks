# SMS Leaks

SMS Leaks is a newsgame realised during the Nantes [Newsgame Hachathon](http://www.newsgames-hackathon.com/) on 24-26 september. 

You play François, the french president who discusses by sms with other heads of state. 

# Technologies

SMS Leaks is realised in HTML/CSS/JS with [AngularJS](https://angularjs.org/), [Browserify](http://browserify.org/), [Gulp](http://gulpjs.com/) and [NodeJs](https://nodejs.org/)

# Installation

## NodeJS

The developement environement is based on NodeJS. The first think to do is install it.
NodeJS is available at https://nodejs.org/en/download/

## Gulp

Gulp is a task runner. It help to execute recurrent task. 
To install Gulp you must run a command line terminal and write :

	$ npm install --global gulp

## Others dependances

Run a command line terminal on the project's root directory and write : 

	$ npm install

# Build App

Run :

	$ gulp --production

This line create a *dist* folder with compressed files


# Test App

	$ gulp connect --production

This line launch a mini web server with you can test the production app at http://localhost:1983/


# Develop 

Run just : 

	$ gulp
This line create a *build* folder, clean it if needed, and copy js, css, asset and run a mini webserver. *build* is the developement folder.
Keep the terminal alive and test at http://localhost:1983/

Modify images, js and less files rebuilt app and reloaded the test page. 


# Writing another story

All data are contained in *src/assets/data*
The main data file is **src/assets/data/story.json**
Actually, this file contain : 

	{
		"player":"france",							--> The player id
		"actors":"./assets/data/actors.json",		--> The path of actors list
		"start":"act01",							--> The first act to play
		"acts":{									--> List of the acts with "ACT_NAME":"ACT_PATH"
			"act01":"/assets/data/fr/act01.json",
			"act02":"/assets/data/fr/act02.json",
			"act03":"/assets/data/fr/act03.json",
			"act04":"/assets/data/fr/act04.json"
		}
	}


# Authors

Redactors :

* Hadrien Bibard [@HBibard](https://twitter.com/HBibard)
* Pierre Corbinais [@Oujevipo](https://twitter.com/Oujevipo)

Developer :

* Pierre Chabiland [@PierreChabiland](https://twitter.com/PierreChabiland)

# License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
