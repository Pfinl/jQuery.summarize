/*!
* jQuery Summarize Plugin v1.0
* Summarizes text nodes without breaking html
* https://github.com/Pfinl/jQuery.summarize
*
* Copyright 2014 Sherstin Lauman
* Released under the MIT license
*/
"use strict";
; (function($, window, document, undefined) {
    var methods = {
        init: function(options) {
            options = $.extend({
                maxLength: 250,
                endString: "...",
                moreText: "show more",
                lessText: "show less",
                showMoreCallback: $.noop,
                showLessCallback: $.noop
            }, options || {});

            var splitNodes = function(root) {
                var length = 0,
                result = [],
                max = options.maxLength,
                endString = options.endString,
                splitChildNodes = function(nodes) {
                    var i = 0, clone;
                    if (length >= max) {
                        return;
                    }
                    for (; i < nodes.length; i++) {
                        if (length >= max) {
                            return;
                        }
                        var node = nodes[i];
                        if (node.nodeType === 1) { //element node
                            clone = node.cloneNode(false);
                            result[result.length - 1].appendChild(clone);
                            result.push(clone);
                            splitChildNodes(node.childNodes);
                            result.pop();
                        } else if (node.nodeType === 3) { //text node
                            if (length + node.length < max) {
                                result[result.length - 1].appendChild(node.cloneNode(false));
                                length += node.length;
                            } else { // we're over the max, so summarize it 
                                var text = $(node).text();
                                var lastIndex = Math.min(max - length, text.substring(0, max - length).lastIndexOf(' '));
                                text = text.substring(0, lastIndex) + endString;
                                result[result.length - 1].appendChild(document.createTextNode(text));
                                length += node.length;
                                return;
                            }
                        }
                    }
                };
                result.push(root.cloneNode(false));
                splitChildNodes(root.childNodes);
                return $(result.pop().childNodes);
            };

            function showMore($this, $clone) {
                $this.show();
                $clone.hide();
                options.showMoreCallback($this);
            }

            function showLess($this, $clone) {
                $this.hide();
                $clone.show();
                options.showLessCallback($this);
            }

            return this.each(function() {
                var $this = $(this);

                //if it's been summarized once, don't do it again.
                if ($this.closest('.pf-summarize-wrapper').length) {
                    $this.trigger('pf.showSummary');
                    return;
                }


                var $wrapper = $('<div class="pf-summarize-wrapper" style="display:inline;"/>');
                $this.wrap($wrapper);

                var nodes = splitNodes(this); //split the nodes and get back the summarized version
                var $clone = $this.clone(); //clone it
                $this.hide(); //keep original, but hide it
                $clone.empty()
                    .append(nodes)
                    .addClass('pf-summarize')
                    .append($("<a href='javascript:;' class='pf-show-more'>" + options.moreText + "</a>").on('click.pfsummarize', function(event) {
                        showMore($this, $clone);
                    }))
                    .insertAfter($this);

                $this.append($("<a href='javascript:;' class='pf-show-less'>" + options.lessText + "</a>").on('click.pfsummarize', function(event) {
                     showLess($this, $clone);
                }));

                //bindings to control show more and less
                $this.bind('pf.showSummary', function() {
                    showMore($this, $clone);
                });

                $this.bind('pf.hideSummary', function() {
                    showLess($this, $clone);
                });

            });
        },

        destroy: function() {
            return this.each(function() {
                var $this = $(this);
                var $wrapper = $this.closest('.pf-summarize-wrapper');
                if ($wrapper.length) {
                    $this.insertBefore($wrapper).show()
                        .find('.pf-show-less').remove();
                    $wrapper.remove();
                }
            });
        }
    }

    $.fn.pfsummarize = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            Sys.Debug.trace('Method ' + method + ' does not exist on pfsummarize');
        }

    };

})(jQuery, window, document);
