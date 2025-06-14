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
  
  // localStorage dan restaurant_id ni olish
  const [restaurantId, setRestaurantId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("restaurant_id1");
    setRestaurantId(id);
  }, []);

  const fetchColors = async () => {
    if (!restaurantId) return;
    
    setLoading(true);
    try {
      const res = await $api.get(`/color/${restaurantId}`);
      const data = res.data;
      if (Array.isArray(data)) {
        setColors(data);
      } else if (data) {
        setColors([data]);
      } else {
        setColors([]);
      }
    } catch (err) {
      console.error("Ranglarni yuklashda xatolik:", err);
      setColors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchColors();
    }
  }, [restaurantId]);

  const handleEdit = (item) => {
    setEditColor(item);
    setEditOpen(true);
  };

  const handleEditSuccess = async () => {
    setEditOpen(false);
    setEditColor(null);
    await fetchColors();
  };

  const handleDelete = (item) => {
    setDeleteColor(item);
    setDeleteOpen(true);
  };

  const handleDeleteSuccess = async () => {
    setDeleteOpen(false);
    setDeleteColor(null);
    await fetchColors();
  };

  const handleCreate = () => {
    setCreateOpen(true);
  };

  const handleCreateSuccess = async () => {
    setCreateOpen(false);
    await fetchColors();
  };

  if (!restaurantId) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center py-10">
          <p className="text-red-500">Restaurant ID topilmadi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Ranglar</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Yangi rang
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-2">Yuklanmoqda...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left">Nomi</th>
                <th className="py-3 px-4 text-left">Text Color</th>
                <th className="py-3 px-4 text-left">Border Color</th>
                <th className="py-3 px-4 text-center">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {colors.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Hech qanday rang topilmadi
                  </td>
                </tr>
              ) : (
                colors.map((color) => (
                  <tr key={color.id} className="border-t">
                    <td className="py-3 px-4 font-medium">{color.name}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-6 h-6 rounded border"
                          style={{ 
                            backgroundColor: color.text_color, 
                            borderColor: "#ccc" 
                          }}
                        ></span>
                        <span className="font-mono">{color.text_color}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-6 h-6 rounded border"
                          style={{ 
                            backgroundColor: color.border_color, 
                            borderColor: "#ccc" 
                          }}
                        ></span>
                        <span className="font-mono">{color.border_color}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleEdit(color)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Edit"
                      >
                        <PencilSquareIcon className="w-5 h-5 inline-block" />
                      </button>
                      <button
                        onClick={() => handleDelete(color)}
                        className="text-red-600 hover:text-red-800 ml-4"
                        title="Delete"
                      >
                        <TrashIcon className="w-5 h-5 inline-block" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
          onSuccess={handleCreateSuccess}
        />
      )}
    </div>
  );
}