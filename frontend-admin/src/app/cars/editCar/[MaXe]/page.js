"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import toast from "react-hot-toast";

const EditCar = () => {
  const router = useRouter(); // Khai báo router
  const params = useParams(); // Lấy tham số từ URL
  const [MaXe, setMaXe] = useState("");

  useEffect(() => {
    if (params?.MaXe) {
      setMaXe(params.MaXe);
    }
  }, [params]);

  const [car, setCar] = useState({
    MaXe: "",
    TenXe: "",
    MoTa: "",
    TrangThai: "",
  });

  useEffect(() => {
    const fetchCarData = async () => {
      const cars = [
        { MaXe: "ID001", TenXe: "Toyota Vios", MoTa: "Xe sedan 4 chỗ", TrangThai: "Sẵn sàng" },
        { MaXe: "ID002", TenXe: "Hyundai Tucson", MoTa: "SUV 5 chỗ", TrangThai: "Đã cho thuê" },
        { MaXe: "ID003", TenXe: "Mazda 3", MoTa: "Sedan hạng C", TrangThai: "Đang bảo trì" },
      ];
      const foundCar = cars.find((c) => c.MaXe === MaXe);
      if (foundCar) {
        setCar(foundCar);
      } else {
        toast.error("Không tìm thấy xe");
        router.push("/cars"); // Chuyển hướng nếu không tìm thấy xe
      }
    };

    if (MaXe) fetchCarData();
  }, [MaXe, router]);

  const handleSave = async () => {
    toast.success("Cập nhật xe thành công!");
    router.push("/cars");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Chỉnh sửa xe: {car.MaXe}</h1>
      <Input
        type="text"
        className="w-96 mb-3"
        placeholder="Tên xe"
        value={car.TenXe}
        onChange={(e) => setCar({ ...car, TenXe: e.target.value })}
      />
      <Input
        type="text"
        className="w-96 mb-3"
        placeholder="Mô tả"
        value={car.MoTa}
        onChange={(e) => setCar({ ...car, MoTa: e.target.value })}
      />
      <Input
        type="text"
        className="w-96 mb-3"
        placeholder="Trạng thái"
        value={car.TrangThai}
        onChange={(e) => setCar({ ...car, TrangThai: e.target.value })}
      />
      <Button className="w-32 bg-blue-600 hover:bg-blue-800" onClick={handleSave}>
        Lưu
      </Button>
    </div>
  );
};

export default EditCar;
