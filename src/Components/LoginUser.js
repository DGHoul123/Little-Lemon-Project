import React, { useState, useEffect, useCallback } from "react";
// Import your CSS file here if you put the styles in a separate .css file
// import './Components.css'; 

function LoginUser() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState(null); // For custom message

    // State for validation errors
    const [errors, setErrors] = useState({});
    // State for overall form validity
    const [isFormValid, setIsFormValid] = useState(false);

    // Validation functions: Now returns the error string, doesn't set state directly
    const validateField = useCallback((fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'name':
                if (!value.trim()) {
                    error = 'Name is required.';
                } else if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters.';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    error = 'Name can only contain letters and spaces.';
                }
                break;
            case 'phone':
                if (!value.trim()) {
                    error = 'Phone number is required.';
                } else if (!/^\d{10,15}$/.test(value)) { // Basic 10-15 digit phone number
                    error = 'Please enter a valid phone number (10-15 digits).';
                }
                break;
            case 'email':
                if (!value.trim()) {
                    error = 'Email is required.';
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = 'Please enter a valid email address.';
                }
                break;
            case 'password':
                if (!value.trim()) {
                    error = 'Password is required.';
                } else if (value.length < 8) {
                    error = 'Password must be at least 8 characters.';
                }
                // Add more complex password rules if needed, e.g., regex for special chars, numbers
                break;
            default:
                break;
        }
        return error; // Return the error string
    }, []);

    // Effect to validate form and update overall validity (without showing errors initially)
    useEffect(() => {
        // This effect calculates overall validity but doesn't set visible errors on mount
        const nameError = validateField('name', name);
        const phoneError = validateField('phone', phone);
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);

        const allFieldsAreValid = !nameError && !phoneError && !emailError && !passwordError;
        setIsFormValid(allFieldsAreValid);
    }, [name, phone, email, password, validateField]); // Re-run validation when any field changes

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    // Update handlers now also trigger field-specific validation and set errors
    const updateName = (e) => {
        const newValue = e.target.value;
        setName(newValue);
        setErrors(prevErrors => ({ ...prevErrors, name: validateField('name', newValue) }));
    };
    const updatePhone = (e) => {
        const newValue = e.target.value;
        setPhone(newValue);
        setErrors(prevErrors => ({ ...prevErrors, phone: validateField('phone', newValue) }));
    };
    const updateEmail = (e) => {
        const newValue = e.target.value;
        setEmail(newValue);
        setErrors(prevErrors => ({ ...prevErrors, email: validateField('email', newValue) }));
    };
    const updatePassword = (e) => {
        const newValue = e.target.value;
        setPassword(newValue);
        setErrors(prevErrors => ({ ...prevErrors, password: validateField('password', newValue) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Re-validate all fields on submit to catch any un-blurred errors and display them
        const nameError = validateField('name', name);
        const phoneError = validateField('phone', phone);
        const emailError = validateField('email', email);
        const passwordError = validateField('password', password);

        // Set all errors at once
        setErrors({
            name: nameError,
            phone: phoneError,
            email: emailError,
            password: passwordError,
        });

        // Check overall validity based on the errors
        const formIsValidOnSubmit = !nameError && !phoneError && !emailError && !passwordError;

        if (formIsValidOnSubmit) {
            console.log("Login form submitted:", { name, phone, email, password });
            setSubmissionMessage({ type: 'success', text: 'Form submitted successfully!' });
            setName("");
            setPhone("");
            setEmail("");
            setPassword("");
            setShowPassword(false);
            setErrors({}); // Clear errors on successful submit
        } else {
            setSubmissionMessage({ type: 'error', text: 'Please correct the errors in the form.' });
        }
    };

    return (
        <>
            {/* CSS Styles for the LoginUser Component */}
            

            <div className="login-page-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <h2 className="login-form-title">Welcome Back!</h2>

                    {/* Submission Message Display (Custom Modal) */}
                    {submissionMessage && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h3>{submissionMessage.type === 'success' ? 'Success!' : 'Error!'}</h3>
                                <p>{submissionMessage.text}</p>
                                <button onClick={() => setSubmissionMessage(null)}>Close</button>
                            </div>
                        </div>
                    )}

                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter full name..."
                            value={name}
                            onChange={updateName}
                            className={`form-input ${errors.name ? 'input-error' : ''}`}
                            required
                        />
                        {errors.name && <p className="error-message">{errors.name}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="form-group">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Enter your local number..."
                            value={phone}
                            onChange={updatePhone}
                            className={`form-input ${errors.phone ? 'input-error' : ''}`}
                            required
                        />
                        {errors.phone && <p className="error-message">{errors.phone}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={updateEmail}
                            placeholder="Enter your email..."
                            type="email"
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                            required
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div className="form-group password-group">
                        <label htmlFor="password-input" className="form-label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={updatePassword}
                            placeholder="Password here..."
                            id="password-input"
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            required
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="show-password-checkbox"
                                checked={showPassword}
                                onChange={togglePasswordVisibility}
                                className="checkbox-input"
                            />
                            <label htmlFor="show-password-checkbox" className="checkbox-label">
                                Show Password
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!isFormValid} // Disable if form is not valid
                    >
                        Log In
                    </button>

                    {/* Optional: Forgot Password / Sign Up Link */}
                    <p className="signup-text">
                        Don't have an account?{" "}
                        <a href="/signup" className="signup-link">
                            Sign Up
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
}

export default LoginUser;
