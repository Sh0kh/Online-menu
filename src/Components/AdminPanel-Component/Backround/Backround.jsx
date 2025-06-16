import { useEffect, useState } from "react";
import { $api } from "../../../utils";
import BackroundCrete from "./BackroundCrete";
import BackroundDelete from "./BackroundDelete";
import { TrashIcon } from "@heroicons/react/24/solid";
import CONFIG from "../../../utils/Config";

export default function Backround() {
  const [backgrounds, setBackgrounds] = useState([]); // massiv sifatida
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const restaurant_id = localStorage.getItem("restaurant_id1");

  const fetchBackground = async () => {
    setLoading(true);
    try {
      const res = await $api.get(`/background/getResId/${restaurant_id}`);
      if (Array.isArray(res.data)) {
        setBackgrounds(res.data);
      } else if (res.data) {
        setBackgrounds([res.data]);
      } else {
        setBackgrounds([]);
      }
    } catch (err) {
      setBackgrounds([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurant_id) fetchBackground();
  }, [restaurant_id]);

  const handleCreate = () => setCreateOpen(true);
  const handleDelete = (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-blue-600 font-semibold">Yuklanmoqda...</span>
      </div>
    );
  }

  // Faqat bitta background bo‘lsa, uni olish
  const background = backgrounds.length > 0 ? backgrounds[0] : null;

  return (
    <div className="p-6 ">
      {background ? (
        <div className="flex justify-center">
          <div
            className="relative border-[3px] rounded-[32px] shadow bg-white flex flex-col w-full max-w-2xl min-w-[350px] p-6"
            style={{
              borderColor: background.color || "#A79684",
              background: "#fff",
            }}
          >
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => handleDelete(background.id)}
                className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-full transition"
                title="O'chirish"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            <div
              className="w-full py-2 rounded-t-[16px] mb-[20px] h-[44px] text-center"
              style={{
                backgroundColor: background.color || "#A79684",
              }}
            >
              <span className="font-bold text-lg text-white">
                Background preview
              </span>
            </div>
            <div
              className="w-full mt[40px] h-64 rounded-b-[16px] flex items-center justify-center relative"
              style={{ background: "#fff" }}
            >
              {background.image && (
                <img
                  src={CONFIG.API_URL + background.image}
                  alt="Background"
                  className="max-h-full max-w-full object-contain rounded-lg shadow"
                  style={{ background: "#fff" }}
                />
              )}
              {!background.image && (
                <span
                  className="text-2xl font-semibold"
                  style={{ color: background.color }}
                >
                  {background.color}
                </span>
              )}
            </div>
            <div className="w-full pt-6">
              <div
                className="w-[90%] h-[5px] mx-auto my-6 rounded-3xl"
                style={{
                  backgroundColor: background.color || "#A79684",
                }}
              ></div>
              <h2
                className="text-[28px] font-extrabold text-center mb-6"
                style={{ color: background.color }}
              >
                {background.color}
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
            <p className="text-gray-400">Background ma’lumoti topilmadi.</p>
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
          >
            Yaratish
          </button>
        </div>
      )}

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

      {deleteOpen && deleteId && (
        <BackroundDelete
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          backgroundId={deleteId}
          onSuccess={() => {
            setDeleteOpen(false);
            setDeleteId(null);
            fetchBackground();
          }}
        />
      )}
    </div>
  );
}