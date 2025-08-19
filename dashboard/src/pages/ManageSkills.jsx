import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  clearAllSkillErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
  updateSkill,
} from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );
  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);
  const [newType, setNewType] = useState("");

  const handleInputChange = (proficiency) => {
    setNewProficiency(proficiency);
  };

  const handleTypeChange = (type) => {
    setNewType(type);
  };

  const handleUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency, newType));
  };

  const handleUpdateSkillType = (id, type) => {
    dispatch(updateSkill(id, null, type));
  };

  const handleDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {skills.map((element) => {
                return (
                  <Card key={element._id}>
                    <CardHeader className="flex flex-row items-center justify-between text-2xl font-bold">
                      <div>
                        <div>{element.title}</div>
                        <div className="text-sm font-normal capitalize text-muted-foreground">
                          {element.type || "tools"}
                        </div>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="w-5 h-5 hover:text-red-500"
                            />
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-3">
                      <div className="flex items-center w-full gap-2">
                        <Label className="w-20 text-sm">Proficiency:</Label>
                        <Input
                          type="number"
                          defaultValue={element.proficiency}
                          onChange={(e) => handleInputChange(e.target.value)}
                          onBlur={() => handleUpdateSkill(element._id)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center w-full gap-2">
                        <Label className="w-20 text-sm">Type:</Label>
                        <select
                          className="flex-1 px-3 py-1 text-sm transition-colors border rounded-md shadow-sm h-9 border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          defaultValue={element.type || "tools"}
                          onChange={(e) =>
                            handleUpdateSkillType(element._id, e.target.value)
                          }
                        >
                          <option value="frontend">Frontend</option>
                          <option value="backend">Backend</option>
                          <option value="languages">Languages</option>
                          <option value="databases">Databases</option>
                          <option value="ai">AI</option>
                          <option value="tools">Tools</option>
                        </select>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
