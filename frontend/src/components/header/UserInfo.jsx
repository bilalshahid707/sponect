import Avatar from '../../assets/avatar.webp'
export const UserInfo = ({user}) => {
  return (
    <>
      <div className="flex items-start gap-sm p-sm border-b-2 border-dark-lighter">
        <img
          src={user?.profileImage?.secureUrl || Avatar}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="body-text font-semibold text-white">{user?.fullName}</p>
          <p className="text-base text-white">{user?.email}</p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
