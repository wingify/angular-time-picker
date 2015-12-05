angular.module('templates-main', ['angular-time-picker.tpl.html']);

angular.module("angular-time-picker.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("angular-time-picker.tpl.html",
    "<div class=\"time-picker__wrapper\">\n" +
    "	<span class=\"time-picker-box  time-range-btn\"\n" +
    "		ng-class=\"theme\"\n" +
    "		title=\"Time Range Filter\"\n" +
    "		ng-click=\"dropdownToggleState = !dropdownToggleState;\">\n" +
    "			<span ng-show=\"!noRange\">{{ timeSettings.fromHour + ':' + timeSettings.fromMinute + ' - ' + timeSettings.toHour + ':' + timeSettings.toMinute }}</span>\n" +
    "			<span ng-show=\"noRange\">{{ timeSettings.fromHour + ':' + timeSettings.fromMinute }}</span>\n" +
    "		<i class=\"caret\" ng-class=\"theme\"></i>\n" +
    "	</span>\n" +
    "	<div ng-show=\"dropdownToggleState\" class=\"dropdown__menu  theme\" ng-class=\"theme\">\n" +
    "		<div>\n" +
    "			Start:\n" +
    "			<span class=\"float--right\">\n" +
    "				<!-- `browser-default` class is being used as materializecss framework override default select css-->\n" +
    "				<!-- Thus to prevent this, adding a class. Materializecss is a famous framework for Material Design. -->\n" +
    "				<select ng-model=\"startingHour\" class=\"browser-default\">\n" +
    "					<option ng-repeat=\"option in startingTimeHoursRange\" ng-disabled=\"option.disabled\" value=\"{{option.value}}\">{{option.name}}</option>\n" +
    "				</select>\n" +
    "				:\n" +
    "				<select ng-model=\"startingMinute\" class=\"browser-default\">\n" +
    "					<option ng-repeat=\"option in startingTimeHMinutesRange\" ng-disabled=\"option.disabled\" value=\"{{option.value}}\">{{option.name}}</option>\n" +
    "				</select>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "		<div class=\"push--top\" ng-show=\"!noRange\">\n" +
    "			End:\n" +
    "			<span class=\"float--right\">\n" +
    "				<select ng-model=\"endingHour\" class=\"browser-default\">\n" +
    "					<option ng-repeat=\"option in endingTimeHoursRange\" ng-disabled=\"option.disabled\" value=\"{{option.value}}\">{{option.name}}</option>\n" +
    "				</select>\n" +
    "				:\n" +
    "				<select ng-model=\"endingMinute\" class=\"browser-default\">\n" +
    "					<option ng-repeat=\"option in endingTimeHMinutesRange\" ng-disabled=\"option.disabled\" value=\"{{option.value}}\">{{option.name}}</option>\n" +
    "				</select>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "		<div class=\"push--top\">\n" +
    "			<button ng-click=\"resetToOriginalTimeSettings()\">Reset</button>\n" +
    "			<button class=\"push-half--left  float--right  apply-btn\" ng-click=\"applyTimeRangeFilter()\">Apply</button>\n" +
    "			<button class=\"push-half--left  float--right  cancel-btn\" ng-click=\"closeTimeFilterDropdown()\">Cancel</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
