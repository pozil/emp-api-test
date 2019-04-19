import { LightningElement, track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class LwcEmpApiTest extends LightningElement {
    
    @track messages = [];

    connectedCallback() {
        this.log('Starting EMP API calls');
        
        setDebugFlag(true);
        
        onError(error => {
            this.log('Streaming API error: '+ JSON.stringify(error));
        });

        isEmpEnabled().then(response => {
            this.log('isEmpEnabled: '+ JSON.stringify(response));
        });

        subscribe('/event/Robot_Event__e', -1, event => {
                this.log('On event: '+ JSON.stringify(event));
            })
            .then(response => {
                this.log('Subscribed to: '+ response.channel);
            });
        
        this.log('Ending EMP API calls');
    }

    log(message) {
        this.messages.push(message);
    }

    disconnectedCallback() {
        if (this.subscription) {
            unsubscribe(this.subscription, response => {
                this.log('Unsubscribed from: '+ response);
                this.subscription = null;
            });
        }
    }
}