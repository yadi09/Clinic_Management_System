import React, { forwardRef } from "react";
import "./PrescriptionForm.css"; // Separate CSS file for styling
import logo from "./logo.png"; // Replace with the actual path to the logo

const PrescriptionForm = forwardRef(({ patient, prescription }, ref) => {
    const currentDate = new Date().toLocaleDateString(); // Format date as needed

    return (
        <div className="p-form half-page" ref={ref}>
            {/* Header Section */}
            <div className="p-header">
                <img
                    src={logo} // Replace with the actual path to the logo
                    alt="Clinic Logo"
                    className="p-logo"
                />
                <h2>KOTEBE UNIVERSITY OF EDUCATION</h2>
                <h3>MEDIUM CLINIC PRESCRIPTION FORM</h3>
            </div>

            {/* Date */}
            <div className="p-date">
                <p>Date: {currentDate}</p>
            </div>

            {/* Patient Type */}
            <div className="patient_Type">
                <p>
                    <label>
                        <input
                            type="checkbox"
                            checked={prescription.forWho === "student"}
                            readOnly
                        />
                        Student
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={prescription.forWho === "staff"}
                            readOnly
                        />
                        Staff
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={prescription.forWho === "other"}
                            readOnly
                        />
                        Other
                    </label>
                </p>
            </div>

            {/* Patient Information */}
            <div className="patient_Info">
                <p>
                    <strong>Name:</strong> {patient.name || "__________"} &nbsp;
                    <strong>Age:</strong> {patient.age || "__________"} &nbsp;
                    <strong>Gender:</strong> {patient.gender || "__________"}
                </p>
                <p>
                    <strong>ID No:</strong> {patient.studentId || "__________"} &nbsp;
                    <strong>Card:</strong> {patient.cardNumber || "__________"}
                </p>
            </div>

            {/* Prescription */}
            <div className="prescription">
                <p>
                    <strong>RX:</strong> {prescription.RX || "________"}
                </p>
                {/* <p>
                    <strong>RX:</strong>
                </p>
                <textarea
                    value={prescription.RX || ""}
                    readOnly
                    className="rx-textarea"
                /> */}
            </div>

            {/* Footer */}
            <div className="P-footer">
                <p>PRESCRIBER'S/MD/HO/RN __________________</p>
            </div>
        </div>
    );
});

export default PrescriptionForm;
