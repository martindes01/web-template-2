# web-template-2

## About

This is a static website framework that utilises HTML data attributes and Ajax functions to retrieve text from files and insert it dynamically into the current document.

## Getting Started

### Prerequisites

Due to the [same-origin policy](https://developer.mozilla.org/docs/Web/Security/Same-origin_policy), a local web server is required to run the site locally.
This can be achieved using the [Python 3](https://www.python.org/) `http.server` module, as described [here](https://developer.mozilla.org/docs/Learn/Common_questions/set_up_a_local_testing_server).

### Installation

Simply link the `Dom.js` and `Ajax.js` scripts via the CDN, and follow the [guide](#guide) and [reference](#reference).

```html
<script src="https://cdn.jsdelivr.net/gh/martindes01/web-template-2/Scripts/Dom.js"></script>
<script src="https://cdn.jsdelivr.net/gh/martindes01/web-template-2/Scripts/Ajax.js"></script>
```

### Example

An example can be viewed at [martindes01.github.io/web-template-2](https://martindes01.github.io/web-template-2).
Clone the source from this repository.

```shell
git clone https://github.com/martindes01/web-template-2.git
cd web-template-2
```

## Usage

### Guide

#### Create the Files

Create a basic HTML file `index.html`.

```html
<!DOCTYPE html>
<html>
  <head></head>
  <body></body>
</html>
```

Create two files `a.txt` and `b.txt` containing text to be loaded dynamically into `index.html`.

```shell
echo "A is for Apple" >> a.txt
echo "B is for Banana" >> b.txt
```

#### Link the Scripts

Link the `Dom.js` and `Ajax.js` scripts via the CDN.

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/gh/martindes01/web-template-2/Scripts/Dom.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/martindes01/web-template-2/Scripts/Ajax.js"></script>
  </head>
  <body></body>
</html>
```

#### Add the HTML Data Attributes

Add a `data-ajax-text-files` attribute to the `body` element of `index.html`, specifying the space-delimited paths to `a.txt` and `b.txt`.

```html
<body data-ajax-text-files="a.txt b.txt"></body>
```

Add two suitable container elements and give each a `data-ajax-text-file` attribute that specifies the path to one of the text files.

```html
<body data-ajax-text-files="a.txt b.txt">
  <div data-ajax-text-file="a.txt"></div>
  <div data-ajax-text-file="b.txt"></div>
</body>
```

#### Call the Ajax Function

Where appropriate, add a call to the asynchronous function `Ajax_Document_StartText(<callback>)`.

```html
<body data-ajax-text-files="a.txt b.txt"
      onload="Ajax_Document_StartText(function () {
        console.log('Hello, World!');
      });">
  <div data-ajax-text-file="a.txt"></div>
  <div data-ajax-text-file="b.txt"></div>
</body>
```

This function
1. loads the files specified by `data-ajax-text-files` dynamically,
2. appends the contents of each file to the inner HTML of all container elements with a corresponding `data-ajax-text-file` attribute, and
3. executes the given callback function.

The final `index.html` should look like this:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.jsdelivr.net/gh/martindes01/web-template-2/Scripts/Dom.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/martindes01/web-template-2/Scripts/Ajax.js"></script>
  </head>
  <body data-ajax-text-files="a.txt b.txt"
        onload="Ajax_Document_StartText(function () {
          console.log('Hello, World!');
        });">
    <div data-ajax-text-file="a.txt"></div>
    <div data-ajax-text-file="b.txt"></div>
  </body>
</html>
```

#### Run the Site

To run the site locally, start a web server in the root directory.
This can be achieved by running the Python 3 `http.server` module, optionally specifying a port number `<port>`.
This will serve the contents of the directory to `localhost:<port>`.
If unspecified, `<port>` defaults to `8000`.

```shell
python3 -m http.server [<port>]
```

### Reference

#### HTML Data Attributes

Attribute | Description
--- | ---
`data-ajax-text-files="<path>..."` | Specifies a space-delimited list of paths to text files whose contents are to be included in the document. Must be placed on the `body` element.
`data-ajax-text-file="<path>"` | Specifies that the content of the text file at the given path is to be appended to the inner HTML of this element. The path must also be present in the value of the `data-ajax-text-files` attribute.
`data-ajax-text-count="<number>"` | Specifies that the content of a text file is to be appended to the inner HTML of this element the given number of times. Can only be used in conjunction with a `data-ajax-text-file` attribute.
`data-ajax-text-file-uniquify="<path>"` | Specifies that each time the content of the text file at the given path is appended to the inner HTML of an element, a count is to be appended to the values of all `id` attributes present in the content. The count begins at `0` for each containing element. Can be placed on any element in the document.
`data-ajax-xml-files="<path>..."` | Specifies a space-delimited list of paths to XML files whose tag contents are to be included in the document. Must be placed on the `body` element.
`data-ajax-xml-file="<path>"` | Specifies that the content of a tag in the XML file at the given path is to be appended to the inner HTML of an element. The path must also be present in the value of the `data-ajax-xml-files` attribute. Can only be used in conjunction with a `data-ajax-xml-tag` attribute.
`data-ajax-xml-tag="<xpath>"` | Specifies that the content of the tag corresponding to the given XPath expression in an XML file is to be appended to the inner HTML of an element. Can only be used in conjunction with a `data-ajax-xml-file` attribute.
`id="<path><xpath><index>`" | Specifies that the content of the given occurrence of the tag corresponding to the given XPath expression in the XML file at the given path is to be appended to the inner HTML of this element. The first such occurrence has an index of `0`. Should be used in conjunction with a pair of `data-ajax-xml-file` and `data-ajax-xml-tag` attributes. The number of such pairs must be greater than the greatest given corresponding index.

#### JavaScript Functions

Function | Description
--- | ---
`Ajax_Document_StartText(<callback>)` | Retrieves the text files at the paths specified by `data-ajax-text-files` and inserts their contents into the current document according to the presence and values of all `data-ajax-text-file`, `data-ajax-text-count` and `data-ajax-text-file-uniquify` attributes. Executes the given callback function on completion.
`Ajax_Document_StartXml(<callback>)` | Retrieves the XML files at the paths specified by `data-ajax-xml-files` and inserts the contents of their tags into the current document according to the presence and values of all `data-ajax-xml-file`, `data-ajax-xml-tag` and `id` attributes. Executes the given callback function on completion.

## License

This project is distributed under the terms of the MIT License.
See [LICENSE](LICENSE) for more information.
