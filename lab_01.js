
// Q1: Addition Function
function addition(a, b) {
    return a + b;
}
console.log("Q1:", addition(5, 3));


// Q2: Bitwise Operations
function bitwiseAND(a, b) {
    return a & b;
}

function bitwiseOR(a, b) {
    return a | b;
}

function bitwiseXOR(a, b) {
    return a ^ b;
}

console.log("Q2 AND:", bitwiseAND(5, 3));
console.log("Q2 OR:", bitwiseOR(5, 3));
console.log("Q2 XOR:", bitwiseXOR(5, 3));


// Q3: Add Up Numbers
function addUp(a) {
    let sum = 0;

    for (let i = 1; i <= a; i++) {
        sum = sum + i;
    }

    return sum;
}
console.log("Q3:", addUp(4));


// Q4: Progress Bar
function progressBar(a) {
    let filled = Math.floor(a / 10);
    let empty = 10 - filled;

    return "#".repeat(filled) + "-".repeat(empty);
}
console.log("Q4:", progressBar(40));


// Q5: Minimum and Maximum
function minMax(arr) {
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    return [min, max];
}
console.log("Q5:", minMax([1, 2, 3, 4, 5, 6]));


// Q6: Repository Statistics
function calculateRepoStats(repos) {

    const stars = repos.map(repo => repo.stars);

    const maxStars = Math.max(...stars);
    const minStars = Math.min(...stars);

    const avgStars = Math.floor(
        stars.reduce((sum, value) => sum + value, 0) / stars.length
    );

    const varianceScore = Math.abs(maxStars - minStars);

    return {
        maxStars,
        minStars,
        avgStars,
        varianceScore
    };
}

const repos = [
    { name: 'repo-a', stars: 12 },
    { name: 'repo-b', stars: 45 },
    { name: 'repo-c', stars: 3 }
];

console.log("Q6:", calculateRepoStats(repos));


// Q7: Calculate Final Price
function calculateFinalPrice(basePrice, taxRate, discountPercentage) {

    let discountedPrice = basePrice * (1 - discountPercentage / 100);

    discountedPrice = Math.round(discountedPrice * 100) / 100;

    let tax = discountedPrice * (taxRate / 100);

    tax = Math.round(tax * 100) / 100;

    let finalPrice = discountedPrice + tax;

    finalPrice = Math.round(finalPrice * 100) / 100;

    let loyaltyPoints = Math.ceil(finalPrice);

    return {
        discountedPrice,
        tax,
        finalPrice,
        loyaltyPoints
    };
}

console.log("Q7:", calculateFinalPrice(1000, 10, 20));


// Q8: Pagination
function paginateData(items, pageNumber, pageSize = 5) {

    const totalPages = Math.ceil(items.length / pageSize);

    const startIndex = (pageNumber - 1) * pageSize;

    const endIndex = startIndex + pageSize;

    const data = items.slice(startIndex, endIndex);

    return {
        data: data,
        currentPage: pageNumber,
        totalPages: totalPages,
        hasNext: pageNumber < totalPages,
        hasPrev: pageNumber > 1
    };
}

const allProducts = [
    'Laptop',
    'Mouse',
    'Keyboard',
    'Monitor',
    'Desk',
    'Chair',
    'Webcam',
    'Headphones'
];

const result = paginateData(allProducts, 2, 3);

console.log("Q8:", result);
