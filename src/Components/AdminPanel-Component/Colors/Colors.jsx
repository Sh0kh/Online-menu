import React, { useEffect, useState } from "react";
import { $api } from "../../../utils";
import { PencilSquareIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import ColorEdit from "./Components/ColorEdit";
import ColorDelete from "./Components/ColorDelete"; 
import ColorCreate from "./Components/ColorCreate"; 

export default function Colors() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editColor, setEditColor] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false); 
  const [deleteColor, setDeleteColor] = useState(null); 
  const [createOpen, setCreateOpen] = useState(false);
  const restaurant_id = localStorage.getItem("restaurant_id1");

  useEffect(() => {
    const fetchColors = async () => {
      setLoading(true);
      try {
        const res = await $api.get(`/color/${restaurant_id}`);
        const data = res.data;
        if (Array.isArray(data)) {
          setColors(data);
        } else if (data) {
          setColors([data]);
        } else {
          setColors([]);
        }
      } catch (err) {
        setColors([]);
      } finally {
        setLoading(false);
      }
    };
    if (restaurant_id) fetchColors();
  }, [restaurant_id]);

  const handleEdit = (item) => {
    setEditColor(item);
    setEditOpen(true);
  };

  const handleEditSuccess = async () => {
    setEditOpen(false);
    setEditColor(null);
    if (restaurant_id) {
      setLoading(true);
      try {
        const res = await $api.get(`/color/${restaurant_id}`);
        const data = res.data;
        if (Array.isArray(data)) {
          setColors(data);
        } else if (data) {
          setColors([data]);
        } else {
          setColors([]);
        }
      } catch (err) {
        setColors([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Delete modal ochish
  const handleDelete = (item) => {
    setDeleteColor(item);
    setDeleteOpen(true);
  };

  // Delete muvaffaqiyatli bo‘lsa yangilash
  const handleDeleteSuccess = async () => {
    setDeleteOpen(false);
    setDeleteColor(null);
    if (restaurant_id) {
      setLoading(true);
      try {
        const res = await $api.get(`/color/${restaurant_id}`);
        const data = res.data;
        if (Array.isArray(data)) {
          setColors(data);
        } else if (data) {
          setColors([data]);
        } else {
          setColors([]);
        }
      } catch (err) {
        setColors([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreate = () => {
    setCreateOpen(true);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-2">Yuklanmoqda...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Ranglar</h2>
        {(!Array.isArray(colors) || colors.length === 0) && (
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Yaratish
          </button>
        )}
      </div>

      {Array.isArray(colors) && colors.length > 0 ? (
        <div className="flex justify-center w-full">
          <div
            className="relative border-[3px] rounded-[32px] shadow bg-white flex flex-col w-full max-w-3xl min-w-[400px] p-6"
            style={{
              borderColor: colors[0].border_color || "#A79684",
              color: colors[0].text_color || "#FFFFFF",
            }}
          >
            <div
              className="w-full py-2 rounded-t-[16px] h-[44px] text-center"
              style={{
                backgroundColor: colors[0].border_color || "#A79684",
              }}
            >
              {colors[0]?.new === true && <span>Янгилик</span>}
            </div>
            <div className="w-full h-64 bg-gray-200 rounded-b-[16px] flex items-center justify-center">
              {colors[0].border_color && (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: colors[0].border_color }}
                ></div>
              )}
            </div>
            <div className="w-full pt-6">
              <h2
                className="text-[36px] font-extrabold text-center"
                style={{ color: colors[0].text_color || "#000000" }}
              >
                {colors[0].text_color}
              </h2>
              <div
                className="w-[90%] h-[5px] mx-auto my-6 rounded-3xl"
                style={{
                  backgroundColor: colors[0].border_color || "#A79684",
                }}
              ></div>
              <h2
                className="text-[36px] font-extrabold text-center mb-6"
                style={{ color: colors[0].text_color || "#000000" }}
              >
                {colors[0].border_color}
              </h2>
            </div>
            {/* Edit va Delete icon tugmalari */}
            <div className="absolute top-4 right-4 flex gap-3 z-10">
              <button
                onClick={() => handleEdit(colors[0])}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-3 rounded-full transition"
                title="Edit"
              >
                <PencilSquareIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDelete(colors[0])}
                className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-full transition"
                title="Delete"
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Hech qanday rang topilmadi</p>
         
        </div>
      )}

      {/* Edit modalini chaqirish */}
      {editOpen && editColor && (
        <ColorEdit
          open={editOpen}
          onClose={() => {
            setEditOpen(false);
            setEditColor(null);
          }}
          colorId={editColor.id}
          initialTextColor={editColor.text_color}
          initialBorderColor={editColor.border_color}
          onSuccess={handleEditSuccess}
        />
      )}

      {/* Delete modalini chaqirish */}
      {deleteOpen && deleteColor && (
        <ColorDelete
          open={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
            setDeleteColor(null);
          }}
          colorId={deleteColor.id}
          onSuccess={handleDeleteSuccess}
        />
      )}

      {/* Create modalini chaqirish */}
      {createOpen && (
        <ColorCreate
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}