// https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onCreated
chrome.tabs.onCreated.addListener(function(tab)
{
	if (tab.incognito == false) return;
	
	chrome.tabs.update(tab.id, {muted: true});
	console.log(`Tab ${tab.id} was muted automatically`);
});

// Listen for commands to toggle the mute state of the current tab
// Is triggered for manifest.json->commands
// https://developer.chrome.com/docs/extensions/reference/api/commands
chrome.commands.onCommand.addListener(function(command)
{
	console.log(`Command "${command}" triggered`);
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if (tabs.length == 0) return;
		var tab = tabs[0];
		if (tab.incognito == false) return;
		
		var isMuted = tab.mutedInfo.muted;
		chrome.tabs.update(tab.id, {muted: !isMuted});
	});
});