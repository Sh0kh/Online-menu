import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Switch,
} from "@material-tailwind/react";
import { $api } from "../../../../../../utils";
import { Alert } from "../../../../../../utils/Alert";
import { useParams } from "react-router-dom";

export default function ExamPartCreate() {
    const { sectionID } = useParams(); // exam_section_id
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        exam_section_id: sectionID,
        name: "",
        description: "",
        duration: "",
        total_questions: "",
        status: true,
        type: "",
        video_frame: "",
        audio: null,
        order: ''
    });

    const [previewAudio, setPreviewAudio] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, audio: file }));
            setPreviewAudio(URL.createObjectURL(file));
        }
    };

    const removeAudio = () => {
        setFormData((prev) => ({ ...prev, audio: null }));
        setPreviewAudio(null);
    };

    const handleCreate = async () => {
        try {
            const data = new FormData();
            for (const key in formData) {
                data.append(key, formData[key]);
            }
            await $api.post("/study-center/parts", data);
            Alert("Part muvaffaqiyatli qo‘shildi", "success");
            handleOpen();
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "Noma'lum xatolik";
            Alert(`Xatolik: ${errorMessage}`, "error");
        }
    };

    return (
        <>
            <Button color="blue" onClick={handleOpen}>
                Create Part
            </Button>
            <Dialog open={open} handler={handleOpen} size="xl">
                <DialogHeader>Create Exam Part</DialogHeader>
                <DialogBody className="max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        <Input
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <Textarea
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        <Input
                            label="Duration (e.g. 20:00)"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                        <Input
                            label="Total Questions"
                            name="total_questions"
                            type="number"
                            value={formData.total_questions}
                            onChange={handleChange}
                        />
                        <Input
                            label="Tartib raqami"
                            name="order"
                            type="number"
                            value={formData.order}
                            onChange={handleChange}
                        />
                        <Input
                            label="Type (e.g. reading)"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                        />
                        <Input
                            label="Video Frame (YouTube embed URL)"
                            name="video_frame"
                            value={formData.video_frame}
                            onChange={handleChange}
                        />
                        <div className="flex items-center gap-4">
                            <span>Status:</span>
                            <Switch
                                checked={formData.status}
                                onChange={() =>
                                    setFormData((prev) => ({ ...prev, status: !prev.status }))
                                }
                            />
                            <span>{formData.status ? "Active" : "Inactive"}</span>
                        </div>

                        {/* Audio Upload */}
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                accept="audio/*"
                                id="audio-upload"
                                hidden
                                onChange={handleAudioChange}
                            />
                            <label htmlFor="audio-upload">
                                <Button variant="outlined" color="blue" fullWidth>
                                    Upload Audio
                                </Button>
                            </label>
                            {previewAudio && (
                                <>
                                    <audio controls className="w-full">
                                        <source src={previewAudio} />
                                    </audio>
                                    <Button
                                        size="sm"
                                        color="red"
                                        onClick={removeAudio}
                                        className="mt-2"
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
