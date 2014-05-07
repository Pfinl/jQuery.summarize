jQuery.summarize
================
jQuery plugin to summarize html content without breaking html.

Optional arguments:
maxLength: max character count to display in the summarized content. The content will stop at a space, so it may be a little more or less than the length specified. default is 250.

endString: the string that gets added to the end of summarized content to denote more content exists.  default is "...".

moreText: the text of the link to show more.  default is "show more".

showMoreCallback: callback when show more is triggered. default is $noop.

lessText: the text of the link to show less.  default is "show less".

showLessCallback: callback when the show less is triggered. default is $noop.

example:
$('.pfSummary').pfsummarize({ maxLength: 300, moreText: "read more", lessTest: "read less", showMoreCallback: function() {
    //do something when we show more
  }
})


$('.pfSummary').pfsummarize("destroy"); will revert the content back to it's original state.

