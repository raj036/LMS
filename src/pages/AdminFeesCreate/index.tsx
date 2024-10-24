import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Topbar from "components/Topbar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "hooks/useAuthContext";
import axios from "helper/axios";
import { ArrowLeft } from "lucide-react"; // Add the arrow icon
import { useNavigate } from "react-router-dom"; // Add this for navigation

const FessCreate = () => {
    const { user }: any = useAuthContext();
    const [isDialogue, setIsDialogue] = useState(false);
    const [years, setYears] = useState<number>(0);
    const [formData, setFormData] = useState({
        course_id: "",
        standard_id: "",
        subject_id: "",
        module_id: "",
        batch_id: "",
        amount: "",
        year: years,
    });
    const [courses, setCourses] = useState([]);
    const [standards, setStandards] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [modules, setModules] = useState([]);
    const [batchData, setBatchData] = useState([]);
    const [feeData, setFeeData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Batch, setBatch] = useState({ size: '' });
    const navigate = useNavigate(); // Use the useNavigate hook

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`api/courses_all/`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setCourses(response.data.course_list);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, [user.token]);

    const handleInputChange = (field: any, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        if (field === 'course_id') {
            handleCourseChange(value);
        } else if (field === 'standard_id') {
            handleStandardChange(value);
        } else if (field === 'subject_id') {
            handleSubjectChange(value);
        }
    };

    const handleCourseChange = (courseId) => {
        const selectedCourse = courses.find((c) => c.course_id.toString() === courseId);
        if (selectedCourse) {
            setStandards(selectedCourse.standards || []);
            setSubjects([]);
            setModules([]);
        }
    };

    const handleStandardChange = (standardId) => {
        const selectedStandard = standards.find((s) => s.standard_id.toString() === standardId);
        if (selectedStandard) {
            setSubjects(selectedStandard.subjects || []);
            setModules([]);
        }
    };

    const handleSubjectChange = (subjectId) => {
        const selectedSubject = subjects.find((s) => s.subject_id.toString() === subjectId);
        if (selectedSubject) {
            setModules(selectedSubject.modules || []);
        }
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`/api/batches/`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setBatchData(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, [user.token]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post("/api/fees/create_fees/", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            });

            Swal.fire({
                icon: "success",
                title: `Fee Created Successfully`,
                customClass: {
                    icon: "swal-my-icon",
                },
                showConfirmButton: false,
                timer: 1500,
            });
            setIsDialogue(false);
            setFormData({
                course_id: "",
                standard_id: "",
                subject_id: "",
                module_id: "",
                batch_id: "",
                amount: "",
                year: years,
            });
            fetchFees();
        } catch (error) {
            console.error("Error creating fee:", error);
            Swal.fire({
                icon: "error",
                title: "Error creating fee.",
                customClass: {
                    icon: "swal-my-icon",
                },
                text: error?.response?.data?.message || "Please try again later.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const fetchFees = async () => {
        try {
            const response = await axios.get(`/api/fees/all_fees/`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setFeeData(response.data);
        } catch (error) {
            console.error("Error fetching fees:", error);
        }
    };

    useEffect(() => {
        fetchFees();
    }, [user.token]);

    const handleBackClick = () => {
        navigate(-1);
    };

    const handleSubmit1 = async (e: any) => {
        e.preventDefault();
        try {
            await axios.post('/api/batches/', Batch, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'Batch Created Successfully',
                showConfirmButton: false,
                timer: 1500,
            });
            setIsModalOpen(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to Create Batch',
                text: 'Something went wrong!',
            });
        }
    };

    const handleChange1 = (fieldName: string, value: any) => {
        setBatch((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    return (
        <>
            <Topbar heading={"Fees"} />
            <div className="container py-5">
                <button
                    onClick={handleBackClick}
                    className="flex items-center space-x-2 text-teal-900 hover:text-blue-900"
                >
                    <ArrowLeft className="w-6 h-6" />
                    <span>Back</span>
                </button>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                        <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
                            <h2 className="text-lg font-bold mb-4">Create Batch</h2>
                            <form onSubmit={handleSubmit1}>
                                <div className="mb-4">
                                    <Label htmlFor="batch_size">Batch Size</Label>
                                    <Input
                                        id="batch_size"
                                        type="text"
                                        value={Batch.size}
                                        onChange={(e) => handleChange1("size", e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <Button type="submit" className="bg-teal-900 hover:!bg-blue-900">
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={() => setIsModalOpen(false)}
                                        className="ml-4 bg-red-600 hover:bg-red-700"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-teal-900 hover:!bg-blue-900 text-white  py-2 px-4 rounded-lg transition duration-300 text-white-A700 mt-4"
                >
                    Create Batch
                </button>
                <Dialog open={isDialogue} onOpenChange={setIsDialogue}>
                    <div className="flex justify-end my-4">
                        <DialogTrigger asChild>
                            <Button className="bg-teal-900 hover:!bg-blue-900 mb-4">
                                Create Fees
                            </Button>
                        </DialogTrigger>
                    </div>
                    <DialogContent className="overflow-scroll">
                        <DialogHeader>Add fees here</DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="course_id" className="text-right">
                                    Course
                                </Label>
                                <select
                                    id="course_id"
                                    className="col-span-3"
                                    value={formData.course_id}
                                    onChange={(e) => handleInputChange("course_id", e.target.value)}
                                    required
                                >
                                    <option value="">Select course...</option>
                                    {courses.map((course) => (
                                        <option key={course.course_id} value={course.course_id}>
                                            {course.course_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="standard_id" className="text-right">
                                    Standard
                                </Label>
                                <select
                                    id="standard_id"
                                    className="col-span-3"
                                    value={formData.standard_id}
                                    onChange={(e) => handleInputChange("standard_id", e.target.value)}
                                    required
                                >
                                    <option value="">Select standard...</option>
                                    {standards.map((standard) => (
                                        <option key={standard.standard_id} value={standard.standard_id}>
                                            {standard.standard_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="subject_id" className="text-right">
                                    Subject
                                </Label>
                                <select
                                    id="subject_id"
                                    className="col-span-3"
                                    value={formData.subject_id}
                                    onChange={(e) => handleInputChange("subject_id", e.target.value)}
                                    required
                                >
                                    <option value="">Select subject...</option>
                                    {subjects.map((subject) => (
                                        <option key={subject.subject_id} value={subject.subject_id}>
                                            {subject.subject_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="module_id" className="text-right">
                                    Module
                                </Label>
                                <select
                                    id="module_id"
                                    className="col-span-3"
                                    value={formData.module_id}
                                    onChange={(e) => handleInputChange("module_id", e.target.value)}
                                    required
                                >
                                    <option value="">Select module...</option>
                                    {modules.map((module) => (
                                        <option key={module.module_id} value={module.module_id}>
                                            {module.module_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="batch_id" className="text-right">
                                    Batch
                                </Label>
                                <select
                                    id="batch_id"
                                    className="col-span-3"
                                    value={formData.batch_id}
                                    onChange={(e) => handleInputChange("batch_id", e.target.value)}
                                    required
                                >
                                    <option value="">Select batch...</option>
                                    {batchData.map((batch) => (
                                        <option key={batch.id} value={batch.id}>
                                            {batch.size}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="year" className="text-right">
                                    Year
                                </Label>
                                <Input
                                    id="year"
                                    type="number"
                                    className="col-span-3"
                                    value={formData.year}
                                    onChange={(e) => handleInputChange("year", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amount" className="text-right">
                                    Amount
                                </Label>
                                <Input
                                    type="number"
                                    id="amount"
                                    className="col-span-3"
                                    value={formData.amount}
                                    onChange={(e) => handleInputChange("amount", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogFooter />
                </Dialog>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course</TableHead>
                            <TableHead>Standard</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Module</TableHead>
                            <TableHead>Batch</TableHead>
                            <TableHead>year</TableHead>
                            <TableHead>Amount</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feeData.map((fee) => (
                            <TableRow key={fee.fee_id}>
                                <TableCell>{fee.course_name}</TableCell>
                                <TableCell>{fee.standard_name}</TableCell>
                                <TableCell>{fee.subject_name}</TableCell>
                                <TableCell>{fee.module_name}</TableCell>
                                <TableCell>{fee.batch_name}</TableCell>
                                <TableCell>{fee.year}</TableCell>
                                <TableCell>{fee.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default FessCreate;