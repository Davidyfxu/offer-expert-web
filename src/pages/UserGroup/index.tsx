import React, { useEffect, useState } from "react";
import TeachersList from "./components/TeachersList";
import TeachersManage from "./components/TeachersManage";
import { get_teachers } from "./api";

const UserGroup = () => {
  const [loading, setLoading] = useState(false);
  const [tutors, setTutors] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(0);
  const getAllTeachers = async (params: any) => {
    try {
      setLoading(true);
      const { teachers = [] } = await get_teachers(params);
      setTutors(teachers);
    } catch (e) {
      console.error("getAllTeachers", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getAllTeachers({});
  }, [refresh]);

  return (
    <div className="flex flex-wrap -mx-2 overflow-hidden sm:-mx-1 md:-mx-2 lg:-mx-2 xl:-mx-2">
      <TeachersList
        tutors={tutors}
        getAllTeachers={getAllTeachers}
        loading={loading}
      />
      <TeachersManage tutors={tutors} setRefresh={setRefresh} />
    </div>
  );
};

export default UserGroup;
