import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, hasCookie } from "cookies-next";

const MiPagina = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const router = useRouter();

  

  router.push("/login");
  return (
    <div className="w-screen h-screen bg-BgLight dark:bg-BgDark">
      {/*<Login/> */}
      {/*loged === false ? <Login login={login}/> :  <div><TopNavbar/><TablaDesplegable data={data}/></div>    */}
    </div>
  );
};

export default MiPagina;
