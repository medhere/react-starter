import { Store } from "pullstate";
import { createContext } from "react";

export var store = new Store({
    key1:'value',
    key2:'value'
});

export function useGetState([state]){return store.useState(s=>s[state])}

    // var key1=store.useState(s=>s.key1)
    // var {key1,key2}=store.useState(s => ({key1:s.key1,key2:s.key2}));
    // var [key1,key2]=store.useState(s => ([s.key1,s.key2]));
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




export const store2=createContext({
    key: 'value'
});

    // import {store2}
    // var data = useContext(store2) 
    // {data.key} 


