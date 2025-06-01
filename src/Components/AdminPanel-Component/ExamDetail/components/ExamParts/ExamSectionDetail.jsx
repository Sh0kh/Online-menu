import { useParams } from "react-router-dom"
import { $api } from "../../../../../utils"
import { useEffect, useState } from "react"
import { Card, Typography } from "@material-tailwind/react"
import Loading from "../../../../UI/Loadings/Loading"
import ExamPartCreate from "./components/ExamPartCreate"

export default function ExamSectionDetail() {
    const { sectionID } = useParams()
    const [sectionData, setSectionData] = useState([])
    const [loading, setLoading] = useState(true)

    const getSectionById = async () => {
        setLoading(true)
        try {
            const response = await $api.get(`/study-center/sections/${sectionID}`)
            setSectionData(response?.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSectionById()
    }, [sectionID])


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <div className="p-4">
                <Card className="p-[20px] mb-[30px]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-[22px]">
                            {sectionData?.exam?.name} - {sectionData?.name}
                        </h2>
                        <ExamPartCreate />
                    </div>
                </Card>

            </div>
        </>
    )
}