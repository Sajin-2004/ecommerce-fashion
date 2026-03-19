import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const ExcelUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.name.split('.').pop().toLowerCase();
            if (fileType === 'xlsx' || fileType === 'csv') {
                setFile(selectedFile);
                setError("");
            } else {
                setFile(null);
                setError("Only .xlsx and .csv files are allowed.");
            }
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file first.");
            return;
        }

        setUploading(true);
        setMessage("");
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.post(`${API_BASE_URL}/api/admin/upload-products`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage(`Success: ${res.data.count} products added!`);
            setFile(null);
            // Reset input
            document.getElementById("excel-upload-input").value = "";
            if (onUploadSuccess) onUploadSuccess();
        } catch (err) {
            console.error("Upload failed", err);
            setError(err.response?.data?.message || "Upload failed. Please check the file format.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="admin-stats-card" style={{ marginBottom: "30px" }}>
            <h3>Bulk Product Upload</h3>
            <p>Upload an .xlsx or .csv file to add products in bulk.</p>

            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "15px", flexWrap: "wrap" }}>
                <input
                    id="excel-upload-input"
                    type="file"
                    accept=".xlsx, .csv"
                    onChange={handleFileChange}
                    style={{
                        padding: "10px",
                        border: "1px dashed #ccc",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                />
                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="admin-pill-btn"
                    style={{
                        opacity: (!file || uploading) ? 0.6 : 1,
                        cursor: (!file || uploading) ? "not-allowed" : "pointer"
                    }}
                >
                    {uploading ? "Uploading..." : "Upload Products"}
                </button>
            </div>

            {message && <p style={{ color: "#388e3c", marginTop: "15px", fontWeight: "600" }}>{message}</p>}
            {error && <p style={{ color: "#d32f2f", marginTop: "15px", fontWeight: "600" }}>{error}</p>}

            <div style={{ marginTop: "15px", fontSize: "12px", color: "#666" }}>
                <strong>Required Columns:</strong> name, brand, category, subcategory, price, originalPrice, description, image, stock, rating
            </div>

        </div>
    );
};

export default ExcelUpload;
