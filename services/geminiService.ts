
import { GoogleGenAI, Type } from "@google/genai";
import type { Exercise } from '../types';

const fetchExercises = async (): Promise<Exercise[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING },
        title: {
          type: Type.OBJECT,
          properties: {
            vi: { type: Type.STRING },
            en: { type: Type.STRING },
          },
          required: ['vi', 'en'],
        },
        steps: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              vi: { type: Type.STRING },
              en: { type: Type.STRING },
            },
            required: ['vi', 'en'],
          },
        },
        icon: { type: Type.STRING, description: 'An icon name from this list: folder-plus, folder-minus, file-edit, word, excel, powerpoint, zip, unzip, shortcut, search, image-search, download' },
      },
      required: ['id', 'title', 'steps', 'icon'],
    },
  };

  const prompt = `
    Generate a comprehensive list of 100 interconnected basic computer skill exercises for beginners, designed as a continuous practice course.
    The exercises should simulate a real-world project, like preparing for a school report ("Dự Án Báo Cáo"). This ensures tasks are related (e.g., create a folder, then create documents inside it, then research online and save images/documents to that folder, then compress the final project folder). The exercises must be purely practical steps without any theory.

    Provide the response as a JSON array that strictly adheres to the provided schema.
    Each exercise must have a unique ID (e.g., 'task-001', 'task-002'), a title in both Vietnamese and English, a series of steps in both languages, and a relevant icon name.

    The topics should be structured progressively and cover:
    1.  **Project Setup (Approx. 10 tasks):**
        *   Creating a main project folder (e.g., "DuAnBaoCao").
        *   Creating subfolders inside it (e.g., "TaiLieuThamKhao", "HinhAnhMinhHoa", "SoLieu", "BanThao").
        *   Renaming, moving, and creating shortcuts.

    2.  **Document Creation & Management (Approx. 30 tasks):**
        *   Creating blank Word, Excel, and PowerPoint files in the appropriate subfolders.
        *   Renaming files to be more specific (e.g., from "New Document.docx" to "BaoCaoChinh.docx").
        *   Creating copies of files for versioning (e.g., "BaoCaoChinh_v1.docx").
        *   Moving files between subfolders.
        *   Deleting and restoring files.

    3.  **Web Research & Downloading (Approx. 30 tasks):**
        *   Searching Google for specific information (e.g., "tác động của biến đổi khí hậu").
        *   Finding, downloading, and renaming relevant images into the "HinhAnhMinhHoa" folder.
        *   Searching for and downloading PDF documents into the "TaiLieuThamKhao" folder.

    4.  **File Archiving & Cleanup (Approx. 20 tasks):**
        *   Compressing the "HinhAnhMinhHoa" folder.
        *   Compressing the entire "DuAnBaoCao" project folder.
        *   Creating a new folder, moving the zip file into it, and then extracting the contents to verify.

    5.  **Review & Advanced Practice (Approx. 10 tasks):**
        *   Searching for specific files within the project folder using Windows search (e.g., find all '.xlsx' files).
        *   Exercises combining multiple steps (e.g., "Find the 'SoLieu.xlsx' file, create a copy, and move the copy to the 'BanThao' folder.").
        *   Final cleanup: deleting the entire project structure.

    Ensure the icon names are only chosen from the provided list in the schema description.
    The response must be a valid JSON array of exactly 100 exercise objects.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const exercises = JSON.parse(jsonText);
    return exercises as Exercise[];
  } catch (error) {
    console.error("Error fetching exercises from Gemini API:", error);
    // You could potentially return a static list of exercises as a fallback here
    // For now, we re-throw to let the UI handle the error display.
    throw error;
  }
};

export { fetchExercises };
