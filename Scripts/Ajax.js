// Immediately-invoked function expression - AJAX
(function () {
    // Private constants
    const cAttributeName_TextCount = "data-ajax-text-count";
    const cAttributeName_TextFile = "data-ajax-text-file";
    const cAttributeName_TextFiles = "data-ajax-text-files";
    const cAttributeName_TextFileUniquify = "data-ajax-text-file-uniquify";
    const cAttributeName_XmlFile = "data-ajax-xml-file";
    const cAttributeName_XmlFiles = "data-ajax-xml-files";
    const cAttributeName_XmlTag = "data-ajax-xml-tag";
    const cDelimiter_TextFiles = ' ';
    const cDelimiter_XmlFiles = ' ';
    const cFileType_Text = "text";
    const cFileType_Xml = "xml";
    const cNodeType_Attribute = "attribute";
    const cNodeType_Element = "element";
    const cReadyState_Done = 4;
    const cStatus_Ok = 200;

    // Private variables
    var vCallbackFunction;
    var vCount_TextFiles;
    var vCount_TextFilesProcessed = 0;

    // Begin loading text files into document
    Ajax_Document_StartText = function (CallbackFunction) {
        // Store document callback function
        vCallbackFunction = CallbackFunction;
        // Check for text files attribute
        if (document.body.hasAttribute(cAttributeName_TextFiles)) {
            // Retrieve paths of text files
            var tTextFiles = document.body.getAttribute(cAttributeName_TextFiles).split(cDelimiter_TextFiles);
            vCount_TextFiles = tTextFiles.length;
            // Load each text file
            for (var i = 0; i < vCount_TextFiles; i++) {
                Ajax_File_Load(tTextFiles[i], cFileType_Text);
            }
        }
    };

    // Begin loading XML files into document
    function Ajax_Document_StartXml() {
        // Check for XML files attribute
        if (document.body.hasAttribute(cAttributeName_XmlFiles)) {
            // Retrieve paths of XML files
            var tXmlFiles = document.body.getAttribute(cAttributeName_XmlFiles).split(cDelimiter_XmlFiles);
            var tXmlFiles_Length = tXmlFiles.length;
            // Load each XML file
            for (var j = 0; j < tXmlFiles_Length; j++) {
                Ajax_File_Load(tXmlFiles[j], cFileType_Xml);
            }
        }
    }

    // Load specified file from server
    function Ajax_File_Load(File, Type) {
        var tXhr = new XMLHttpRequest();
        // Define function to handle response
        tXhr.onreadystatechange = function () {
            if (this.readyState === cReadyState_Done && this.status === cStatus_Ok) {
                // Send document to relevant processing function
                if (Type === cFileType_Xml) {
                    Ajax_DocumentXml_Process(this, File, this.responseXML);
                } else {
                    // Check whether file has been marked for uniquification
                    if (Dom_Elements_GetByAttribute(document, cAttributeName_TextFileUniquify, File).length > 0) {
                        // Retrieve IDs for uniquification
                        var tDocumentTextIds = Ajax_DocumentXml_RetrieveNodes(this, this.responseXML, "//@id", cNodeType_Attribute);
                        Ajax_DocumentText_Process(File, this.responseText, tDocumentTextIds);
                    } else {
                        Ajax_DocumentText_Process(File, this.responseText, null);
                    }
                }
            }
        };
        // Send request for file
        tXhr.open("GET", File + "?id=" + Math.random(), true);
        tXhr.send();
    }

    // Process text document
    function Ajax_DocumentText_Process(File, Document, UniquificationIds) {
        // Get HTML elements that require data from document
        var tElements = Dom_Elements_GetByAttribute(document, cAttributeName_TextFile, File);
        var tElements_Length = tElements.length;
        // Append contents of document to each element for specified number of times
        for (var i = 0; i < tElements_Length; i++) {
            var tCount = 1;
            var tElement = tElements[i];
            if (tElement.hasAttribute(cAttributeName_TextCount)) {
                tCount = tElement.getAttribute(cAttributeName_TextCount);
            }
            for (var j = 0; j < tCount; j++) {
                if (UniquificationIds) {
                    // Uniquify IDs
                    var tDocumentString = new String(Document);
                    for (var k = 0; k < UniquificationIds.length; k++) {
                        tDocumentString = tDocumentString.replace(UniquificationIds[k], UniquificationIds[k] + j);
                    }
                    tElement.innerHTML += tDocumentString;
                } else {
                    tElement.innerHTML += Document;
                }
            }
        }
        // Call document callback function and XML loading function when all initial text files processed
        if (++vCount_TextFilesProcessed === vCount_TextFiles) {
            vCallbackFunction();
            Ajax_Document_StartXml();
        }
    }

    // Process XML document
    function Ajax_DocumentXml_Process(Xhr, File, Document) {
        // Get HTML elements that require data from document
        var tElements = Dom_Elements_GetByAttribute(document, cAttributeName_XmlFile, File);
        var tElements_Length = tElements.length;
        // Retrieve XML tags in which required data is contained
        var tDocumentXmlTags = [];
        for (var i = 0; i < tElements_Length; i++) {
            if (tElements[i].hasAttribute(cAttributeName_XmlTag)) {
                var tDocumentXmlTag = tElements[i].getAttribute(cAttributeName_XmlTag);
                if (tDocumentXmlTags.indexOf(tDocumentXmlTag) === -1) {
                    tDocumentXmlTags.push(tDocumentXmlTag);
                }
            }
        }
        var tDocumentXmlTags_Length = tDocumentXmlTags.length;
        // Fill each element with contents of relevant XML tag
        for (var j = 0; j < tDocumentXmlTags_Length; j++) {
            var tRelevantDocumentXmlTag = tDocumentXmlTags[j];
            var tRecipientElements_Length = Dom_Elements_GetByAttribute(document, cAttributeName_XmlTag, tRelevantDocumentXmlTag).length;
            var tDocumentXmlNodePath = "//" + tRelevantDocumentXmlTag;
            var tDocumentXmlNodeValues = Ajax_DocumentXml_RetrieveNodes(Xhr, Document, tDocumentXmlNodePath, cNodeType_Element);
            for (var k = 0; k < tRecipientElements_Length; k++) {
                document.getElementById(File + tRelevantDocumentXmlTag + k).innerHTML = tDocumentXmlNodeValues[k];
            }
        }
    }

    // Retrieve contents of XML nodes at specified path
    function Ajax_DocumentXml_RetrieveNodes(Xhr, Document, NodePath, NodeType) {
        var tNodeValues = [];
        // Retrieve contents of nodes at specified path
        if (Document.evaluate) {
            var tNodes = Document.evaluate(NodePath, Document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            var tNodeRemaining = tNodes.iterateNext();
            if (NodeType === cNodeType_Attribute) {
                while (tNodeRemaining) {
                    tNodeValues.push(tNodeRemaining.nodeValue);
                    tNodeRemaining = tNodes.iterateNext();
                }
            } else {
                while (tNodeRemaining) {
                    tNodeValues.push(tNodeRemaining.childNodes[0].nodeValue);
                    tNodeRemaining = tNodes.iterateNext();
                }
            }
        } else if (window.ActiveXObject || Xhr.responseType === "msxml-document") {
            // Evaluate path for Internet Explorer
            Document.setProperty("SelectionLanguage", "XPath");
            var tNodesIE = Document.selectNodes(NodePath);
            var tNodesIE_Length = tNodesIE.length;
            if (NodeType === cNodeType_Attribute) {
                for (var i = 0; i < tNodesIE_Length; i++) {
                    tNodeValues.push(tNodesIE[i].nodeValue);
                }
            } else {
                for (var j = 0; j < tNodesIE_Length; j++) {
                    tNodeValues.push(tNodesIE[j].childNodes[0].nodeValue);
                }
            }
        }
        return tNodeValues;
    }
})(window);
