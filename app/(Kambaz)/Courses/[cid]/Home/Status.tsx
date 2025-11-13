"use client";

import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import { IoStatsChart, IoNotifications } from "react-icons/io5";
import { FaBullhorn, FaEye } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "../../client";
import { RootState } from "../../../store";

export default function CourseStatus() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer || {}
  );
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!cid) return;
    client.findPeopleForCourse(cid).then((people) => {
      if (!currentUser) {
        setEnrolled(false);
        return;
      }
      const found = (people || []).some((p: any) => p._id === currentUser._id);
      setEnrolled(found);
    });
  }, [cid, currentUser]);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      await client.enrollInCourse(cid);
      setEnrolled(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnenroll = async () => {
    setLoading(true);
    try {
      await client.unenrollFromCourse(cid);
      setEnrolled(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wd-course-status" style={{ width: "350px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap">
            <MdDoNotDisturbAlt className="me-2 fs-5" />
            Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100">
            <FaCheckCircle className="me-2 fs-5" />
            Publish
          </Button>
        </div>
      </div>
      <br />

      <div className="mb-3">
        {enrolled ? (
          <Button
            variant="danger"
            className="w-100"
            onClick={handleUnenroll}
            disabled={loading}
          >
            Unenroll
          </Button>
        ) : (
          <Button
            variant="primary"
            className="w-100"
            onClick={handleEnroll}
            disabled={loading}
          >
            Enroll
          </Button>
        )}
      </div>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" />
        Import Existing Content
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" />
        Import from Commons
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoMdHome className="me-2 fs-5" />
        Choose Course Page
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <FaEye className="me-2 fs-5" />
        View Course Stream
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <FaBullhorn className="me-2 fs-5" />
        New Announcement
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoStatsChart className="me-2 fs-5" />
        New Analytics
      </Button>

      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
        <IoNotifications className="me-2 fs-5" />
        View Course Notifications
      </Button>
    </div>
  );
}
