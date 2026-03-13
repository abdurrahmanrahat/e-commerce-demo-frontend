import Image from "next/image";
import EditProfileModal from "./_components/EditProfileModal";

const user = {
  fullName: "Rahat Ahmad",
  email: "rahat.ahmad4747@gmail.com",
  phone: "+880123456789",
  photo: "/images/shared/user-avater.svg",
  fullAddress: "House 10, Road 5, Kaliganj, Dhaka",
  country: "Bangladesh",
};

const UserProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-6">
          <Image
            src={user.photo}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>

          <EditProfileModal userInfo={user} />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileItem label="Phone" value={user.phone} />
          <ProfileItem label="Country" value={user.country} />
          <ProfileItem label="Full Address" value={user.fullAddress} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

function ProfileItem({ label, value }: any) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
