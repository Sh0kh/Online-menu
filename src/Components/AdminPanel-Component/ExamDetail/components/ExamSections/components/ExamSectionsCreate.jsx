import React, { useState, useRef } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { $api } from "../../../../../../utils";
import { Alert } from "../../../../../../utils/Alert";
import { useParams } from "react-router-dom";

export default function ExamSectionsCreate() {
  const { examID } = useParams();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    exam_id: examID,
    name: "",
    type: "",
    duration: "",
    description: "",
    video_frame: null,
    audio: null,
  });
  const [preview, setPreview] = useState({
    video_frame: null,
    audio: null,
  });

  // Создаем refs для файловых инпутов
  const videoInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleOpen = () => setOpen(!open);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, [name]: file }));
      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const removeFile = (field) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
    setPreview((prev) => ({ ...prev, [field]: null }));
    
    // Очищаем значение инпута
    if (field === 'video_frame' && videoInputRef.current) {
      videoInputRef.current.value = '';
    }
    if (field === 'audio' && audioInputRef.current) {
      audioInputRef.current.value = '';
    }
  };

  // Функции для программного клика по инпутам
  const handleVideoUpload = () => {
    videoInputRef.current?.click();
  };

  const handleAudioUpload = () => {
    audioInputRef.current?.click();
  };

  const handleCreate = async () => {
    try {
      const data = new FormData();
      
      // Добавляем текстовые поля
      data.append('exam_id', formData.exam_id);
      data.append('name', formData.name);
      data.append('type', formData.type);
      data.append('duration', formData.duration);
      data.append('description', formData.description);
      
      // Добавляем файлы
      if (formData.video_frame) {
        data.append('video_frame', formData.video_frame);
      }
      if (formData.audio) {
        data.append('audio', formData.audio);
      }

      await $api.post(`/study-center/sections`, data);
      Alert("Muvaffaqiyatli qo'shildi", "success");
      handleOpen();
      
      // Сбрасываем форму
      setFormData({
        exam_id: examID,
        name: "",
        type: "",
        duration: "",
        description: "",
        video_frame: null,
        audio: null,
      });
      setPreview({
        video_frame: null,
        audio: null,
      });
      
    } catch (error) {
      console.error('Ошибка при отправке:', error);
      const errorMessage = error?.response?.data?.message || error.message || "Noma'lum xatolik";
      Alert(`Xatolik: ${errorMessage}`, "error");
    }
  };

  return (
    <>
      <Button onClick={handleOpen} color="blue">
        Create Section
      </Button>

      <Dialog open={open} handler={handleOpen} size="xl">
        <DialogHeader>Create Exam Section</DialogHeader>
        <DialogBody className="max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
            <Input
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
            />
            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            {/* Video Upload */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="video/*"
                name="video_frame"
                ref={videoInputRef}
                hidden
                onChange={handleFileChange}
              />
              <Button 
                variant="outlined" 
                color="blue" 
                fullWidth
                onClick={handleVideoUpload}
              >
                Upload Video
              </Button>
              {preview.video_frame && (
                <>
                  <video controls className="w-full rounded">
                    <source src={preview.video_frame} />
                  </video>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => removeFile("video_frame")}
                  >
                    Remove Video
                  </Button>
                </>
              )}
            </div>

            {/* Audio Upload */}
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="audio/*"
                name="audio"
                ref={audioInputRef}
                hidden
                onChange={handleFileChange}
              />
              <Button 
                variant="outlined" 
                color="blue" 
                fullWidth
                onClick={handleAudioUpload}
              >
                Upload Audio
              </Button>
              {preview.audio && (
                <>
                  <audio controls className="w-full">
                    <source src={preview.audio} />
                  </audio>
                  <Button
                    size="sm"
                    color="red"
                    onClick={() => removeFile("audio")}
                  >
                    Remove Audio
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen}>
            Cancel
          </Button>
          <Button color="green" onClick={handleCreate}>
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}