import AdminSidebar from "../../components/AdminSidebar";
import { APP_TITLE } from "../../contants";

const ShowtimeManagement = () => {
  document.title = APP_TITLE + "Quản lí suất chiếu";

  return (
    <>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-slate-500 text-white h-screen">
          <AdminSidebar dashboard="showtime" />
        </div>
        <div>Showtime management</div>
      </div>
    </>
  );
};

export default ShowtimeManagement;
