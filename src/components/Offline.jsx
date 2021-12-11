	import { Offline, Online, Detector } from "react-detect-offline";

	const DetectOffline = () => (
	  <>
		<Online polling={true}>Only shown when you're online</Online>		
		<Offline polling={true}>Only shown offline (surprise!)</Offline>

		<Detector polling={true} render={({ online }) => (
			<div className={online ? "normal" : "warning"}>
			  You are currently {online ? "online" : "offline"}
			</div>
		  )}
		/>
		
	  </>
	);
