const axios = require('axios');

const PERSPECTIVE_API_KEY = process.env.PERSPECTIVE_API_KEY;
const PERSPECTIVE_ENDPOINT = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${PERSPECTIVE_API_KEY}`;
const TOXICITY_THRESHOLD = 0.67; // Tolerence level

/**
 * Send content to Perspective API for analysis
 * @param {string} text - tthe content(post/comment) to analyze.
 * @returns {object} TOXICITY - Analysis results.
 */


exports.analyzeRequest = async (text) => {
    const data = {
        'comment': {
            'text': text,
        },
        'requestedAttributes': {
            // Primary Toxicity score
            'TOXICITY': {}
        },
        'languages': ['en'],
        'doNotStore': true // Tells Google not to store the text
    };

    try {
        const response = await axios.post(PERSPECTIVE_ENDPOINT, data);
        return response.data;
    } catch (error) {
        console.error('Perspective API Error:', error.response ? error.response.data : error.message);
        // Important: If the API fails, we should still allow the post, but log the failure.
        // For a strict MVP, you might block it, but failing open is safer than failing closed.
        return null;
    }
};


/**
 * Check if the content exceeds predefined Toxicity treshold.
 * @param {string} content - The Test to check
 * @returns {object} - { isToxic: Bolean, score: number }
 */
exports.checkToxicity = async(content) => {
    if(!content || content.trim().length === 0) {
        return{ isToxic: false, score: 0 };
    }

    const analysis = await exports.analyzeRequest(content);

    if (!analysis) {
        // if API fails, treat as non-toxic for now
        return { isToxic: false, score: 0 };
    }

    const toxicityScore = analysis.attributeScores.TOXICITY.summaryScore.value;

    return {
        isToxic: toxicityScore >= TOXICITY_THRESHOLD,
        score: toxicityScore
    };
};