import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import instance from "../../../configs/axios";
import { toast } from "react-toastify";

const Feedback = () => {
  const { id } = useParams(); // Lấy ID của contact từ URL
  const navigate = useNavigate(); // Hook để điều hướng
  const [responseContent, setResponseContent] = useState("");
  const [responderEmail, setResponderEmail] = useState("");
  const [requestEmail, setRequestEmail] = useState("");
  const [requestContent, setRequestContent] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await instance.get(`/contact/${id}`);
        console.log("Fetched contact data:", data); // Kiểm tra dữ liệu
        if (data && data.data && data.data.email && data.data.content) {
          setRequestEmail(data.data.email);
          setRequestContent(data.data.content);
        } else {
          console.error("Data not in expected format:", data);
        }
      } catch (error) {
        console.error("Error fetching contact:", error);
        toast.error("Lỗi khi lấy thông tin liên hệ!");
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Gửi phản hồi lên server
      await instance.put(`/contact/feedback/${id}`, {
        response_content: responseContent,
        responder_email: responderEmail,
        response_date: new Date(), // Thêm ngày phản hồi
      });

      // Gửi email phản hồi
      const emailData = {
        to_name: requestEmail, // Địa chỉ email người yêu cầu
        from_name: responderEmail, // Tên người phản hồi
        message: responseContent, // Nội dung phản hồi
      };

      const result = await emailjs.send(
        "service_cwchhdc", // Thay thế bằng Service ID của bạn
        "template_dxp3ou9", // Thay thế bằng Template ID của bạn
        emailData,
        "kGSzc2RJ3qF1lHtBo" // Thay thế bằng User ID của bạn
      );

      if (result.status === 200) {
        toast.success("Phản Hồi thành công!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin/contact");
      } else {
        toast.error("Phản Hồi thất bại!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Gửi phản hồi hoặc email thất bại!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-10 mt-10">
        <h1 className="text-2xl font-semibold">Phản hồi liên hệ</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email người yêu cầu
          </label>
          <input
            type="text"
            value={requestEmail || ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nội dung yêu cầu
          </label>
          <textarea
            value={requestContent || ""}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="responseContent"
          >
            Nội dung phản hồi
          </label>
          <textarea
            id="responseContent"
            value={responseContent}
            onChange={(e) => setResponseContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="responderEmail"
          >
            Email phản hồi
          </label>
          <input
            id="responderEmail"
            type="text"
            value={responderEmail}
            onChange={(e) => setResponderEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
        >
          Gửi phản hồi
        </button>
      </form>
    </div>
  );
};

export default Feedback;
