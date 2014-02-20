# twingl-js

JavaScript client library for accessing resources served from the Twingl API.

# NOTICE

This library is currently under **heavy development** and the API may change
frequently, features may be missing, something might break etc.

If you discover any bugs or problems with the library, submit an issue or pull
request and gain +karma.

## Authentication

This library needs to be supplied with a token that can be obtained from the
Twingl API (note that there is no logic in this library for obtaining a token)

## Getting Started

Usage of the library is fairly straightforward. For all requests, you need to
have a client object available within your application.

### Client

The client is used to store the authentication information required to
communicate with the Twingl API.

It can be created as follows:

```javascript
var client = new Twingl.Client({token: "your api token"});
```

The options available for configuring the client (say, for instance, if you
were testing your application on the Twingl sandbox) are given to the
constructor as an object for its only argument.

These are documented as follows:

Attribute | Description
----------|------------
token     | the token used for authenticating against the API
baseUrl   | The API base url. Defaults to "http://api.twin.gl" (note the lack of trailing slash)
version   | String denoting the API version you want to access. Defaults to "v1"

Once you have a client, you may then start instantiating resource objects to
access information from the platform.

### Resources

To access Twingl resources through the library, you need to create an instance
of the resource class.

Resources usually have five main actions associated with them:

Action  | Description
--------|------------
index   | Get a list of resources
create  | Create a new resource
read    | Read a specific resource
update  | Update an attribute on the resource
destroy | Destroy the resource permanently.

#### Highlights

Accessing Twingl highlights through this library is simple. Consider the
example:

```javascript
// We already have our client that was instantiated earlier
var highlights = new Twingl.Highlights(client);
```

What we now have is an instance of the Highlights resource which can be used to
access and manipulate resources on the Twingl platform.

##### Index

For example, if we want to get a list of all of our highlights (to be paginated
in future), we can make the following call:

```javascript
highlights.index(function(error, response) {
  console.table(response);
});
```

In the `response` parameter, we have a parsed array of our highlights, ready to
be used in our application.

The `index` function optionally accepts an object containing parameters to be
sent in the request to the API. Say for instance we wished to restrict the
highlights returned to just those made on `http://example.com`:

```javascript
highlights.index(function(error, response) {
  console.table(response);
}, {context: "http://example.com"} );
```

By including the second parameter in the function call, we append these
options to the API request. Some options worth mentioning here (but will
otherwise be fully documented with the Twingl API) are listed below.

Option | Description
-------|------------
limit  | (int) Limit the number of objects returned by the server.
offset | (int) Offset the returned list by `offset` items. Used in conjunction with `limit` for pagination
sort   | (string) Sort the list by `attribute`, e.g. `created`
order  | (string) Specify the sort order. Either `asc` or `desc`

##### Read

If we want to read just a single resource from the platform, and already have
its ID, this is a simple task:

```javascript
highlights.read(1, function(error, response) {
  if (error) {
    console.log("Welp, there was an error.", error, response);
  } else {
    console.log(response);
  }
});
```

This will attempt to retrieve the highlight with id `1`. If found, it will be
logged into the console. If not, the log message will be different and both
`error` and `response` will be logged.

**It should be noted that in the event of an error (4xx, 5xx) the `response`
object will be filled with the verbose version of the error response, with
`response` containing just the API's error response body**

##### Create

In order to actually get something onto the platform, we need to be able to
create resources. We'll start with an example again, and then document what's
happening.

```javascript
highlights.create({
  context: "http://example.com",
  quote: "A really compelling text fragment from the inspiring article"
},
function(error, response) {
  console.log(response);
});
```

What will happen here is a Highlight containing the quote (above) will be
created and associated with `http://example.com`. The result of this request
will be logged to the console.

If successful, `response` will contain the object that was just created, e.g.

```javascript
{
  id: 8,
  visibility: "private",
  user_id: 1,
  origin: "web",
  context_url: "http://example.com",
  quote: "A relly compelling text fragment from the inspiring article",
  ranges: [],
  created: "2014-02-20T04:00:35Z",
  updated: "2014-02-20T04:00:35Z"
}
```

If the creation failed for some validation reason, the `error` parameter will
contain an object such as:

```javascript
{
  errors: [
    //validation errors
  ]
}
```

These error cases will be properly documented in the Twingl API documentation.

When creating Highlights, you can supply several attributes to be set. These
are as follows:

Attribute   | Description
------------|------------
context     | (string) The URL of the page the highlight is associated with
quote       | (string) The quoted piece of text in the page
ranges      | (string) Ranges that denote the start/end point of the highlighted text in the DOM
visibility  | (string: 'public', 'private', 'secret') How visible this highlight is

##### Update

Updating a resource follows a very similar method to creating one, except that
an ID needs to be passed to be able to make the request.

In the example below, we're updating the highlight we created in the previous
example and correcting a spelling mistake in the quote (because we're a bit
sensitive to those, apparently)

```javascript
highlights.update(8, {
  quote: "A really compelling text fragment from the inspiring article"
},
function(error, response) {
  console.log(response);
});
```

As before, if the request is successful we won't have an `error` parameter, and
the `response` parameter will contain the new representation of the object;
that is, the updated object.

The attributes and validation behaviour is the same as in `create`

##### Destroy

To delete a resource (or rather `destroy`, as 'delete' is a reserved word), we
need only specify the ID of the item we want to obliterate.

We've decided we don't need that highlight after all, so let's get rid of it:

```javascript
highlights.destroy(8, function(error, response) {
  console.log(response);
});
```

The response will be a little different in this method. As there is no response
body returned by the server for this request, we will return the full, verbose
response object. What you do with this is up to you, but you can safely ignore
it as it's a HTTP `204 No Content`

If the destroy fails for some reason, the behaviour is as in other methods.

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

