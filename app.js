( function () {
	var appControlTypes = {
		defaultControl: "http://tizen.org/appcontrol/operation/default",
		sendControl: "http://tizen.org/appcontrol/operation/send"
	};
	
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			var page = document.getElementsByClassName( 'ui-page-active' )[0],
				pageid = page ? page.id : "";
			if( pageid === "main" ) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	} );
	
	var inputTime = document.getElementById("input-time");
	inputTime.addEventListener("change", function(e) {
		var value = this.value;
		
		var valueArr = value.split(":");
		var hours = valueArr[0], mins = valueArr[1];
		var date = new Date();
		date.setHours(hours, mins, 0, 0);
		if(date <= new Date()) {
			date += 86400000;
		}
		
		var alarm = new tizen.AlarmAbsolute(date);
		var applicationId = tizen.application.getCurrentApplication().appInfo.id;
		var appControl = new tizen.ApplicationControl(appControlTypes.sendControl, null, null, null, null);
		tizen.alarm.add(alarm, applicationId, appControl);
		
		tizen.application.getCurrentApplication().exit();
	});
	
	var setAlarmButton = document.getElementById("set-alarm-btn");
	setAlarmButton.addEventListener("click", function() {
		inputTime.hidden = false;
		inputTime.click();
	});
	
} () );