// Immediately-invoked function expression - DOM
(function () {
    // Return all elements with specified attribute pair
    Dom_Elements_GetByAttribute = function (Document, AttributeName, AttributeValue) {
        var tElements = Dom_Elements_GetByAttributeName(Document, AttributeName);
        var tElements_Length = tElements.length;
        var tMatchingElements = [];
        // Find all elements with specified value for specified attribute
        for (var i = 0; i < tElements_Length; i++) {
            if (tElements[i].getAttribute(AttributeName) === AttributeValue) {
                tMatchingElements.push(tElements[i]);
            }
        }
        return tMatchingElements;
    };

    // Return all elements with specified attribute
    Dom_Elements_GetByAttributeName = function (Document, AttributeName) {
        var tElements = Document.getElementsByTagName('*');
        var tElements_Length = tElements.length;
        var tMatchingElements = [];
        // Find all elements with a value for specified attribute
        for (var i = 0; i < tElements_Length; i++) {
            if (tElements[i].hasAttribute(AttributeName)) {
                tMatchingElements.push(tElements[i]);
            }
        }
        return tMatchingElements;
    };
})(window);
