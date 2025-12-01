"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  Form,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addNewModule } from "../../../Modules/reducer";
import * as client from "../../../Courses/client";

export default function ModulesControls() {
  const [showDialog, setShowDialog] = useState(false);
  const [moduleName, setModuleName] = useState("");
  const params = useParams();
  const cid = Array.isArray(params?.cid) ? params?.cid[0] : params?.cid;
  const dispatch = useDispatch();

  const handleAddModule = async () => {
    if (!moduleName.trim() || !cid) return;

    try {
      const newModule = {
        name: moduleName,
        course: cid,
      };
      const createdModule = await client.createModuleForCourse(
        cid as string,
        newModule
      );
      dispatch(addNewModule(createdModule));
      setModuleName("");
      setShowDialog(false);
    } catch (error) {
      console.error("Failed to create module:", error);
    }
  };

  return (
    <>
      <div id="wd-modules-controls" className="text-nowrap">
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
          onClick={() => setShowDialog(true)}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
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

      <Modal show={showDialog} onHide={() => setShowDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Module Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter module name"
                value={moduleName}
                onChange={(e) => setModuleName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddModule();
                  }
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialog(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleAddModule}>
            Add Module
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
