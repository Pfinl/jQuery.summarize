jQuery.summarize
================
jQuery plugin to summarize html content without breaking html.

Optional arguments:

<b>maxLength</b>: max character count to display in the summarized content. The content will stop at a space, so it may be a little more or less than the length specified. <i>default is 250</i>

<b>endString</b>: the string that gets added to the end of summarized content to denote more content exists. <i>default is "..."</i>

<b>moreText</b>: the text of the link to show more. <i>default is "show more"</i>

<b>showMoreCallback</b>: callback when show more is triggered. <i>default is $noop</i>

<b>lessText</b>: the text of the link to show less.  <i>default is "show less"<i>

<b>showLessCallback</b>: callback when the show less is triggered. <i>default is $noop</i>

example:
$('.pfSummary').pfsummarize({ maxLength: 300, moreText: "read more", lessTest: "read less", showMoreCallback: function(original, clone) {
    //do something
  }
})


$('.pfSummary').pfsummarize("destroy"); will revert the content back to it's original state.


See a working example here: http://jsfiddle.net/YMuNV/3/
