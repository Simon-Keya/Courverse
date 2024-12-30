import { FC } from "react"; // Ensure you import FC from react

interface ProfileCardProps {
  name: string;
  email: string;
  profilePic: string;
}

const ProfileCard: FC<ProfileCardProps> = ({ name, email, profilePic }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-4">
      <img src={profilePic} alt={name} className="w-16 h-16 rounded-full" />
      <div>
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
