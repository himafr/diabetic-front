function CircleAvatar({ src, alt, imgClass, style }) {
  return (
    <img
      className={" object-cover rounded-full w-13 h-13 " + imgClass}
      style={style}
      src={src}
      alt={alt}
    />
  );
}

export default CircleAvatar;
