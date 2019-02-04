# json-yaml-generator
Application to generate JSON and YAML and keep in repository to be updated. For advanced developers, it's purpose is to generate playbook for ansible tasking and keep track of tasks

# Description
User can generate a JSON or YAML structure just putting key/values in a user friendly interface. This tool eases the load of creating complex JSON/YAML objects manually by coding, and just using the interface one can easily achieve it. The objects are also stored in local repository for future use.<br/>

For advanced developers, for ANSIBLE, one can create tasks and put them into one yaml file to input to the ansible, basiclly it is a user friendly ansible playbook generator. And for more user friendly purpose, one can even see the saved tasks from local repository

# Technology Stack
For front end development, normal HTML, CSS, JS, JQuery is ther, along with MVC architecture, Angular JS, Bootstrap.

For backend development, Node JS is used, with Express JS framework.

*NO DB USED (JSON FILES USED TO STORE DATA)

# Deployment Guide
Download the entire project and place it in a particular file (for example, place it under DEMO folder)

OR

use the git clone command to clone it to a particular folder (for now, let's place it in DEMO folder), such as-

`git clone https://github.com/gitsumanmandal/json-yaml-generator DEMO_folder_path`

and then run the below commands -

`npm install`

`npm start`

# Prerequisite
1. You must have installed NODE JS
2. replace all the occurrence of `https://json-yaml-generator.herokuapp.com` to `localhost:5000`. The GIT code is deployed in heroku, hence you need to change the host details. Remember, in your case, the localhost PORT may differ (5000 is hard coded). Please see app.js for HOST PORT configuration

# Deployed Live
You may find the deployed product [HERE](https://json-yaml-generator.herokuapp.com/workspace/entrypoint-view/) <br/>
This is a Free Heroku App Server

# Summary
One can use this tool for above mentioned purpose as well as for education of Full Stack Application Development using Node JS, Express JS, Angular JS

# Screen Shots
## Screen shot 1
![App Screen 1](https://github.com/gitsumanmandal/json-yaml-generator/blob/master/screen-shots/app-screen-1.PNG)

## Screen shot 2
![App Screen 1](https://github.com/gitsumanmandal/json-yaml-generator/blob/master/screen-shots/app-screen-2.PNG)

## Screen shot 3
![App Screen 1](https://github.com/gitsumanmandal/json-yaml-generator/blob/master/screen-shots/app-screen-3.PNG)

## Screen shot 4
![App Screen 1](https://github.com/gitsumanmandal/json-yaml-generator/blob/master/screen-shots/app-screen-4.PNG)

# Author
Suman Mandal
