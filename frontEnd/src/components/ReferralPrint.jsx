import React, { forwardRef } from "react";
import "./ReferralForm.css";
import logo from "./logo.png";

const ReferralForm = forwardRef(({ patient, referral }, ref) => {
    const currentDate = new Date().toLocaleDateString();
    console.log("101010 patient", patient);
    console.log("101010 referral", referral);

    return (
        <div ref={ref} className="referralForm">
            {/* Logo and Header */}
            <div className="headerReferral">
                <img
                    src={logo} // Replace with your logo path
                    alt="Clinic Logo"
                    className="clinic-logo"
                />
                <h1>KOTEBE UNIVERSITY OF EDUCATION</h1>
                <h2>MEDIUM CLINIC REFERRAL FORM</h2>
            </div>

            {/* Card Details */}
            <div className="card-details">
                <p>
                    <strong>Card No:</strong> {patient.cardNumber || "________"}
                </p>
                <p>
                    <strong>Referral No:</strong> {referral.referralNo || "________"}
                </p>
                <p>
                    <strong>Referral Date:</strong> {referral.createdAt || "________"}
                </p>
            </div>

            {/* Referral Information */}
            <div className="form-content">
                <p>
                    <span>
                        <strong>Referred To:</strong> {referral.referredTo || "________"}{" "}
                    </span>
                    <span>
                        <strong>Department:</strong> {referral.department || "________"}
                    </span>
                </p>
                <p>
                    <strong>Referred by:</strong> Kotebe University Of Education Medium Clinic
                </p>
                <p className="inline-data">
                    <span>
                        <strong>Name Of Patient:</strong> {patient.name || "________"}
                    </span>
                    <span>
                        <strong>Age:</strong> {patient.age || "________"}
                    </span>
                    <span>
                        <strong>Gender:</strong> {patient.gender || "________"}
                    </span>
                </p>
                <p>
                    <strong>ID No:</strong> {patient.studentId || "________"}
                </p>
                <p>
                    <strong>Health Problem:</strong> {referral.healthProblem || "________"}
                </p>
                <p className="inline-data">
                    <span>
                        <strong>B/P:</strong> {referral.vitals.bloodPressure || "________"}
                    </span>
                    <span>
                        <strong>P/R:</strong> {referral.vitals.pulseRate || "________"}
                    </span>
                    <span>
                        <strong>T/O:</strong> {referral.vitals.temperature || "________"}
                    </span>
                    <span>
                        <strong>R/R:</strong> {referral.vitals.respiratoryRate || "________"}
                    </span>
                </p>
                <p>
                    <strong>Tentative Diagnosis:</strong> {referral.tentativeDiagnosis || "________"}
                </p>
                <p>
                    <strong>Investigation for Result:</strong>{" "}
                    {referral.investigationResult || "________"}
                </p>
                <p>
                    <strong>Action Taken (Treatment Given):</strong>{" "}
                    {referral.actionTaken || "________"}
                </p>
                <p>
                    <strong>Reason for Referral:</strong> {referral.reasonForReferral || "________"}
                </p>
            </div>

            {/* Footer */}
            <div className="footer">
                <p>
                    <strong>Name & Signature:</strong> ________________{" "}
                    <strong>Date:</strong> {currentDate}
                </p>
                <p>Thanks For Accepted</p>
            </div>
        </div>
    );
});

export default ReferralForm;
