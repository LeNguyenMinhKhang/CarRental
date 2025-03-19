"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [carList, setCarList] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [deleteCar, setDeleteCar] = useState(null);
  
  const route = useRouter();

  const handleSearch = () => {
    if (searchQuery) {
      const filtered = carList.filter((car) =>
        car.MaXe.toString() === searchQuery || 
        car.TenXe.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.TrangThai.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filtered.length < 1) toast.error("Không tìm thấy kết quả");
      setFilteredCars(filtered);
    } else {
      setFilteredCars([]);
    }
  };

  const handleAddCar = () => {
    route.push(`/cars/addCar`);
  };

  const handleEdit = (MaXe) => {
    route.push(`/cars/editCar/${MaXe}`);
  };
  
  const fetchCars = async () => {
    const cars = [
      {
        MaXe: "ID001",
        TenXe: "Toyota Vios",
        MoTa: "Xe sedan 4 chỗ, động cơ 1.5L",
        TrangThai: "Sẵn sàng",
        HinhAnh: ["/car/car1.jpg"],
      },
      {
        MaXe: "ID002",
        TenXe: "Hyundai Tucson",
        MoTa: "SUV 5 chỗ, hộp số tự động",
        TrangThai: "Đã cho thuê",
        HinhAnh: ["/car/car2.jpg"],
      },
      {
        MaXe: "ID003",
        TenXe: "Mazda 3",
        MoTa: "Sedan hạng C, tiết kiệm nhiên liệu",
        TrangThai: "Đang bảo trì",
        HinhAnh: ["/car/car3.jpg"],
      },
    ];
    setCarList(cars);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = async (car) => {
    // Gọi API xóa xe
    setDeleteCar(null);
    setPopUpOpen(false);
    toast.success("Xóa xe thành công");
  };

  const CarCard = ({ car }) => {
    return (
      <div className="flex bg-white w-full rounded-lg mt-2 relative drop-shadow-lg p-4 gap-6 items-center">
        <img src={`${car.HinhAnh[0]}`} className="w-[180px] h-[120px] object-cover rounded-lg" />
        <div className="flex flex-col gap-2 relative w-full">
          <p className="">ID:&nbsp;{car.MaXe}</p>
          <p className="font-bold text-lg">{car.TenXe}</p>
          <p className="italic">{car.MoTa}</p>
          <p className={`font-semibold ${car.TrangThai === "Sẵn sàng" ? "text-green-600":"text-red-600"}`}>
            Trạng thái: {car.TrangThai}
          </p>
          <div className="flex justify-end gap-4">
            <Button
              className="w-24 h-10 bg-[#062D76] hover:bg-gray-700"
              onClick={() => handleEdit(car.MaXe)}
            >
              <Pencil className="w-5 h-5" color="white" />
              <p className="ml-2 hidden md:block">Sửa</p>
            </Button>
            <Button
              className="w-24 h-10 bg-[#D66766] hover:bg-gray-700"
              onClick={() => {
                setDeleteCar(car);
                setPopUpOpen(true);
              }}
            >
              <Trash2 className="w-5 h-5" color="white" />
              <p className="ml-2 hidden md:block">Xóa</p>
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full h-full bg-[#EFF3FB]">
      <Sidebar />
      <div className="flex w-full flex-col py-6 md:ml-52 relative mt-5 gap-4 items-center px-10">
        <div className="flex w-full items-center justify-between mb-6">
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="Tìm kiếm xe"
              className="w-64 md:w-96 h-10 text-black bg-white rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="w-10 h-10 bg-[#062D76] hover:bg-gray-700" onClick={handleSearch}>
              <Search className="w-6 h-6" color="white" />
            </Button>
          </div>
          <Button className="w-36 h-10 bg-[#062D76] hover:bg-gray-700" onClick={handleAddCar}>
            <Plus className="w-5 h-5" color="white" />
            <p className="ml-2">Thêm xe</p>
          </Button>
        </div>

        {carList &&
          (filteredCars.length > 0
            ? filteredCars.map((car) => <CarCard key={car.MaXe} car={car} />)
            : carList.map((car) => <CarCard key={car.MaXe} car={car} />))}

        {popUpOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-full h-full bg-black opacity-50 absolute"></div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative z-10">
              <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
              <p>Bạn có chắc chắn muốn xóa xe này không?</p>
              <div className="flex bg-white w-full rounded-lg mt-4 p-4 items-center">
                <img src={`${deleteCar.HinhAnh[0]}`} className="w-40 h-28 object-cover rounded-lg" />
                <div className="ml-4">
                  <p>ID: {deleteCar.MaXe}</p>
                  <p className="font-bold">{deleteCar.TenXe}</p>
                  <p className="italic">{deleteCar.MoTa}</p>
                  <p className="font-semibold">Trạng thái: {deleteCar.TrangThai}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-4">
                <Button className="bg-gray-500 hover:bg-gray-700" onClick={() => setPopUpOpen(false)}>Hủy</Button>
                <Button className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(deleteCar)}>Xóa</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
