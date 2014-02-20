# twingl-js

JavaScript client library for accessing resources served from the Twingl API.

## Authentication

This library needs to be supplied with a token that can be obtained from the
Twingl API (note that there is no logic in this library for obtaining a token)

# Contributing

To get started simply clone the repo, pull the dependencies and run the specs
to make sure everything's set up correctly and start building.

    $ git clone https://github.com/glsignal/twingl-js.git
    $ npm install -g grunt-cli
    $ npm install
    $ grunt watch

Now spin up a web server in the current directory and open the spec runner.

For example

    $ python -m SimpleHTTPServer # Python <3

or

    $ python -m http.server # Python >=3

then open \_SpecRunner.html


Make sure you write specs for any changes you make, and then submit a pull
request. Specs for this project are written with Jasmine.

