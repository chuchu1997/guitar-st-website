


 const VideoDescription = ()=>{
    return   <div className = "container mx-auto px-4">
 <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 ">
    Video sản phẩm
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[400px]">
          <div className = "h-full">
          <iframe 
          loading="lazy"
          className="relative top-0 left-0 w-full h-full"  
          src="https://www.youtube-nocookie.com/embed/2yQNdvMzfnw?si=rvflOXL8kjbK-uHm" 
          title="YouTube video player 1" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>          </div>
          <div>

          <iframe 
            loading="lazy"
          className="relative top-0 left-0 w-full h-full"  
          src="https://www.youtube-nocookie.com/embed/7PdGF5AShXM?si=mYiAAmAkiZtlqhfB"  
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
          </div>
        </div>
    </div>
    
   
}

export default VideoDescription;
