function CircleAvatar({src,alt,imgClass,style}) {
    return (
                <img className={" object-cover rounded-full "+imgClass}  style={style} src={src} alt={alt} />
      
    )
}

export default CircleAvatar
