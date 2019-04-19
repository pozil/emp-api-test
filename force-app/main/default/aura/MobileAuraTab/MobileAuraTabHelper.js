({
	log : function(component, message) {
		const messages = component.get('v.messages');
		messages.push(message);
		component.set('v.messages', messages);
	}
})