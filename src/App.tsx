import Todo from "./components/todo/ui/Todo";
import { VideoPlayer } from "./player";

function App() {
    const videoJsOptions = {
		autoplay: true,
		controls: true,
		responsive: true,
		play: ">",
		fluid: true,
		sources: [{
			src: "http://saveukraine.1ce.xyz/5567/video.m3u8?token=HfLCPEomUd",
			type: "application/x-mpegURL"
		}]
	}
    return <>
    <VideoPlayer  options={videoJsOptions}/>
    <Todo /></>;
}

export default App;
