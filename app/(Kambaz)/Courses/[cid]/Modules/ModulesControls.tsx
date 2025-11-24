import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addNewModule } from "../../../Modules/reducer";

export default function ModulesControls() {
  const params = useParams();
  const cid = Array.isArray(params?.cid) ? params?.cid[0] : params?.cid;
  const dispatch = useDispatch();

  const handleAddModule = () => {
    const newModule = {
      _id: new Date().getTime().toString(),
      course: cid,
      name: "New Module",
      lessons: [],
    };
    dispatch(addNewModule(newModule));
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={handleAddModule}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>
    </div>
  );
}
