/**
 * Select2 Sortable
 *
 * Description: Allows you to have a sortable option with Drag & Drop in multiple select2 field
 * Version : 1.0.1
 * Author : Vijay Hardaha
 * Inspired by : select2-Sortable (https://github.com/vijayhardaha/select2-Sortable)
 * License : MIT
 * Select2 Website: https://select2.org/
 * Select2 Github: https://github.com/select2/select2
 */

!(function ($) {
  $.fn.extend({
    select2Sortable: function () {
      // Get arguments.
      var args = Array.prototype.slice.call(arguments, 0);

      // Filter mutiple attribite.
      var select = this.filter("[multiple]"),
        validMethods = ["destroy"];

      // Check if this multiple select or not.
      if (select.length == 0) {
        // If not then initialize select2 with args.
        this.select2(args[0]);
      } else {
        // If args is empty or type is object then go inside.
        if (args.length === 0 || typeof args[0] === "object") {
          // Define defaults args for sortable usages.
          var defaults = {
            // Sort the initialized select2 options by A-Z.
            sorter: (data) =>
              data.sort(function (a, b) {
                return a.text.localeCompare(b.text);
              }),
            // Disabled createTag.
            createTag: function (params) {
              return undefined;
            },
          };

          // Extend passed args with default args.
          var options = $.extend([], defaults, args[0]);

          // Init select2 only if not already initialized to prevent select2 configuration loss.
          if (typeof select.data("select2") !== "object") {
            select.select2(options);
          }

          // Run loop for each instance of selector.
          select.each(function () {
            var _select = $(this),
              choices = _select
                .siblings(".select2-container")
                .first("ul.select2-selection__rendered");

            select.select2SetOrderOnInit(_select);

            //  Init jQuery UI Sortable.
            choices.sortable({
              placeholder: "ui-state-highlight",
              forcePlaceholderSize: true,
              items: "li:not(.select2-search__field)",
              tolerance: "pointer",
            });

            //  Apply options ordering in sortstop event.
            choices.on("sortstop.select2sortable", function (event, ui) {
              $(
                choices.find(".select2-selection__choice").get().reverse()
              ).each(function () {
                var title = $(this).attr("title");
                var option = _select.find("option:contains(" + title + ")");
                _select.prepend(option);
              });
            });
          });
        } else if (typeof (args[0] === "string")) {
          if ($.inArray(args[0], validMethods) == -1) {
            throw "Unknown method: " + args[0];
          }
          if (args[0] === "destroy") {
            select.select2SortableDestroy();
          }
        }
      }
    },
    select2SortableDestroy: function () {
      var select = this.filter("[multiple]");
      select.each(function () {
        var choices = $(this)
          .siblings(".select2-container")
          .first("ul.select2-selection__rendered");

        // Unbind sortstop event.
        choices.unbind("sortstop.select2sortable");

        // Destroy select2Sortable.
        choices.sortable("destroy");
      });
      return select;
    },
    select2SetOrderOnInit: function (select) {
      // Get values as string using attribute.
      var initials = select.attr("data-initials");

      // Create sorted/seleted options empty array.
      var sorted = [];

      // Check values are empty or not.
      if (typeof initials !== "undefined") {
        // Convert string to array.
        var selectedOptions = initials.split(",");

        // Check array length.
        if (selectedOptions.length) {
          // Remove white space.
          selectedOptions = selectedOptions.map(function (i) {
            return i.trim();
          });

          // Run loop for values.
          $.each(selectedOptions, function (key, value) {
            // Find the option with value.
            var option = select.find('option[value="' + value + '"]');

            // Push into sorted array.
            sorted.push(option);

            // Remove current option tag.
            option.remove();
          });
        }
      }

      // Check if sorted has value or not.
      if (sorted.length) {
        // If yes then prepend all the option values.
        select.prepend(sorted);
      }
    },
  });
})(jQuery);
