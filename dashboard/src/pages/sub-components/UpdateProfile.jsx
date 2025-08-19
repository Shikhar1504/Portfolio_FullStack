import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updateProfile,
} from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [fullName, setFullName] = useState(user && user.fullName);
  const [email, setEmail] = useState(user && user.email);
  const [phone, setPhone] = useState(user && user.phone);
  const [location, setLocation] = useState(user && user.location);
  const [skills, setSkills] = useState(
    user && user.skills ? user.skills.join(", ") : ""
  );

  const [aboutMe, setAboutMe] = useState(user && user.aboutMe);
  const [aboutCards, setAboutCards] = useState(
    user && Array.isArray(user.aboutCards) && user.aboutCards.length > 0
      ? user.aboutCards.slice(0, 3)
      : [
          { title: "", description: "", icon: "User" },
          { title: "", description: "", icon: "User" },
          { title: "", description: "", icon: "User" },
        ]
  );
  const [portfolioURL, setPortfolioURL] = useState(user && user.portfolioURL);
  const [linkedInURL, setLinkedInURL] = useState(
    user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL)
  );
  const [githubURL, setGithubURL] = useState(
    user && (user.githubURL === "undefined" ? "" : user.githubURL)
  );
  const [instagramURL, setInstagramURL] = useState(
    user && (user.instagramURL === "undefined" ? "" : user.instagramURL)
  );
  const [twitterURL, setTwitterURL] = useState(
    user && (user.twitterURL === "undefined" ? "" : user.twitterURL)
  );
  const [facebookURL, setFacebookURL] = useState(
    user && (user.facebookURL === "undefined" ? "" : user.facebookURL)
  );
  const [youtubeURL, setYoutubeURL] = useState(
    user && (user.youtubeURL === "undefined" ? "" : user.youtubeURL)
  );
  const [leetcodeURL, setLeetcodeURL] = useState(
    user && (user.leetcodeURL === "undefined" ? "" : user.leetcodeURL)
  );
  const [codeforcesURL, setCodeforcesURL] = useState(
    user && (user.codeforcesURL === "undefined" ? "" : user.codeforcesURL)
  );
  const [codechefURL, setCodechefURL] = useState(
    user && (user.codechefURL === "undefined" ? "" : user.codechefURL)
  );
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(
    user && user.avatar && user.avatar.url
  );

  const [resume, setResume] = useState(null);

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("location", location);
    formData.append("skills", skills);
    formData.append("aboutMe", aboutMe);
    formData.append("aboutCards", JSON.stringify(aboutCards));
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("youtubeURL", youtubeURL);
    formData.append("leetcodeURL", leetcodeURL);
    formData.append("codeforcesURL", codeforcesURL);
    formData.append("codechefURL", codechefURL);
    formData.append("avatar", avatar);
    if (resume) {
      formData.append("resume", resume);
    }

    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Profile</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Profile Here
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex flex-col items-start gap-5 lg:justify-between lg:items-center lg:flex-row">
                <div className="grid w-full gap-2 sm:w-72">
                  <Label>Profile Image</Label>
                  <img
                    src={avatarPreview ? avatarPreview : "/avatarHolder.jpg"}
                    alt="avatar"
                    className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                  />
                  <div className="relative">
                    <input
                      type="file"
                      onChange={avatarHandler}
                      className="avatar-update-btn"
                    />
                  </div>
                </div>
              </div>
              <div className="grid w-full gap-2 sm:w-72">
                <Label>Resume</Label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={resumeHandler}
                  className="avatar-update-btn"
                />
              </div>

              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Location</Label>
                <Input
                  type="text"
                  className="Your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Skills (comma-separated)</Label>
                <Input
                  type="text"
                  className="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g., JavaScript, React, Node.js"
                />
              </div>

              <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea
                  className="About Me"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </div>

              <div className="grid gap-4">
                <h2 className="text-2xl font-semibold">About Cards</h2>
                {[0, 1, 2].map((idx) => (
                  <div key={idx} className="grid gap-3 p-4 border rounded-md">
                    <div className="grid gap-2">
                      <Label>Card {idx + 1} Title</Label>
                      <Input
                        type="text"
                        value={aboutCards[idx]?.title || ""}
                        onChange={(e) => {
                          const updated = [...aboutCards];
                          updated[idx] = {
                            ...(updated[idx] || {}),
                            title: e.target.value,
                          };
                          setAboutCards(updated);
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Card {idx + 1} Description</Label>
                      <Textarea
                        value={aboutCards[idx]?.description || ""}
                        onChange={(e) => {
                          const updated = [...aboutCards];
                          updated[idx] = {
                            ...(updated[idx] || {}),
                            description: e.target.value,
                          };
                          setAboutCards(updated);
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Card {idx + 1} Icon</Label>
                      <select
                        className="px-3 py-1 text-sm border rounded-md shadow-sm h-9 border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        value={aboutCards[idx]?.icon || "User"}
                        onChange={(e) => {
                          const updated = [...aboutCards];
                          updated[idx] = {
                            ...(updated[idx] || {}),
                            icon: e.target.value,
                          };
                          setAboutCards(updated);
                        }}
                      >
                        <option value="User">User</option>
                        <option value="Code">Code</option>
                        <option value="Briefcase">Briefcase</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input
                  type="text"
                  className="Portfolio URL"
                  value={portfolioURL}
                  onChange={(e) => setPortfolioURL(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input
                  type="text"
                  className="LinkedIn URL"
                  value={linkedInURL}
                  onChange={(e) => setLinkedInURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input
                  type="text"
                  className="Github URL"
                  value={githubURL}
                  onChange={(e) => setGithubURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input
                  type="text"
                  className="Instagram URL"
                  value={instagramURL}
                  onChange={(e) => setInstagramURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Twitter(X) URL</Label>
                <Input
                  type="text"
                  className="Twitter(X) URL"
                  value={twitterURL}
                  onChange={(e) => setTwitterURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input
                  type="text"
                  className="Facebook URL"
                  value={facebookURL}
                  onChange={(e) => setFacebookURL(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Youtube URL</Label>
                <Input
                  type="text"
                  className="Youtube URL"
                  value={youtubeURL}
                  onChange={(e) => setYoutubeURL(e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Leetcode URL</Label>
              <Input
                type="text"
                className="Leetcode URL"
                value={leetcodeURL}
                onChange={(e) => setLeetcodeURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Codeforces URL</Label>
              <Input
                type="text"
                className="Codeforces URL"
                value={codeforcesURL}
                onChange={(e) => setCodeforcesURL(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>CodeChef URL</Label>
              <Input
                type="text"
                className="CodeChef URL"
                value={codechefURL}
                onChange={(e) => setCodechefURL(e.target.value)}
              />
            </div>
            {!loading ? (
              <Button onClick={() => handleUpdateProfile()} className="w-full">
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButton content={"Updating"} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
