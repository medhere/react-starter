import { Offline, Online, Detector } from "react-detect-offline";


export const DetectOffline = () => {
	// use another endpoint
	// var polling={
	// 	enabled: true,
	// 	url: 'address/poll',
	// 	interval: 10000,
	// 	timeout: 10000
	// }
	// <Online polling={true}>Only shown when you're online</Online>		
	// <Offline polling={true}>Only shown offline (surprise!)</Offline>
	return	<Detector polling={true} render={({ online }) => (	<> {online ? "" : <OfflineView/>} </>	)}	/> 

};


function OfflineView(){
	return(
		<div className="inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity z-[10000]">
			<div className="flex-col">
				<div className="w-24 h-24 text-white font-mono text-center"> Currently Offline </div>
				<button className="btn-primary">Reload</button>
			</div>
		</div>
	)
}
