# Select2 Sortable

select2-Sortable is an extension to convert select2 multiple select to Sortable using Drag &amp; drop (https://select2.org)

## Requirements

Make sure you use [jQuery UI](https://code.jquery.com/ui/1.12.1/jquery-ui.js) in your project/website to use this extension.

if you're using Wordpress then you can use this default wordpress option on your website before enqueuing select2-sortable.js file.

```shell
wp_enqueue_script( 'jquery-ui' );
```

* [Select2](https://select2.org) >= 4.0

## Usage

You just need to call a simple function/method "select2Sortable()" instead of calling "select2()" method.

```shell
!(function ($) {
	var $select = $(document).find('.select2-wrap').select2Sortable();
})(jQuery);
```

You also need to use a data attribute in your &lt;select&gt; tag, which is data-initials="". In this attribute you'll pass the field value into string form using (,) Comma. if you're getting array then convert it to string with (,) then pass it like this:

```shell
<select name="countries" class="select2-wrap" multiple data-initials="UK,IN">
	<option value="US" selected>United State</option>
	<option value="IN" selected>India</option>
	<option value="UK" selected>United Kindom</option>
</select>
```

We're using "data-initials" to know the order of last saved values and when the select2 will initialize and values will be selected we'll sort them again on init.

## Contributing

Contributions are welcome from everyone. We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.


## References Taken From

* [Github Issue Page](https://github.com/select2/select2/issues/1190)
* [select2Sortable](https://github.com/vafour/select2-sortable)