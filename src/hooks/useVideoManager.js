
import useIsMountedRef from 'src/hooks/useIsMountedRef'

  let isMounted = useIsMountedRef();

  let segments = {
    apiDescription: { start: 0, end: 31.17 },
    apiBuild: { start: 31.17, end: 63.16 },
    apiRun: { start: 63.16, end: 141.19 },
    apiGrow: { start: 141.19, end: 175.14 },
  }
  let videoPlayer = useRef()
  let [currentTime, setCurrentTime] = useState(0)
  let [playerState, setPlayerState] = useState("loading")

  let currentSegment =
    Object.keys(segments).find((name) => {
      let segment = segments[name]
      return segment.start <= currentTime && segment.end > currentTime
    }) || Object.keys(segments)[0]

  function handleTimeUpdate(event) {
    setCurrentTime(event.seconds)
  }

  async function seekVideo(time) {
    await videoPlayer.current.player.setCurrentTime(time)
  }

  async function pauseVideo() {
    await videoPlayer.current.player.pause()
    if (isMounted.current) {
      setPlayerState("paused")
    }
  }

  async function playVideo() {
    await videoPlayer.current.player.play()
    if (isMounted.current) {
      setPlayerState("playing")
    }
  }

  export { handleTimeUpdate, seekVideo, pauseVideo, playVideo }