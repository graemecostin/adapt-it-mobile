var IcomaticUtils = (function() {
return {
fallbacks: [{ from: 'retranslationdelete', 'to': '\ue004' },{ from: 'placeholderdelete', 'to': '\ue002' },{ from: 'retranslationnew', 'to': '\ue005' },{ from: 'placeholdernew', 'to': '\ue003' },{ from: 'phrasedelete', 'to': '\ue000' },{ from: 'phrasenew', 'to': '\ue001' }],
substitute: function(el) {
    var curr = el.firstChild;
    var next, alt;
    var content;
    while (curr) {
        next = curr.nextSibling;
        if (curr.nodeType === Node.TEXT_NODE) {
            content = curr.nodeValue;
            for (var i = 0; i < IcomaticUtils.fallbacks.length; i++) {
                content = content.replace( IcomaticUtils.fallbacks[i].from, function(match) {
                    alt = document.createElement('span');
                    alt.setAttribute('class', 'icomatic-alt');
                    alt.innerHTML = match;
                    el.insertBefore(alt, curr);
                    return IcomaticUtils.fallbacks[i].to;
                });
            }
            alt = document.createTextNode(content);
            el.replaceChild(alt, curr);
        }
        curr = next;
    }
},
run: function(force) {
    force = typeof force !== 'undefined' ? force : false;
    var s = getComputedStyle(document.body);
    if (('WebkitFontFeatureSettings' in s)
        || ('MozFontFeatureSettings' in s)
        || ('MsFontFeatureSettings' in s)
        || ('OFontFeatureSettings' in s)
        || ('fontFeatureSettings' in s))
        if (!force)
            return;
    var els = document.querySelectorAll('.icomatic');
    for (var i = 0; i < els.length; i++)
        IcomaticUtils.substitute(els[i]);
}
} // end of object
} // end of fn
)()