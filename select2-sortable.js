/**
 * Select2 Sortable
 * 
 * Description: Allows you to have a sortable option with Drag & Drop in multiple select2 field
 * Version : 1.0.0
 * Author : Vijay Hardaha
 * Inspired by : select2-Sortable (https://github.com/vijayhardaha/select2-Sortable)
 * License : MIT
 * Select2 Website: https://select2.org/
 * Select2 Github: https://github.com/select2/select2
 */

!(function ($) {
	$.fn.extend({
		select2Sortable: function () {
			//get arguments 
			var args = Array.prototype.slice.call(arguments, 0);

			//filter mutiple attribite
			$this = this.filter('[multiple]'),
				validMethods = ['destroy'];

			//check if this multiple select or not.
			if ($this.length == 0) {

				//if not then initialize select2 with args
				this.select2(args);

			} else {
				//if args is empty or type is object then go inside
				if (args.length === 0 || typeof (args[0]) === 'object') {

					//define defaults args for sortable usages
					var defaults = {
						//sort the initialized select2 options by A-Z
						sorter: data => data.sort((a, b) => a.text.localeCompare(b.text)),
						// Disabled createTag
						createTag: function (params) {
							return undefined;
						}
					};

					//extend passed args with default args
					var options = $.extend(defaults, args);

					// Init select2 only if not already initialized to prevent select2 configuration loss
					if (typeof ($this.data('select2')) !== 'object') {
						$this.select2(options);
					}

					// run loop for each instance of selector
					$this.each(function () {
						var $select = $(this),
							$select2choices = $select.siblings('.select2-container').first("ul.select2-selection__rendered");

						// Init jQuery UI Sortable
						$select2choices.sortable({
							placeholder: "ui-state-highlight",
							forcePlaceholderSize: true,
							items: "li:not(.select2-search__field)",
							tolerance: "pointer"
						});

						// apply options ordering in sortstop event
						$select2choices.on("sortstop.select2sortable", function (event, ui) {
							$($select2choices.find(".select2-selection__choice").get().reverse()).each(function () {
								var title = $(this).attr("title");
								var option = $select.find("option:contains(" + title + ")");
								$select.prepend(option);
							});
						});
					});

				} else if (typeof (args[0] === 'string')) {
					if ($.inArray(args[0], validMethods) == -1) {
						throw "Unknown method: " + args[0];
					}
					if (args[0] === 'destroy') {
						$this.select2SortableDestroy();
					}
				}
			}
		},
		select2SortableDestroy: function () {
			var $this = this.filter('[multiple]');
			$this.each(function () {
				var $select = $(this),
					$select2choices = $select.siblings('.select2-container').first("ul.select2-selection__rendered");

				// unbind sortstop event
				$select2choices.unbind("sortstop.select2sortable");

				// destroy select2Sortable
				$select2choices.sortable('destroy');
			});
			return $this;
		},
		select2SetOrderOnInit: function () {
			var $select = $(this);

			//get values as string using attribute
			var $initials = $select.attr('data-initials');

			//create sorted/seleted options empty arrya
			var $sorted = [];

			//check values are empty or not
			if (typeof $initials !== undefined) {
				//convert string to array
				var $selects = $initials.split(',');
				//check array length
				if ($selects.length) {
					//remove white space
					$selects = selects.map(i => i.trim());

					//run loop for values
					$.each($selects, function (key, value) {
						//find the option with value
						var $option = $(select).find('option[value="' + value + '"]');
						//push into sorted array
						$sorted.push($option);
						//remove current option tag
						$option.remove();
					})
				}
			}

			//check if sorted has value or not
			if ($sorted.length) {
				//if yes then prepend all the option values
				$select.prepend($sorted);
			}
		}
	})
})(jQuery);