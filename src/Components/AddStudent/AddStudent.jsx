import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import upload from '../../assets/upload_area.png';
import './AddStudent.css'

const firebaseConfig = {
    apiKey: "AIzaSyBIgWKE904al1DGYARgfxFjrmzwBjRlT3I",
    authDomain: "hostel-34e6a.firebaseapp.com",
    projectId: "hostel-34e6a",
    storageBucket: "hostel-34e6a.firebasestorage.app",
    messagingSenderId: "307307582358",
    appId: "1:307307582358:web:8a71a413663933bd38c3b7",
    measurementId: "G-8N9VEWS14W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: "",
        branch: "",
        registrationNo: "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image" && files?.[0]) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file)); // Generate a temporary preview URL
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, branch, registrationNo, image } = formData;

        if (!name || !branch || !registrationNo || !image) {
            alert("All fields are required!");
            return;
        }

        setLoading(true);

        try {
            // Upload image to Firebase Storage
            const fileExtension = image.name.split(".").pop();
            const storageRef = ref(storage, `students/${registrationNo}.${fileExtension}`);
            await uploadBytes(storageRef, image);
            const imageUrl = await getDownloadURL(storageRef);

            // Save data to Firestore
            await setDoc(doc(db, "students", registrationNo), {
                name,
                branch,
                registration_no: registrationNo,
                imageUrl,
            });

            alert("Student added successfully!");
            setFormData({ name: "", branch: "", registrationNo: "", image: null });
            setImagePreview(null); // Clear preview after successful upload
        } catch (error) {
            console.error("Error uploading student details:", error);
            alert("Failed to add student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="specific-page">
            <h1>Add Student Details.</h1>
            <form onSubmit={handleSubmit}>
                <p>Upload Image :</p>
                <label htmlFor="image">
                    <img
                        className='image'
                        src={imagePreview || upload} // Show preview if available, otherwise default image
                        alt="Uploaded Preview"
                        width='150px'
                    />
                </label>
                <input
                    onChange={handleChange}
                    type="file"
                    accept="image/*"
                    name="image"
                    id="image"
                    hidden
                    required
                />
                <div>
                    <p>Name of Student :</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <p>Branch :</p>
                    <input
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        value={formData.branch}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <p>Registration Number :</p>
                    <input
                        type="text"
                        name="registrationNo"
                        placeholder="Registration No"
                        value={formData.registrationNo}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Uploading..." : "Add Student"}
                </button>
            </form>
        </div>
    );
};

export default AddStudent;
