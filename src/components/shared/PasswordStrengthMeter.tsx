import React from 'react';
import zxcvbn from 'zxcvbn';
import './PasswordStrengthMeter.css';

export const PasswordStrengthMeter = ({ password, strength, testedResult }: any) => {
    return (
        <div className="password-strength-meter">
            <progress
                className={`password-strength-meter-progress strength-${strength}`}
                value={testedResult.score}
                max="4"
            />
            <br />
            <label className="password-strength-meter-label">
                {password && (
                    <>
                        <strong>Password strength:</strong> {strength}
                    </>
                )}
            </label>
        </div>
    );
};