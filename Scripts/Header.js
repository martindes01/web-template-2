// Immediately-invoked function expression - Header
(function () {
    // Private variables
    var vDropdownButtonClassName;
    var vDropdownContentClassName1;
    var vDropdownContentClassName2;

    // Toggle navigation menu
    ContentBlock_Toggle = function (ContentBlockId, ContentButtonId, ContentBlockClassName1, ContentBlockClassName2, ContentButtonClassName1, ContentButtonClassName2) {
        // Temporary variables
        var tContentBlock = document.getElementById(ContentBlockId);
        var tContentButton = document.getElementById(ContentButtonId);
        // Toggle class of content block
        if (tContentBlock.className === ContentBlockClassName1) {
            tContentBlock.classList.add(ContentBlockClassName2);
            tContentButton.classList.add(ContentButtonClassName2);
        } else {
            tContentBlock.classList.remove(ContentBlockClassName2);
            tContentButton.className = ContentButtonClassName1;
        }
    };

    // Toggle specified dropdown menu
    DropdownContent_Show = function (DropdownButtonClassName, DropdownContentId, DropdownContentClassName1, DropdownContentClassName2, HideSimilar) {
        var tDropdownContent = document.getElementById(DropdownContentId);
        var tDropdownContentClassName = tDropdownContent.className;
        vDropdownButtonClassName = DropdownButtonClassName;
        vDropdownContentClassName1 = DropdownContentClassName1;
        vDropdownContentClassName2 = DropdownContentClassName2;
        // Reset class of all elements with DropdownContentClassName2 as necessary
        if (HideSimilar) {
            DropdownContents_Hide(vDropdownContentClassName1, vDropdownContentClassName2);
        }
        // Set class of specified dropdown content to DropdownContentClassName2 as necessary
        if (tDropdownContentClassName === DropdownContentClassName1) {
            tDropdownContent.classList.replace(DropdownContentClassName1, DropdownContentClassName2);
        }
    };

    // Close all dropdown menus
    DropdownContents_Hide = function (DropdownContentClassName1, DropdownContentClassName2) {
        // Temporary variables
        var tDropdownContents = document.getElementsByClassName(DropdownContentClassName2);
        var tDropdownContents_Length = tDropdownContents.length;
        var i;
        // Reset class of all elements with DropdownContentClassName2
        for (i = 0; i < tDropdownContents_Length; i++) {
            tDropdownContents[i].classList.replace(DropdownContentClassName2, DropdownContentClassName1);
        }
    };

    // Close all dropdown menus on loss of mouse capture
    window.onclick = function (event) {
        if (!event.target.matches('.' + vDropdownButtonClassName)) {
            DropdownContents_Hide(vDropdownContentClassName1, vDropdownContentClassName2);
        }
    };
})(window);
