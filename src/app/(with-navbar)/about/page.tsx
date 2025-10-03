import { getMe } from "@/app/actions/users";
import { redirect } from "next/navigation";

const AboutPage = async () => {
  const currentUser = await getMe();

  if (!currentUser) {
    redirect("/login"); // 🚀 works now!
  }

  return <div>AboutPage</div>;
};

export default AboutPage;
