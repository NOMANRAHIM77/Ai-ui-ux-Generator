// app/provider.tsx

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";

type UserType = {
  success?: boolean;
  message?: string;
  name?: string;
  email?: string;
};

function Provider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserType | null>(null);

  useEffect(() => {
    CreateNewUser();
  }, []);

  const CreateNewUser = async () => {
    try {
      const result = await axios.post("/api/user", {});

      console.log("API RESPONSE:", result.data);

      setUserDetail(result.data);
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  return (
    <UserDetailContext.Provider
      value={{ userDetail, setUserDetail }}
    >
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;