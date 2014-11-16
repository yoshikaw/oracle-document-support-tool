var scriptSrc = './modify_oracle_document_title.js';

var urls = [
//    // 12c R1 Reference [en]
//    'https://docs.oracle.com/database/121/REFRN/toc.htm',
//    // 11g R2 Reference [en]
//    'https://docs.oracle.com/cd/E11882_01/server.112/e40402/toc.htm',
//    // 11g R1 Reference [en]
//    'https://docs.oracle.com/cd/B28359_01/server.111/b28320/toc.htm',
//    // 10g R2 Reference [en]
//    'https://docs.oracle.com/cd/B19306_01/server.102/b14237/toc.htm',
    // 12c R1 Reference [ja]
    'https://docs.oracle.com/cd/E57425_01/121/REFRN/toc.htm',
    // 11g R2 Reference [ja]
    'https://docs.oracle.com/cd/E16338_01/server.112/b56311/toc.htm',
    // 11g R1 Reference [ja]
    'http://otndnld.oracle.co.jp/document/products/oracle11g/111/doc_dvd/server.111/E05771-04/toc.htm',
    // 10g R2 Reference [ja]
    'http://otndnld.oracle.co.jp/document/products/oracle10g/102/doc_cd/server.102/B19228-04/toc.htm',
    '' // dummy
];

function title(url, callback) {
    if (url.length === 0) callback.apply();

    var page = require('webpage').create();
    page.open(url, function(status) {
        console.log('[' + url + ']');
        if (status !== 'success') {
            console.log('failed to load the url: ' + url);
        } else {
            var title = page.title, title_modified;
            console.log(title);
            if (page.injectJs(scriptSrc)) {
                title_modified = page.title
                console.log(title_modified);
            };
            console.log("\n");
        }
        page.close();
        callback.apply();
    });
}

function process() {
    if (urls.length > 0) {
        var url = urls[0];
        urls.splice(0, 1);
        title(url, process);
    } else {
        // suppress the notice by asyncronizing exit. :(
        setTimeout(function() {
            phantom.exit();
        }, 0);
    }
}

process();
