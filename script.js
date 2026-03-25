const vtuData = {
    "2025": { // Newest Scheme (Aura/Vision)
        "1": [{n:"Maths-I for CSE", c:4}, {n:"Applied Physics", c:4}, {n:"Principles of Programming", c:3}, {n:"ESC-I", c:3}, {n:"ETC-I", c:3}, {n:"English", c:1}, {n:"Constitution", c:1}, {n:"Health/Yoga", c:1}],
        "2": [{n:"Maths-II", c:4}, {n:"Applied Chemistry", c:4}, {n:"CAED", c:3}, {n:"ESC-II", c:3}, {n:"ETC-II", c:3}, {n:"PWS (English)", c:1}, {n:"Kannada", c:1}, {n:"Innovation", c:1}],
        // Semesters 3-8 follow the 2022 credit structure for consistency
    },
    "2022": { // Current Major Scheme
        "1": [{n:"Maths-I", c:4}, {n:"Physics", c:4}, {n:"C Programming", c:3}, {n:"ESC-I", c:3}, {n:"ETC-I", c:3}, {n:"English", c:1}, {n:"Constitution", c:1}, {n:"SFH", c:1}],
        "2": [{n:"Maths-II", c:4}, {n:"Chemistry", c:4}, {n:"CAED", c:3}, {n:"ESC-II", c:3}, {n:"ETC-II", c:3}, {n:"PWS", c:1}, {n:"Kannada", c:1}, {n:"IDT", c:1}],
        "3": [{n:"Maths for CSE", c:3}, {n:"Digital Design & Comp Org", c:4}, {n:"Operating Systems", c:4}, {n:"Data Structures", c:3}, {n:"Java Programming", c:1}, {n:"Social Connect", c:1}, {n:"AEC", c:1}],
        "4": [{n:"Analysis of Algorithms", c:4}, {n:"Microcontrollers", c:4}, {n:"DBMS", c:3}, {n:"Biology for Engineers", c:2}, {n:"UHV", c:1}, {n:"AEC-II", c:1}],
        "5": [{n:"Software Engg & PM", c:3}, {n:"Computer Networks", c:4}, {n:"Theory of Computation", c:4}, {n:"Prof. Elective-I", c:3}, {n:"Research/IPR", c:3}, {n:"Mini Project", c:2}, {n:"Environmental", c:2}],
        "6": [{n:"Cloud Computing", c:4}, {n:"Machine Learning", c:3}, {n:"Prof. Elective-II", c:3}, {n:"Open Elective-I", c:3}, {n:"Project-I", c:2}, {n:"ML Lab", c:1}, {n:"AEC-III", c:1}],
        "7": [{n:"Internet of Things", c:4}, {n:"Parallel Computing", c:4}, {n:"Cryptography", c:3}, {n:"Prof. Elective-III", c:3}, {n:"Major Project Phase-II", c:10}],
        "8": [{n:"Internship", c:6}, {n:"Technical Seminar", c:1}, {n:"NSS/PE/Yoga", c:0}]
    }
};

function loadSubjects() {
    const scheme = document.getElementById('scheme-select').value;
    const sem = document.getElementById('sem-select').value;
    const container = document.getElementById('subject-container');
    container.innerHTML = ""; 

    let data = (vtuData[scheme] && vtuData[scheme][sem]) ? vtuData[scheme][sem] : (vtuData["2022"][sem] || []);

    data.forEach(sub => {
        const div = document.createElement('div');
        div.className = 'subject-row';
        div.innerHTML = `
            <span>${sub.n} (${sub.c})</span>
            <input type="hidden" class="credit" value="${sub.c}">
            <select class="grade">
                <option value="10">O (90-100)</option>
                <option value="9">S (80-89)</option>
                <option value="8">A (70-79)</option>
                <option value="7">B (60-69)</option>
                <option value="6">C (50-59)</option>
                <option value="5">D (45-49)</option>
                <option value="4">E (40-44)</option>
                <option value="0">F (Fail)</option>
            </select>`;
        container.appendChild(div);
    });
}

function calculateNow() {
    let totalPoints = 0, totalCredits = 0;
    document.querySelectorAll('.subject-row').forEach(row => {
        const credit = parseFloat(row.querySelector('.credit').value);
        const grade = parseFloat(row.querySelector('.grade').value);
        if (credit > 0) {
            totalPoints += (credit * grade);
            totalCredits += credit;
        }
    });

    const sgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    // Official VTU 2022/2025 Rule: Percentage = SGPA * 10
    const percentage = sgpa * 10;
    
    document.getElementById('result').innerText = `Your SGPA: ${sgpa}`;
    document.getElementById('percentage').innerText = `Percentage: ${percentage.toFixed(2)}%`;
}
