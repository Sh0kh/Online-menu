import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Avatar,
} from "@material-tailwind/react";
import AvatarLogo from '../../Images/FotoPerson.jpg';
import { Button } from "@mui/material";

export default function UserProfile() {
    return (
        <div className="min-h-screen p-6">
            <Card className="w-full max-w-sm shadow-md border border-blue-200 bg-white flex flex-col justify-between">
                <CardHeader floated={false} className="flex justify-center bg-white py-6">
                    <Avatar
                        size="xxl"
                        alt="user avatar"
                        src={AvatarLogo}
                        className="ring-4 ring-blue-500"
                    />
                </CardHeader>
                <CardBody className="text-center flex flex-col flex-grow justify-between">
                    <div>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Иван Иванов
                        </Typography>
                        <Typography color="blue" className="text-sm font-medium">
                            +998 97 020 68 68
                        </Typography>
                    </div>
                    <div className="mt-6">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#1976D2', // синий цвет (Tailwind: blue-700)
                                color: 'white',
                                borderRadius: '8px',
                                textTransform: 'none',
                            }}
                            fullWidth
                        >
                            Ma'lumotlarni o'zgartirish
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
