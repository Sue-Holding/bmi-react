import React, { useState} from "react";

const BMIForm: React.FC = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [sex, setSex] = useState<'male' | 'female'>('male');
    const [bmi, setBmi] = useState<number | null>(null);
    const [bmr, setBmr] = useState<number | null>(null);

    const calculateBMI = () => {
        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseInt(age);

        if (!isNaN(w) && !isNaN(h) && !isNaN(a) && h > 0 && w > 0 && a > 0) {
            // work out bmi
            const bmiValue = w / ((h / 100 ) * (h / 100));
            setBmi(bmiValue);

            // work out BRM with mifflin-st jeor math
            let bmrValue: number;
            if (sex === 'male') {
                bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
            } else {
                bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
            }
            setBmr(bmrValue);
        } else {
            alert('Please enter valid numbers');
            setBmi(null);
            setBmr(null);
        }
    };

    const getBMICategory = () => {
        if (!bmi) return '';
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal Weight';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    };

    return (
        <div>
            {/* div to get weight */}
            <div>
                <label>Weight (kg): </label>
                <input value={weight} onChange={(e) => setWeight(e.target.value)
                }/>
            </div>

                {/* to get height */}
            <div>
                <label>Height (cm): </label>
                <input value={height} onChange={(e) => setHeight(e.target.value)
                }/>
            </div>

                {/* to get age */}
            <div>
                <label>Age: </label>
                <input value={age} onChange={(e) => setAge(e.target.value)
                }/>
            </div>

                {/* to get sex */}
            <div>
                <label>Sex: </label>
                <select value={sex} onChange={(e) => setSex(e.target.value as 'male' | 'female')
                }>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>

            <button onClick={calculateBMI}>Calculate BMI & BMR</button>

            {bmi && (
                <p>
                Your BMI is: {bmi.toFixed(2)} ({getBMICategory()})
                </p>
            )}
            {bmr && 
                <p>
                Your BMR is: {bmr.toFixed(0)} kcal/day
                </p>
            }
        </div>
    );
};

export default BMIForm;