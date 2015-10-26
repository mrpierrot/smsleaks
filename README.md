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

All data are contained in *src/assets/data* and they formated in JSON.


## story.json

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

## actors.json

	{
		"france":{
			"name":"François"						--> Player's name
		},
		"germany":{
			"name":"Angela",						--> CPU's name
			"friendship":0							--> Friendship with player
		}
	}


## act01.json ( example )


Basic example : 

	{
		"sequences":{
			"1":{									--> Sequence ID, 
				"messages":[						--> List of successive messages displayed
					{								--> Starting message
						"from":"germany",			--> User writing
						"text":"Comment vas tu François ?", 	--> Text to display
						"delay":1					--> Delay before next message
					},
					{
						"from":"germany",
						"text":"Hein dis ?",
						"delay":1
					}
				],
				"responses":[						--> List of responses choices 
					{
						"text":"Ça roule ma poule !!!",	--> text of the response
						"goto":2,						--> sequence ID where player go if he choose this response 
						"friendship":{					--> modification of friendship with others persons
							"germany":1					--> here France gain 1 friendship with germany
						}
					},
					{
						"text":"Bof",
						"goto":3,
						"friendship":{
							"germany":-1				--> here France loose 1 friendship with germany
						}
					}
				]
			},

		}
	}

## Advances examples

### Goto format

With **goto**, we can make more complexe routing

**goto** keyword can make severals value :

####	a number like "1" 

routing to sequence 1 from the current act

#### 	a object like {"act":"act02","seq":1}

routing sequence 2 from the "act02"

#### 	a conditionnal with friendship like
	 
	 "goto":["germany.friendship > 2",4,6]

The first parameter is the condition : *if frienship's germany is greater than 2*
if it's true, we routing with the second parameter, here go to sequence 4
if it's false, we routing with the third parameter, here go to sequence 6

We can make more complexe goto like : 

	"goto":["germany.friendship > 2",4,{"act":"act02","seq":1}]

if friendship's germany is greater than 2 so routing to current act, sequence 4
otherwise routing to act 2, sequence 1


### Variables words


We can defined keyword reusable on the following text. 


Definition :

	"responses":[
		{
			"text":"Trou du cul",
			"goto":5,
			"data":{							--> keywords dictionnary
				"fr_name":"Trou du cul" 		--> key / value
			}
		},
		{
			"text":"P'ti fromage",
			"goto":{"act":"act02","seq":1},
			"data":{
				"fr_name":"P'ti fromage"
			}
		}
	]

Usecase : 

	"5":{
		"messages":[
			{"from":"italy","text":"Ok %fr_name% "},	
			{"from":"hungary","text":"Ça me va aussi,  %fr_name% "}
		],
		"goto":{"act":"act02","seq":2}
	}

here **%fr_name%** is replaced by **Trou du cul** or **P'ti fromage**

# Authors

Redactors :

* Hadrien Bibard [@HBibard](https://twitter.com/HBibard)
* Pierre Corbinais [@Oujevipo](https://twitter.com/Oujevipo)

Developer :

* Pierre Chabiland [@PierreChabiland](https://twitter.com/PierreChabiland)


# More newsgame ?

You want to create a specific newsgame? With [Casus Ludi](http://www.casusludi.com/), we can accompany you in your project. Contact us at contact@casusludi.com

# License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
