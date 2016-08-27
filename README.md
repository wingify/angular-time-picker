# <img src="images/time-picker.png" alt="Time Picker" width="50" height="50"/> wyTimePicker

A basic and lightweight angular time picker directive

[![Bower Version](http://img.shields.io/bower/v/angular-time-picker.svg?style=flat)](https://github.com/wingify/angular-time-picker/releases) [![Build Status](http://img.shields.io/travis/wingify/angular-time-picker/master.svg?style=flat)](http://travis-ci.org/wingify/angular-time-picker)
#### Requirements

Angular v1.2+

## Features

* With no external dependency, angular-time-picker is lighter and faster.
* It can be used for selecting a particular time or a time range.
* Many different configurable options like:
	* Setting the initial display time as per the requirements
	* Two minimalistic different themes viz light and dark
	* Precisely configure / update the time range as per the needs
	* Robust validation exclusively for time range picker
	* Provide custom callbacks for apply / cancel operations

## Demo

[LIVE DEMO on Plunkr](https://plnkr.co/edit/P38jXpcLPnAzWVcpN5Sv?p=preview)

[Read More](http://engineering.wingify.com/angular-time-picker/introduction.html)

## Installation

* Via [bower](https://bower.io/search/?q=angular-time-picker) - **`bower install angular-time-picker --save`**
* Via [npm](https://www.npmjs.com/package/angular-time-picker) - **`npm install angular-time-picker --save-dev`**

## Usage

* Install Angular Time Picker with Bower

>
```bash
bower install angular-time-picker --save
```

* Include the required libraries in your index.html:

>
```html
<!-- css file in head tag-->
<link rel="stylesheet" type="text/css" href="bower_components/angular-time-picker/dist/angular-time-picker.min.css">
<!-- js files, either inside <head>...</head> or just before the </body> -->
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-time-picker/dist/angular-time-picker.min.js"></script>
<!-- your app.js goes here -->
```

* Inject the wingify.timePicker module into your app:

>
```js
angular.module('myApp', ['wingify.timePicker']);
```

## Options

There are a number of options that can be configured with inline attributes. All are optional.

| Option               | Default    | Possible Values | Description                                                                             |
|----------------------|------------|-----------------|-----------------------------------------------------------------------------------------|
| data-dropdown        | false      | `false`, `true` | Time picker dropdown initial state.                                                     |
| data-time-settings   | {}         | `      -       `| Initial time settings eg. {fromHour: '01',fromMinute: '00',toHour: '20',toMinute: '50'} |
| data-theme           | light      | `light`, `dark` | Theme for the time picker button and the dropdown                                       |
| data-no-range        | null       | `false`, `true` | Pick a particular time or a time range                                                      |
| data-format          | 24         | `12`, `24`      | Time Format(hours)                                                                      |
| data-no-validation   | null       | `false`, `true` | Validation checks for time range picker(useful for preventing misleading data)          |
| data-apply-callback  | null       | `function`      | Callback to be invoked when APPLY button is being pressed to update time                |
| data-clear-callback  | null       | `function`      | Callback to be invoked when CANCEL button is being pressed to cancel current operation  |

**Example:**

```js
// Set initial time range to be 05:30 - 10:10
$scope.settings = {
	dropdownToggleState: false,
	time: {
		fromHour: '05',
		fromMinute: '30',
		toHour: '10',
		toMinute: '10'
	},
	theme: 'dark',
	noRange: false,
	format: 24,
	noValidation: false
};
$scope.onApplyTimePicker = function () {
	console.log('Time range applied.');
};
$scope.onClearTimePicker = function () {
	console.log('Time range current operation cancelled.');
};
```

```html
<wy-time-picker
	data-dropdown-toggle-state="settings.dropdownToggleState"
	data-time-settings="settings.time"
	data-theme="settings.theme"
	data-no-range="settings.noRange"
	data-format="settings.format"
	data-no-validation="settings.noValidation"
	data-apply-callback="onApplyTimePicker()"
	data-clear-callback="onClearTimePicker()">
</wy-time-picker>
```

## Browser Support

Tested in Chrome and Firefox.

## Running Tests

To execute all unit tests, use:

```bash
`grunt unit`
```

## Contributing

Contributions are welcome. Whenever possible, please include test coverage with your contribution.

1. Fork it
2. Create your feature branch (``git checkout -b my-new-feature``)
3. Commit your changes (``git commit -am 'Add some feature'``)
4. Push to the branch (``git push origin my-new-feature``)
5. Create new Pull Request

To get the project running, you'll need [NPM](https://www.npmjs.com/) and [Bower](http://bower.io/).

* Run `npm install` and `bower install` to install all dependencies.
* Then run `grunt local` in the project directory to watch and compile changes.
* And you can run `grunt unit` to watch for changes and auto-execute unit tests.

## Authors

* **[Varun Malhotra](https://github.com/softvar)**

## Contributors

* **[@pra85](https://github.com/pra85)** - PRs - [#1](https://github.com/wingify/angular-time-picker/pull/1), [#2](https://github.com/wingify/angular-time-picker/pull/2), [#3](https://github.com/wingify/angular-time-picker/pull/3), [#5](https://github.com/wingify/angular-time-picker/pull/5), [#6](https://github.com/wingify/angular-time-picker/pull/6), [#7](https://github.com/wingify/angular-time-picker/pull/7)

## Copyright and license

>The MIT License (MIT)
>
>Copyright (c) 2015-2016 Wingify Software Pvt. Ltd.
>
>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
