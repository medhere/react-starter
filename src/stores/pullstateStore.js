import { registerInDevtools, Store } from "pullstate";

export const authStore = new Store({
    auth:null,
});

export const dataStore = new Store({
    data:null
})

registerInDevtools({ authStore, dataStore });

authStore.subscribe( s => s, store => { localStorage.setItem('authStore', JSON.stringify(store)) }, );

export const getAuthStore = async () => {
    try {
      const store = localStorage.getItem('authStore');  
      if (dataStore !== null) { authStore.replace(JSON.parse(store)) }
    } catch (e) {
      console.log('Error Getting Stored data: '+e);
    }
};


export function getAuthState([state]){return authStore.useState(s=>s[state])}
export function getDataState([state]){return dataStore.useState(s=>s[state])}

    // var key1=store.getRawState().key1
    // var key1=store.useState(s=>s.key1)
    // var {key1,key2}=store.useState(s => ({key1:s.key1,key2:s.key2}));
    // var [key1,key2]=store.useState(s => ([s.key1,s.key2]));
    // var key1=store.getRawState().key1 //used where hooks are not permitted
    // store.update(s => {s.key1 = 'lol'});		
    // store.update([s=>{s.key1=""}, s=>{s.key2=""}]);
    // function chng(e){
    //     var {id, value} = e.target;
    //     store.update(s => {s.key1 = {...s.key1,[id]:value}});
    // }
    // var unsubscribe=myStore.subscribe((s) => s.state, (newValue, allState, prevValue) => { });
    // unsubscribe()  
	// var stopReaction=StoreName.createReaction((s) => s.state, (newValue, draftStore, originalStore, prevValue) => { });
	// stopReaction();



