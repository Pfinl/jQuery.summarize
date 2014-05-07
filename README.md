jQuery.summarize
================
jQuery plugin to summarize html content without breaking html.

Optional arguments:

<bold>maxLength</bold>: max character count to display in the summarized content. The content will stop at a space, so it may be a little more or less than the length specified. <i>default is 250</i>

<bold>endString</bold>: the string that gets added to the end of summarized content to denote more content exists. <i>default is "..."</i>

<bold>moreText</bold>: the text of the link to show more. <i>default is "show more"</i>

<bold>showMoreCallback</bold>: callback when show more is triggered. <i>default is $noop</i>

<bold>lessText</bold>: the text of the link to show less.  <i>default is "show less"<i>

<bold>showLessCallback</bold>: callback when the show less is triggered. <i>default is $noop</i>

example:
$('.pfSummary').pfsummarize({ maxLength: 300, moreText: "read more", lessTest: "read less", showMoreCallback: function() {
    //do something when we show more
  }
})


$('.pfSummary').pfsummarize("destroy"); will revert the content back to it's original state.

