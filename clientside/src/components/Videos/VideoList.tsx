import VideoItem from './VideoItem'

const videos = ['BZ0QER_0ZWI', '_A_Jpr9HkGA', 'hkRiMtq8LEo', 'sCeiwVEjhx4']

function VideoList() {
  return (
    <section className="flex flex-col gap-12 video-listing">
      {videos.map((item: string) => {
        return <VideoItem key={item} vId={item} />
      })}
    </section>
  )
}

export default VideoList
