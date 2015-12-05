'use strict';

describe('Timepicker directive :: ', function() {
	var scope, compile, $rootScope, timePickerElement, compile;

	beforeEach(module('ngTimePicker'));
	beforeEach(module('angular-time-picker.tpl'));

	describe('UI function test', function() {
		var recompile = function () {
			var template = '' +
				'<ng-time-picker ' +
        			'data-dropdown-toggle-state="settings.dropdownToggleState" ' +
        			'data-time-settings="settings.time" ' +
        			'data-theme="settings.theme" ' +
        			'data-no-range="settings.noRange"' +
        			'data-format="settings.format"' +
        			'data-apply-callback="settings.onApplyTimePicker(data)" ' +
        			'data-clear-callback="settings.onResetTimePicker(data)" ' +
        			'style="margin-top:120px;" ' +
				'>' +
     			'</ng-time-picker>';

     		timePickerElement = compile(template)(scope);
			scope.$digest();
			return timePickerElement;
		};

		beforeEach(inject(function(_$compile_, _$rootScope_) {
			// Set compile
			compile = _$compile_;
			$rootScope = _$rootScope_;

			// Set default scope values
			scope = $rootScope.$new();
			scope.elementFirstChildClassName = 'time-picker-box';
			scope.elementSecondChildClassname = 'dropdown__menu';

			scope.settings = {
				dropdownToggleState: false,
				time: {
					fromHour: '02',
					toHour: '10',
					fromMinute: '04',
					toMinute: '20'
				}
			};

			scope.settings.onApplyTimePicker = function () {
				console.log('time range applied');
			};
			scope.settings.onResetTimePicker = function () {
				console.log('time range reset');
			};

			recompile();
	    }));

		it('should have two children elements', function() {
			expect(timePickerElement.children().length).toBe(2);
		});

		it('should have proper classes applied', function () {
			var children = timePickerElement.children(0);
			expect(children.eq(0).hasClass(scope.elementFirstChildClassName)).toEqual(true);
			expect(children.eq(1).hasClass(scope.elementSecondChildClassname)).toEqual(true);
		});

		describe('single time picker ::', function () {
			it('verify scope variables - using config 1', function () {
				scope.settings = {
					dropdownToggleState: true,
					time: {},
					noRange: true,
					format: 12
				};

				recompile();
				var directiveScope = timePickerElement.isolateScope();

				expect(timePickerElement.children().length).toBe(2);
				expect(directiveScope.timeHourFormat).toBe(12);
				expect(directiveScope.startingTimeHoursRange.length).toBe(12);
				expect(directiveScope.noRange).toBe(true);
				expect(directiveScope.dropdownToggleState).toBe(true);
				expect(directiveScope.theme).toEqual('light');
			});

			it('verify scope variables - using config 2', function () {
				scope.settings = {
					dropdownToggleState: false,
					time: {},
					noRange: true,
					format: 24,
					theme: 'dark'
				};

				recompile();
				var directiveScope = timePickerElement.isolateScope();

				expect(timePickerElement.children().length).toBe(2);
				expect(directiveScope.timeHourFormat).toBe(24);
				expect(directiveScope.startingTimeHoursRange.length).toBe(24);
				expect(directiveScope.noRange).toBe(true);
				expect(directiveScope.dropdownToggleState).toBe(false);
				expect(directiveScope.theme).toEqual('dark');
			});

			it('verify initial display time', inject(function ($timeout) {
				var directiveScope = timePickerElement.isolateScope();
				spyOn(directiveScope, 'setInitialTimeRange').and.callFake(function() {
					return true;
				});
				recompile();

				$timeout.flush();
				expect(directiveScope.setInitialTimeRange).toHaveBeenCalled();
			}));

			it('change hours and minutes', inject(function ($timeout) {
				var directiveScope = timePickerElement.isolateScope();
				spyOn(directiveScope, 'updateHour');
				spyOn(directiveScope, 'updateEndingMinuteTime');
				recompile();

				$timeout.flush();

				// change starting hour
				directiveScope.startingHour = '05';
				expect(directiveScope.updateHour).toHaveBeenCalled();
			}));
		});

		describe('time range picker :: ', function () {
			it('should verify variables on scope', function () {
				scope.settings = {
					dropdownToggleState: true,
					time: {}
				};

				recompile();
				var directiveScope = timePickerElement.isolateScope();

				expect(timePickerElement.children().length).toBe(2);
				expect(directiveScope.timeHourFormat).toBe(24);
				expect(directiveScope.startingTimeHoursRange.length).toBe(24);
				expect(directiveScope.noRange).not.toBeDefined();
				expect(directiveScope.dropdownToggleState).toBe(true);
				expect(directiveScope.theme).toEqual('light');
			});

			it('change starting time - hours and minutes - should correct trigger watchers and methods', inject(function ($timeout) {
				var directiveScope = timePickerElement.isolateScope();
				spyOn(directiveScope, 'updateHour');
				spyOn(directiveScope, 'updateEndingMinuteTime');
				spyOn(directiveScope, 'applyTimeRangeFilter').and.callFake(function() {
					return true;
				});

				$timeout.flush();

				// change starting hour
				directiveScope.startingHour = '05';
				directiveScope.$apply();
				expect(directiveScope.updateHour).toHaveBeenCalled();

				// change starting minute
				directiveScope.startingMinute = '30';
				directiveScope.$apply();
				expect(directiveScope.updateEndingMinuteTime).not.toHaveBeenCalled();

				timePickerElement.find('button')[1].click();
				expect(directiveScope.applyTimeRangeFilter).toHaveBeenCalled();
			}));

			it('change ending time - hours and minutes - should correct trigger watchers and methods', inject(function ($timeout) {
				var directiveScope = timePickerElement.isolateScope();
				spyOn(directiveScope, 'updateHour');
				spyOn(directiveScope, 'updateStartingMinuteTime');
				spyOn(directiveScope, 'applyTimeRangeFilter').and.callFake(function() {
					return true;
				});

				$timeout.flush();

				// change ending hour
				directiveScope.endingHour = '20';
				directiveScope.$apply();
				expect(directiveScope.updateHour).toHaveBeenCalled();

				// change ending minute
				directiveScope.endingMinute = '30';
				directiveScope.$apply();
				expect(directiveScope.updateStartingMinuteTime).not.toHaveBeenCalled();

				timePickerElement.find('button')[1].click();
				expect(directiveScope.applyTimeRangeFilter).toHaveBeenCalled();
			}));

			it('change starting and ending time - should trigger correct watchers and methods', inject(function ($timeout) {
				var directiveScope = timePickerElement.isolateScope();
				spyOn(directiveScope, 'updateHour');
				spyOn(directiveScope, 'updateStartingMinuteTime');
				spyOn(directiveScope, 'updateEndingMinuteTime');
				spyOn(directiveScope, 'applyTimeRangeFilter').and.callFake(function() {
					return true;
				});

				$timeout.flush();

				// change starting hour
				directiveScope.startingHour = '05';
				directiveScope.$apply();
				expect(directiveScope.updateHour).toHaveBeenCalled();

				// change starting minute
				directiveScope.startingMinute = '30';
				directiveScope.$apply();
				expect(directiveScope.updateEndingMinuteTime).not.toHaveBeenCalled();

				// change ending hour
				directiveScope.endingHour = '20';
				directiveScope.$apply();
				expect(directiveScope.updateHour).toHaveBeenCalled();

				// change ending minute
				directiveScope.endingMinute = '30';
				directiveScope.$apply();
				expect(directiveScope.updateStartingMinuteTime).not.toHaveBeenCalled();

				timePickerElement.find('button')[1].click();
				expect(directiveScope.applyTimeRangeFilter).toHaveBeenCalled();
			}));

			it('make starting and ending hours equal - should trigger correct watchers and methods', inject(function ($timeout) {
				var directiveScope = timePickerElement.isolateScope();
				spyOn(directiveScope, 'updateHour');
				spyOn(directiveScope, 'updateEndingMinuteTime');
				spyOn(directiveScope, 'updateStartingMinuteTime');
				spyOn(directiveScope, 'applyTimeRangeFilter').and.callThrough();
				spyOn(directiveScope, 'closeTimeFilterDropdown');

				directiveScope.$digest();
				$timeout.flush();

				// change starting hour
				directiveScope.startingHour = '20';
				directiveScope.$apply();
				expect(directiveScope.updateHour).toHaveBeenCalled();

				// change starting minute
				directiveScope.startingMinute = '30';
				directiveScope.$apply();
				expect(directiveScope.updateEndingMinuteTime).not.toHaveBeenCalled();

				// change ending hour
				directiveScope.endingHour = '20';
				directiveScope.$apply();
				expect(directiveScope.updateHour).toHaveBeenCalled();

				// change ending minute
				directiveScope.endingMinute = '50';
				directiveScope.$apply();
				expect(directiveScope.updateStartingMinuteTime).toHaveBeenCalled();

				timePickerElement.find('button')[1].click();
				expect(directiveScope.applyTimeRangeFilter).toHaveBeenCalled();
				expect(directiveScope.closeTimeFilterDropdown).toHaveBeenCalled();
			}));

			it('should reset the starting time range on clicking RESET btn after changing starting time', inject(function ($timeout) {
				scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '00',
						toHour: '23',
						fromMinute: '00',
						toMinute: '59'
					}
				};
				recompile();
				var directiveScope = timePickerElement.isolateScope();

				spyOn(directiveScope, 'resetToOriginalTimeSettings').and.callThrough();
				spyOn(directiveScope, 'applyTimeRangeFilter').and.callThrough();
				spyOn(directiveScope, 'applyCallback').and.callThrough();

				$timeout.flush();

				expect(directiveScope.dropdownToggleState).toBe(false);

				// change starting minute
				directiveScope.startingHour = '05';
				// change starting minute
				directiveScope.startingMinute = '30';

				directiveScope.$apply();
				// apply it and th dropdown will close itself
				timePickerElement.find('button')[1].click();
				directiveScope.$apply();
				expect(directiveScope.applyCallback).toHaveBeenCalled();

				// click RESET btn
				timePickerElement.find('button')[0].click();
				directiveScope.$apply();

				expect(directiveScope.resetToOriginalTimeSettings).toHaveBeenCalled();
				expect(directiveScope.applyTimeRangeFilter).toHaveBeenCalled();
				expect(directiveScope.dropdownToggleState).toBe(false);

				// verify if the starting time has been resetted properly
				expect(directiveScope.startingHour).not.toEqual('05');
				expect(directiveScope.startingMinute).not.toEqual('30');

				expect(directiveScope.startingHour).toEqual(scope.settings.time.fromHour);
				expect(directiveScope.startingMinute).toEqual(scope.settings.time.fromMinute);
				expect(directiveScope.endingHour).toEqual(scope.settings.time.toHour);
				expect(directiveScope.endingMinute).toEqual(scope.settings.time.toMinute);
			}));

			it('should reset time to the initial time', inject(function ($timeout) {
				scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '05',
						fromMinute: '30',
						toHour: '10',
						toMinute: '10'
					}
				};
				recompile();
				var directiveScope = timePickerElement.isolateScope();

				$timeout.flush();

				// change starting minute
				directiveScope.startingHour = '02';
				// change starting minute
				directiveScope.startingMinute = '00';
				// change ending minute
				directiveScope.endingHour = '10';
				// change ending hour
				directiveScope.endingMinute = '10';
				directiveScope.$apply();

				// click RESET btn
				timePickerElement.find('button')[0].click();
				directiveScope.$apply();

				expect(directiveScope.startingHour).toEqual(scope.settings.time.fromHour); // '05'
				expect(directiveScope.startingMinute).toEqual(scope.settings.time.fromMinute); // '30'
				expect(directiveScope.endingHour).toEqual(scope.settings.time.toHour); // '10'
				expect(directiveScope.endingMinute).toEqual(scope.settings.time.toMinute); // '10'
			}));
		});

		// disable test cases
		describe('time range - validation tests :: ', function () {
			it('should disable respective options when starting hours and ending hours are changed', function () {
				scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '02',
						toHour: '23',
						fromMinute: '00',
						toMinute: '59'
					}
				};
				recompile();

				var directiveScope = timePickerElement.isolateScope();

				// change starting minute
				directiveScope.startingHour = '05';
				directiveScope.$apply();

				// Now ending hour can have values greater than 04
				for (var k = 0; k < 5; k++) {
					expect(directiveScope.endingTimeHoursRange[k].disabled).toBe(true);
				}
				for (var k = 5; k < 23; k++) {
					expect(directiveScope.endingTimeHoursRange[k].disabled).toBe(false);
				}


				// change ending hour
				directiveScope.endingHour = '10';
				directiveScope.$apply();

				// Now starting hour can have values lesse than 11
				for (var k = 0; k < 11; k++) {
					expect(directiveScope.startingTimeHoursRange[k].disabled).toBe(false);
				}
				for (var k = 11; k < 23; k++) {
					expect(directiveScope.startingTimeHoursRange[k].disabled).toBe(true);
				}
			});

			it('should disable respective options when starting minutes and ending minutes are changed', function () {
				scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '00',
						fromMinute: '00',
						toHour: '23',
						toMinute: '59'
					}
				};
				recompile();

				var directiveScope = timePickerElement.isolateScope();

				// change starting minute
				directiveScope.startingHour = '05';
				// change ending hour
				directiveScope.endingHour = '05';
				// change starting minute
				directiveScope.startingMinute = '10';
				// change ending minute
				directiveScope.endingMinute = '30';
				// Now ending hour can have values greater than 04
				directiveScope.$apply();


				for (var k = 0; k < 30; k++) {
					expect(directiveScope.startingTimeHMinutesRange[k].disabled).toBe(false);
				}
				for (var k = 30; k < 59; k++) {
					expect(directiveScope.startingTimeHMinutesRange[k].disabled).toBe(true);
				}

				// Now starting hour can have values lesse than 11
				for (var k = 0; k < 11; k++) {
					expect(directiveScope.endingTimeHMinutesRange[k].disabled).toBe(true);
				}
				for (var k = 11; k < 59; k++) {
					expect(directiveScope.endingTimeHMinutesRange[k].disabled).toBe(false);
				}
			});

			it('should decreament starting minute by 1 when both hours are same and starting minute equals ending minute', inject(function ($timeout) {
				scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '00',
						fromMinute: '59',
						toHour: '23',
						toMinute: '10'
					}
				};
				recompile();
				var directiveScope = timePickerElement.isolateScope();

				$timeout.flush();

				// change starting minute
				directiveScope.startingHour = '05';
				// change ending hour
				directiveScope.endingHour = '05';
				directiveScope.$apply();

				expect(directiveScope.startingMinute).toEqual('09');
				expect(directiveScope.endingMinute).toEqual('10');
			}));

			it('should set starting and ending minute correctly when boht hours are same and ending minute is `00` => it will set starting minute to `00` and ending minute to `01`', inject(function ($timeout) {
				scope.settings = {
					dropdownToggleState: false,
					time: {
						fromHour: '00',
						fromMinute: '59',
						toHour: '23',
						toMinute: '00'
					}
				};
				recompile();
				var directiveScope = timePickerElement.isolateScope();

				$timeout.flush();

				// change starting minute
				directiveScope.startingHour = '05';
				// change ending hour
				directiveScope.endingHour = '05';
				directiveScope.$apply();

				expect(directiveScope.startingMinute).toEqual('00');
				expect(directiveScope.endingMinute).toEqual('01');
			}));
		});
	});
});
