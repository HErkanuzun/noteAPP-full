import React from 'react';
import defaultProfile from '../assets/default-profile.svg';

interface ProfileImageProps {
  src?: string;
  alt?: string;
  className?: string;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ 
  src, 
  alt = "Profile Image",
  className = "w-10 h-10 rounded-full" 
}) => {
  const [imgSrc, setImgSrc] = React.useState(src || defaultProfile);

  const handleError = () => {
    setImgSrc(defaultProfile);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
