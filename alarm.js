(function() {
	var appControlTypes = {
			defaultControl: "http://tizen.org/appcontrol/operation/default",
			sendControl: "http://tizen.org/appcontrol/operation/send"
		};
	
	tizen.power.request("CPU", "CPU_AWAKE");
	tizen.power.request("SCREEN", "SCREEN_NORMAL");
	tizen.power.turnScreenOn();
	window.navigator.vibrate(5000);
	
	var date = new Date();
	var hours = date.getHours(), mins = date.getMinutes();
	
	var timeDiv = document.getElementById("time");
	timeDiv.innerHTML = hours + ":" + (mins >= 10 ? "" : "0") + mins;
	
	var okButton = document.getElementById("options-ok-btn");
	okButton.addEventListener("click", function() {
		tizen.application.getCurrentApplication().exit();
	});
	
	var plus10MinButton = document.getElementById("options-plus10min-btn");
	plus10MinButton.addEventListener("click", function() {
		var newDate = new Date(date.getTime() + 600000);
		
		var alarm = new tizen.AlarmAbsolute(newDate);
		var applicationId = tizen.application.getCurrentApplication().appInfo.id;
		var appControl = new tizen.ApplicationControl(appControlTypes.sendControl, null, null, null, null);
		tizen.alarm.add(alarm, applicationId, appControl);
		
		tizen.application.getCurrentApplication().exit();
	});
})();
