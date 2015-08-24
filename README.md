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
|   |   |   |_ ...          # html and js components (angular)
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
Run **gulp**:
```js
$ gulp dev
```
this will run server on port 1982, or can be changed on gulpfile.js file, **server** gulp task:
```js
port: 1982
```
Quick start (build server)
-------

1. Run **gulp inject**.

  ```js
  $ gulp inject
  ```
  - To add css and js paths to index.html.
  - To minifying HTML and putting in $templateCache.
  - To add main directory for each HTML templates.
  
2. Run **gulp build**.

  ```js
  $ gulp build
  ```
  this will create a **build** folder for test or upload on server for production.


3. Run **gulp prod**:
  ```js
  $ gulp prod
  ```
this will run server on port 2015 for final test.
