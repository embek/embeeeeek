const fs = require('fs');
const path = require('path');

function getCharFrequency(str) {
    const freq = {};
    for (let char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    return freq;
}

function generateUniquePermutations(charFreq) {
    const result = new Set();
    
    function backtrack(current, remaining) {
        if (Object.values(remaining).every(count => count === 0)) {
            result.add(current);
            return;
        }
        
        for (let char in remaining) {
            if (remaining[char] > 0) {
                remaining[char]--;
                backtrack(current + char, remaining);
                remaining[char]++;
            }
        }
    }
    
    backtrack('', {...charFreq});
    return Array.from(result);
}

function writePermutationsToFile(word) {
    try {
        const charFreq = getCharFrequency(word);
        const permutations = generateUniquePermutations(charFreq).sort();
        let output = '';
        
        permutations.forEach((perm, index) => {
            output += `${index + 1}. ${perm}\n`;
        });
        
        const outputPath = path.join(__dirname, 'permutations.txt');
        fs.writeFileSync(outputPath, output);
        console.log(`Generated ${permutations.length} unique permutations for "${word}"`);
        console.log('Results have been written to:', outputPath);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Make sure we have a word to process
const word = process.argv[2] || 'australia';
if (!word) {
    console.log('Please provide a word as an argument');
    console.log('Usage: node wordPermutations.js <word>');
    process.exit(1);
}

writePermutationsToFile(word);
