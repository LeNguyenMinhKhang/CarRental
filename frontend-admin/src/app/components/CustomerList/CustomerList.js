import React from "react";

const customers = [
  { id: 1, name: "Nguyễn Văn A", phone: "0987654321", email: "a@gmail.com", address: "Hà Nội" },
  { id: 2, name: "Trần Thị B", phone: "0976543210", email: "b@gmail.com", address: "TP. Hồ Chí Minh" },
  { id: 3, name: "Lê Văn C", phone: "0965432109", email: "c@gmail.com", address: "Đà Nẵng" },
];

const CustomerList = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Danh sách khách hàng</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Họ và tên</th>
            <th className="py-2 px-4 border">Số điện thoại</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border">{customer.id}</td>
              <td className="py-2 px-4 border">{customer.name}</td>
              <td className="py-2 px-4 border">{customer.phone}</td>
              <td className="py-2 px-4 border">{customer.email}</td>
              <td className="py-2 px-4 border">{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
