Emus ITDP México
====================
Strategy of Sustainable Urban Mobility
- Roadmap for implementing sustainable urban mobility projects

Requirements
-------
- nodejs
- bower

Install packages and dependencies
-------
##### For frontend packages
```
$ bower install
```
##### For gulp packages and dependencies
```
$ npm install
```
or for root permissions
```
$ sudo npm install
```

Folder Structure
-------
```
.emus-itdp
|--bower_components/        # Frontend packages
|--node_modules/            # browser-sync, gulp and dependencies
|--build/                   # Main Prod (only for production)
|   |_ components
|   |_ css
|   |_ iconfonts
|   |_ images
|   |_ js
|   |_ index.html           # Main index for prod server
|--src                      # Main DEV
|   |_ client  
|   |   |_ components
|   |   |   |_ ...          # html and js compontents (angular view, controller, factory, service, etc.)
|   |   |   |_ emus.module  # Main angular module
|   |   |   |_ emus.routes  # Routes
|   |   |_ iconfonts
|   |   |_ images
|   |   |_ js
|   |   |_ styles
|   |   |   |_  ...           # Sass stylesheets for each view's component 
|   |   |_ index.html         # Main index for Dev server
|   |_ server                 # Other configurations
|--tmp                        # Final template file from each angular view (for production)
```

Quick start (dev server)
-------

Quick start (build server)
-------
**soon**
