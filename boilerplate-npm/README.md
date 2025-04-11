# Managing Packages With npm

This is the boilerplate code for the Managing Packages With npm Challenges. Instructions for working on these challenges start at https://www.freecodecamp.org/learn/back-end-development-and-apis/managing-packages-with-npm/

#### semantic versioning: 
    "MAJOR.MINOR.PATCH"
    MAJOR: New features/changes that wont work with older versions [breaking changes]
    MINOR: New features that are backward compatibe.
    PATCH: Bug fixes that are backward compatible.
    "*MAJOR.MINOR.PATCH"
    *:
        ~: install latest patch version eg: "~1.0.3" [even future patches will be installed]
        ^: install latest MINOR version eg "^1.1.3" [even future minor releases will be installed]
#### Body-parser lib

    i dont understand this part(somewhat), saving for later..

The body is a part of the HTTP request, also called the payload. Even though the data is not visible in the URL, this does not mean that it is private. To see why, look at the raw content of an HTTP POST request:

    POST /path/subpath HTTP/1.0
    From: john@example.com
    User-Agent: someBrowser/1.0
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 20

    name=John+Doe&age=25

As you can see, the body is encoded like the query string. This is the default format used by HTML forms. With Ajax, you can also use JSON to handle data having a more complex structure. There is also another type of encoding: multipart/form-data. This one is used to upload binary files. In this exercise, you will use a URL encoded body. To parse the data coming from POST requests, you must use the body-parser package. This package allows you to use a series of middleware, which can decode data in different formats.

body-parser has already been installed and is in your project's package.json file. require it at the top of the myApp.js file and store it in a variable named bodyParser. The middleware to handle URL encoded data is returned by bodyParser.urlencoded({extended: false}). Pass the function returned by the previous method call to app.use(). As usual, the middleware must be mounted before all the routes that depend on it.

Note: extended is a configuration option that tells body-parser which parsing needs to be used. When extended=false it uses the classic encoding querystring library. When extended=true it uses qs library for parsing.

When using extended=false, values can be only strings or arrays. The object returned when using querystring does not prototypically inherit from the default JavaScript Object, which means functions like hasOwnProperty, toString will not be available. The extended version allows more data flexibility, but it is outmatched by JSON.
