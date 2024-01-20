import { useEffect, useState } from "react";
import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";
import { getAppInfo } from "../../api/admin";
import { useNotificaion } from "../../hooks";
import MostRatedMovies from "../MostRatedMovies";

export default function Dashboard() {
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  });

  const { updateNotification } = useNotificaion();

  const fetchAppInfo = async () => {
    const { error, appInfo } = await getAppInfo();
    if (error) return updateNotification("error", error);

    setAppInfo({ ...appInfo });
  };
  useEffect(() => {
    fetchAppInfo();
  }, []);

  const { movieCount, reviewCount, userCount } = appInfo;
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      <AppInfoBox
        title="Total Uploads"
        subTitle={movieCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subTitle={reviewCount.toLocaleString()}
      />
      <AppInfoBox title="Total Users" subTitle={userCount.toLocaleString()} />

      <LatestUploads />

      <MostRatedMovies />
    </div>
  );
}
