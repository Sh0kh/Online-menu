import { useEffect, useState } from "react";
import { $api } from "../../../utils";
import BackroundCrete from "./BackroundCrete";
import BackroundEdit from "./BackroundEdit";
import BackroundDelete from "./BackroundDelete";

export default function Backround() {
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const restaurant_id = localStorage.getItem("restaurant_id1");

  // Ma'lumotni yangilash uchun funksiya
  const fetchBackground = async () => {
    setLoading(true);
    try {
      const res = await $api.get(`/background/${restaurant_id}`);
      setBackground(res.data || null);
    } catch (err) {
      setBackground(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurant_id) fetchBackground();
    // eslint-disable-next-line
  }, [restaurant_id]);

  const handleCreate = () => setCreateOpen(true);
  const handleEdit = () => setEditOpen(true);
  const handleDelete = () => setDeleteOpen(true);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-blue-600 font-semibold">Yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {background ? (
        <div className="flex justify-center">
          <div
            className="relative border-[3px] rounded-[32px] shadow bg-white flex flex-col w-full max-w-2xl min-w-[350px] p-6"
            style={{
              borderColor: background.border_color || "#A79684",
              color: background.text_color || "#333",
              background: background.background_color || "#F5F5DC",
            }}
          >
            {/* Edit va Delete tugmalari */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={handleEdit}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-3 rounded-full transition"
                title="Tahrirlash"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2l-6 6m-2 2h6"
                  />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-full transition"
                title="O'chirish"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Card content */}
            <div
              className="w-full py-2 rounded-t-[16px] h-[44px] text-center"
              style={{
                backgroundColor: background.border_color || "#A79684",
              }}
            >
              <span
                className="font-bold text-lg"
                style={{ color: background.text_color }}
              >
                Backround preview
              </span>
            </div>
            <div
              className="w-full h-64 rounded-b-[16px] flex items-center justify-center"
              style={{ background: background.background_color || "#F5F5DC" }}
            >
              <span
                className="text-2xl font-semibold"
                style={{ color: background.text_color }}
              >
                {background.background_color}
              </span>
            </div>
            <div className="w-full pt-6">
              <div
                className="w-[90%] h-[5px] mx-auto my-6 rounded-3xl"
                style={{
                  backgroundColor: background.border_color || "#A79684",
                }}
              ></div>
              <h2
                className="text-[28px] font-extrabold text-center mb-6"
                style={{ color: background.text_color }}
              >
                {background.border_color}
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-8 min-h-[220px]">
          <div>
            <h2 className="text-xl font-bold text-gray-500 mb-2">
              Ma’lumot yo‘q
            </h2>
            <p className="text-gray-400">Backround ma’lumoti topilmadi.</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          >
            Yaratish
          </button>
        </div>
      )}

      {/* Modal chaqiruvlar */}
      {createOpen && (
        <BackroundCrete
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onSuccess={() => {
            setCreateOpen(false);
            fetchBackground();
          }}
        />
      )}
      {editOpen && background && (
        <BackroundEdit
          open={editOpen}
          onClose={() => setEditOpen(false)}
          background={background}
          onSuccess={() => {
            setEditOpen(false);
            fetchBackground();
          }}
        />
      )}
      {deleteOpen && background && (
        <BackroundDelete
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          backgroundId={background.id}
          onSuccess={() => {
            setDeleteOpen(false);
            fetchBackground();
          }}
        />
      )}
    </div>
  );
}