function calculateCGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    
    // Get all rows of credits and grades
    const rows = document.querySelectorAll('.subject-row');
    
    rows.forEach(row => {
        const credit = parseFloat(row.querySelector('.credit').value);
        const grade = parseFloat(row.querySelector('.grade').value);
        
        if (!isNaN(credit) && !isNaN(grade)) {
            totalPoints += (credit * grade);
            totalCredits += credit;
        }
    });

    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('result').innerText = `Your SGPA: ${sgpa}`;
    
    // VTU Formula: (SGPA - 0.75) * 10
    const percentage = sgpa > 0 ? ((sgpa - 0.75) * 10).toFixed(2) : 0;
    document.getElementById('percentage').innerText = `Percentage: ${percentage}%`;
}
