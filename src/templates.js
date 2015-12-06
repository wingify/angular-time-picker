angular.module('templates-main', ['angular-time-picker.tpl.html']);

angular.module("angular-time-picker.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("angular-time-picker.tpl.html",
    "<div class=\"angular-time-picker-rapper\">\n" +
    "	<span class=\"angular-time-picker-button\"\n" +
    "		ng-class=\"theme\"\n" +
    "		title=\"Time Range Filter\"\n" +
    "		ng-click=\"dropdownToggleState = !dropdownToggleState;\">\n" +
    "			<span ng-show=\"!noRange\">{{ timeSettings.fromHour + ':' + timeSettings.fromMinute + ' - ' + timeSettings.toHour + ':' + timeSettings.toMinute }}</span>\n" +
    "			<span ng-show=\"noRange\">{{ timeSettings.fromHour + ':' + timeSettings.fromMinute }}</span>\n" +
    "		<i class=\"angular-time-picker-caret\" ng-class=\"theme\"></i>\n" +
    "	</span>\n" +
    "	<div ng-show=\"dropdownToggleState\" class=\"angular-time-picker-dropdown__menu  angular-time-picker-theme\" ng-class=\"theme\">\n" +
    "		<div>\n" +
    "			Start:\n" +
    "			<span class=\"angular-time-picker-float--right\">\n" +
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
    "		<div class=\"angular-time-picker-push--top\" ng-show=\"!noRange\">\n" +
    "			End:\n" +
    "			<span class=\"angular-time-picker-float--right\">\n" +
    "				<select ng-model=\"endingHour\" class=\"browser-default\">\n" +
    "					<option ng-repeat=\"option in endingTimeHoursRange\" ng-disabled=\"option.disabled\" value=\"{{option.value}}\">{{option.name}}</option>\n" +
    "				</select>\n" +
    "				:\n" +
    "				<select ng-model=\"endingMinute\" class=\"browser-default\">\n" +
    "					<option ng-repeat=\"option in endingTimeHMinutesRange\" ng-disabled=\"option.disabled\" value=\"{{option.value}}\">{{option.name}}</option>\n" +
    "				</select>\n" +
    "			</span>\n" +
    "		</div>\n" +
    "		<div class=\"angular-time-picker-push--top\">\n" +
    "			<button ng-click=\"resetToOriginalTimeSettings()\">Reset</button>\n" +
    "			<button class=\"angular-time-picker-push-half--left  angular-time-picker-float--right  angular-time-picker-apply-btn\" ng-click=\"applyTimeRangeFilter()\">Apply</button>\n" +
    "			<button class=\"angular-time-picker-push-half--left  angular-time-picker-float--right  angular-time-picker-cancel-btn\" ng-click=\"closeTimeFilterDropdown()\">Cancel</button>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
