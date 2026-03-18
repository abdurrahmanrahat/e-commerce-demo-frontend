import { getMeFromDB } from "@/app/actions/users";
import Container from "@/components/shared/Ui/Container";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import EditProfileModal from "./_components/EditProfileModal";

// const user = {
//   name: "Rahat Ahmad",
//   email: "rahat.ahmad4747@gmail.com",
//   phone: "+880123456789",
//   photo: "/images/shared/user-avater.svg",
//   fullAddress: "House 10, Road 5, Kaliganj, Dhaka",
//   country: "Bangladesh",
// };

const UserProfilePage = async () => {
  const userResponse = await getMeFromDB();
  const user = userResponse?.data?.user;

  return (
    <Container>
      <div className="max-w-3xl mx-auto min-h-[80vh]  flex justify-center items-center">
        <div className="w-full bg-white dark:bg-deep-dark rounded-xl shadow-cardLightShadow dark:shadow-cardDarkShadow p-6">
          <div className="flex items-center gap-6">
            <div className="relative flex flex-col items-center gap-3">
              <Image
                src={user?.photoUrl || "/images/shared/user-avater.svg"}
                alt="profile"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <EditProfileModal userInfo={user} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{user.email}</p>

              <Badge variant="secondary" className="mt-1">
                {user?.role}
              </Badge>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem label="Phone" value={user.phone} />
            <ProfileItem label="Country" value={user.country} />
            <ProfileItem label="Full Address" value={user.fullAddress} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default UserProfilePage;

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="font-medium">{value ? value : "N/A"}</p>
    </div>
  );
}
