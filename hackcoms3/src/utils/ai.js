import axios from 'axios';
import courseData from './CoursesDataGCIS1.json'; // Ensure your JSON file path is correct

const API_KEY = '';

export default async function Query(userInput) {
  try {
    // Validate and structure userInput to avoid errors
    if (!userInput || !Array.isArray(userInput.interests)) {
      throw new Error('Invalid user input: interests must be an array.');
    }

    // Filter JSON data based on user input
    const filteredData = courseData.filter(course =>
      course.major === userInput.major ||
      (Array.isArray(course.tags) && userInput.interests.some(interest => course.tags.includes(interest)))
    );

    // Summarize the filtered data
    const summarizedData = filteredData.map(course => ({
      courseName: course.courseName,
      professor: course.professor,
      rating: course.rating, // Assuming rating exists
    }));

    // Limit data size to reduce token usage
    const limitedData = summarizedData.slice(0, 10);

    // Create the prompt for the API call
    const prompt = `
      User's input: ${JSON.stringify(userInput)}
      Relevant courses and professor data:
      ${JSON.stringify(limitedData)}
      Recommend required and optional courses based on this data.
    `;

    // Make the API call
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        }
      }
    );

    // Log and return the response
    console.log('Full response from AI:', response.data);
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.trim();
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error generating response:', error);
    return 'Error generating your response.';
  }
}
