// ==UserScript==
// @id             oracle_manual_title
// @name           oracle_manual_title
// @version        1.0
// @namespace      oracle_manual_title
// @author         yoshikaw@gmail.com
// @description    Oracle DocumentのTitleに製品バージョンをつけて見易くする
// @include        http://docs.oracle.com/cd/*.htm*
// @include        http://otndnld.oracle.co.jp/document/products/*/*.htm*
// @run-at         document-end
// ==/UserScript==

(function() {
  setTitle(getTitle());

  function setTitle(title) {
    top.document.title += ' - ' + title;
  }
  function getTitle() {
    var title = document.querySelectorAll("table>tbody>tr>td")[0].textContent.trim();
    title = title.replace(/^(Oracle.+Database)(.*)$/, "$2 [$1]");
    title = title.replace(/^(.*?)([A-Z]\d{1,5}\-\d{1,2})(.*)$/, "$1$3 $2"); // remove document id
    return title;
  }
}());
