function CircleAvatar({src,alt}) {
    return (
        <div className="flex justify-center items-center">
    
                <img className="w-10 h-10 rounded-full "  src={src} alt={alt} />
      
        </div>
    )
}

export default CircleAvatar
