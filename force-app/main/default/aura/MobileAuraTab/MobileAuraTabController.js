({
	onInit : function(component, event, helper) {
		helper.log(component, 'Starting EMP API calls');
		
		const empApi = component.find('empApi');

        empApi.setDebugFlag(true);
        
        empApi.onError($A.getCallback(error => {
            helper.log('Streaming API error: '+ JSON.stringify(error));
        }));

        empApi.isEmpEnabled().then($A.getCallback(response => {
            helper.log(component, 'isEmpEnabled: '+ JSON.stringify(response));
        }));

        empApi.subscribe('/event/Robot_Event__e', -1, $A.getCallback(event => {
                helper.log(component, 'On event: '+ JSON.stringify(event));
            }))
            .then(subscription => {
				helper.log(component, 'Subscribed to: '+ subscription.channel);
				component.set('v.subscription', subscription);
            });
        
        helper.log(component, 'Ending EMP API calls');
	}
})