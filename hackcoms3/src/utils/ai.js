import axios from 'axios';
import courseData from './cleaned_course_data.json';
import professorData from './professors_data.json';
import requiredCourses from './CSRequiredCourses.json';

console.log('API Key:', process.env.REACT_APP_API_KEY);

const API_KEY = process.env.REACT_APP_API_KEY;

export default async function Query(userInput) {
  try {
    // Convert JSON data to strings and limit each to the first 100 entries
    const courseDataString = JSON.stringify(courseData.slice(0, 200));
    const professorDataString = JSON.stringify(professorData.slice(0, 200));
    const requiredCoursesString = JSON.stringify(Object.entries(requiredCourses).slice(0, 400));
    console.log(userInput)
    // Construct the master prompt for the AI
    const prompt = `
      You are an intelligent system tasked with recommending university courses based on student input, course data, required course structure, and professor ratings.
      
      Here are the details:
      - User's input: Major: ${userInput.major}, Courses the user has already taken: ${userInput.courses.join(', ')}, Interests: ${userInput.interests.join(', ')}, Grade: ${userInput.grade}
      
      Required courses data:
      ${requiredCoursesString}
      
      Course data with professors:
      ${courseDataString}
      
      Professor ratings:
      ${professorDataString}
      
      Instructions:
      1. Identify the required courses for the user's year and major.
      2. Display these required courses the user needs to take next and check that you dont put courses that the user has already taken by looking at the user input, sorted in descending order by the professor's rating. Format: "[Course Code] - Professor: [Name] - Rating: [Rating]".
      3. Identify additional recommended courses based on the user's interests and major. Display them in a similar format.
      
      Return the recommended and required courses lists, formatted as specified like this for example:

      {"CS 242": "Michael Floeser", "Physics 102":"Walter Wolf", "Chemistry 303":"Peter Willis"}}
    `;

    // Call the GPT API with the prompt
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000, // Adjust based on the reduced data size
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    // Extract and return the response
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
