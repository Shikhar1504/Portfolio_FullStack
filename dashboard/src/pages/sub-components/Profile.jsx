import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-balance text-muted-foreground">
                Full Profile Preview
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex flex-col items-start gap-5 lg:justify-between lg:items-center lg:flex-row">
                <div className="grid w-full gap-2 sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={user && user.avatar && user.avatar.url}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                </div>
              </div>
              {user?.resume?.url && (
                <div className="grid w-full gap-2 sm:w-72">
                  <Label>Resume</Label>
                  <a
                    href={user.resume.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="w-full px-4 py-2 text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700">
                      Resume
                    </button>
                  </a>
                </div>
              )}
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input type="text" defaultValue={user.fullName} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" defaultValue={user.email} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input type="text" defaultValue={user.phone} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Location</Label>
                <Input type="text" defaultValue={user.location} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Skills</Label>
                <Input
                  type="text"
                  defaultValue={user.skills ? user.skills.join(", ") : ""}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea defaultValue={user.aboutMe} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input type="text" defaultValue={user.portfolioURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input type="text" defaultValue={user.githubURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input type="text" defaultValue={user.linkedInURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input type="text" defaultValue={user.instagramURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input type="text" defaultValue={user.twitterURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input type="text" defaultValue={user.facebookURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Youtube URL</Label>
                <Input type="text" defaultValue={user.youtubeURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Leetcode URL</Label>
                <Input type="text" defaultValue={user.leetcodeURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>Codeforces URL</Label>
                <Input type="text" defaultValue={user.codeforcesURL} disabled />
              </div>
              <div className="grid gap-2">
                <Label>CodeChef URL</Label>
                <Input type="text" defaultValue={user.codechefURL} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
