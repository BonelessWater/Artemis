import os
import openai
from dotenv import load_dotenv
import PyPDF2
import concurrent.futures

# Wifi OFF dependencies
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

load_dotenv()

class Model:
    def __init__(self, wifi=True):
        self.wifi = wifi
        self.files = [
            "Data/Emergency Plan Templates/Basic Emergency Plan.pdf",
            "Data/First Aid/Where-There-is-No-Dentist.pdf",
            "Data/First Aid/Where-There-is-no-Doctor-a-Village-Health-Care-Handbook.pdf",
            "Data/Nuclear and Radiation Resources/Build-a-Protective-Fallout-Shelter.pdf",
            "Data/Nuclear and Radiation Resources/Family-Shelter-Designs-DOD-Civil-Defense.pdf",
            "Data/Nuclear and Radiation Resources/Nuclear-War-Survival-Skills-Cresson-Kearny.pdf",
            "Data/Nuclear and Radiation Resources/Planning-Guidance-for-Response-to-Nuclear-Detonation-May-2022-FEMA.pdf",
            "Data/Preparedness Manuals/Be Prepared Estonia Crisis Guide Paasteamet ERB.pdf",
            "Data/Preparedness Manuals/FEMA Citizen Preparedness Guide.pdf",
            "Data/Preparedness Manuals/LDS-Preparedness-Manual.pdf",
            "Data/Preparedness Manuals/Norway One Week Preparedness Guide.pdf",
            "Data/Quick Reference Pages/Military-Phonetic-Alphabet.pdf",
            "Data/Quick Reference Pages/Universal-Edibility-Test-for-Survival.pdf",
            "Data/Survival Checklists/Bug Out Bag Checklist 2 Page 2024.pdf",
            "Data/Survival Checklists/Bug Out Vehicle Checklist.pdf",
            "Data/Survival Checklists/Car Survival Kit Checklist.pdf",
            "Data/Survival Checklists/Dog Bug Out Bag Checklist.pdf",
            "Data/Survival Checklists/Everyday Carry Checklist 2 Page.pdf",
            "Data/Survival Checklists/Flood Survival Kit Checklist.pdf",
            "Data/Survival Checklists/Get Home Bag Checklist 2 Page.pdf",
            "Data/Survival Checklists/Home Survival Kit Checklist 2 Page.pdf",
            "Data/Survival Checklists/INCH Bag Checklist 2 Page.pdf",
            "Data/Survival Checklists/Kids Bug Out Bag Checklist.pdf",
            "Data/Survival Checklists/Nuclear Survival Kit Checklist.pdf",
            "Data/Survival Checklists/SCARE Bag Checklist.pdf",
            "Data/Survival Checklists/Survival First Aid Kit Checklist.pdf",
            "Data/Survival Checklists/Survival Food Checklist.pdf",
            "Data/Survival Manuals/Canadian Military Fieldcraft.pdf",
            "Data/Survival Manuals/CIA RDP78 Introdution to Survival.pdf",
            "Data/Survival Manuals/Down-But-Not-Out-Canadian-Survival-Manual.pdf",
            "Data/Survival Skills/Canadian Military Basic Cold Weather Training.pdf",
            "Data/Survival Skills/Deadfalls-and-Snares.pdf",
            "Data/Survival Skills/Paleo-Pocalypse.pdf",
            "Data/Survival Skills/Shelters-Shacks-and-Shanties.pdf",
            "Data/Threat Guidance/DTRA Collateral Damage to Satellites from an EMP Attack.pdf",
            "Data/Threat Guidance/Nuclear-Winter-The-Anthropology-of-Human-Survival.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-20-3-Camouflage-Concealment-and-Decoys.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-21-10 Field Hygiene and Sanitation.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-3-06-Urban-Operations-FM-90-10-US-Army.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-3-25-150 Combatives.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-3-25-26 Map Reading and Land Navigation.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-3-3-1-Nuclear Contamination Avoidance.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-3-4 NBC Protection.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-3-5 NBC Decontamination.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-4-25-11-First_Aid.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FM-5-103-Survivability.pdf",
            "Data/US Military Manuals/Military Skill Manuals/FMFRP 12-80 USMC Kill or Get Killed.pdf",
            "Data/US Military Manuals/Military Skill Manuals/MA 1.02 USMC Fundamentals of Martial Arts.pdf",
            "Data/US Military Manuals/Military Skill Manuals/ST-31-91B-US-Army-Special-Forces-Medical-Handbook.pdf",
            "Data/US Military Manuals/Military Skill Manuals/STP-21-1-Army Warrior Skills Level 1 Soldiers Manual of Common Tasks.pdf",
            "Data/US Military Manuals/Military Skill Manuals/STP-21-24-Army Warrior Leader Skills Level 2, 3, and 4.pdf",
            "Data/US Military Manuals/Military Skill Manuals/TM-31-210-Improvised-Munitions-Handbook.pdf",
            "Data/US Military Manuals/Military Survival Guides/FM-21-76-1-Survival-Evasion-and-Recovery-Multiservice-Procedures.pdf",
            "Data/US Military Manuals/Military Survival Guides/FM-21-76-US-Army-Survival-Manual.pdf",
            "Data/US Military Manuals/Military Survival Guides/FM-31-70-Basic-Cold-Weather-Manual.pdf",
            "Data/US Military Manuals/Military Survival Guides/USMC Summer Survival Course Handbook.pdf",
            "Data/US Military Manuals/Military Survival Guides/USMC Winter Survival Course Handbook.pdf"
        ]

    def connect(self, prompt):
        if self.wifi:
            openai_api_key = os.getenv("API_KEY")
            if not openai_api_key:
                raise ValueError("API_KEY not found in environment variables.")
            openai.api_key = openai_api_key

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.0
            )
            return response.choices[0].message.content
        else:
            model_path = r"DeepSeek-R1-Distill-Qwen-1.5B"
            tokenizer = AutoTokenizer.from_pretrained(model_path)
            model = AutoModelForCausalLM.from_pretrained(model_path)
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            model.to(device)
            inputs = tokenizer(prompt, return_tensors="pt").to(device)
            outputs = model.generate(**inputs, max_length=150)
            return tokenizer.decode(outputs[0], skip_special_tokens=True)

    def extract_text_from_pdf(self, filepath):
        text = ""
        try:
            with open(filepath, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                num_pages = len(reader.pages)
                # If PDF exceeds 10 pages, skip extraction and return empty text.
                if num_pages > 10:
                    return ""
                for page in reader.pages:
                    page_text = page.extract_text() or ""
                    text += page_text
        except Exception as e:
            pass
        return text

    def get_file_content(self, chosen_file):
        if chosen_file.lower().endswith(".pdf"):
            return self.extract_text_from_pdf(chosen_file)
        else:
            try:
                with open(chosen_file, 'r', encoding='utf-8') as f:
                    return f.read()
            except Exception as e:
                return ""

    def get_topic(self, user_prompt):
        files_text = "\n".join(self.files)
        prompt = (
            "You are given a list of file paths (relative to the current directory) for documents about survival, emergency, "
            "and military procedures. Based on the user's request below, select the file that is most likely to contain the "
            "information needed. If none of the files are relevant, respond with 'NONE'. Respond with only the relative file path or NONE.\n\n"
            f"User Request: {user_prompt}\n\n"
            f"Available Files:\n{files_text}"
        )
        chosen_file = self.connect(prompt)
        return chosen_file.strip()

    def summarize_chunk(self, chunk, user_prompt):
        prompt = (
            "Summarize the following text only if it is relevant to the user's request. "
            "If not, return an empty response.\n\n"
            f"User Request: {user_prompt}\n\n"
            f"Text:\n{chunk}"
        )
        summary = self.connect(prompt)
        return summary.strip()

    def split_text_into_chunks(self, text, chunk_size=500):
        words = text.split()
        chunks = []
        for i in range(0, len(words), chunk_size):
            chunk = " ".join(words[i:i+chunk_size])
            chunks.append(chunk)
        return chunks

    def recursive_summarize(self, text, user_prompt, max_words=500):
        if len(text.split()) <= max_words:
            return text

        chunks = self.split_text_into_chunks(text, chunk_size=max_words)
        summaries = []

        if self.wifi:
            with concurrent.futures.ThreadPoolExecutor() as executor:
                futures = [executor.submit(self.summarize_chunk, chunk, user_prompt) for chunk in chunks]
                for future in concurrent.futures.as_completed(futures):
                    result = future.result().strip()
                    if result:
                        summaries.append(result)
        else:
            for chunk in chunks:
                result = self.summarize_chunk(chunk, user_prompt).strip()
                if result:
                    summaries.append(result)

        combined_summary = " ".join(summaries)
        if len(combined_summary.split()) > max_words:
            return self.recursive_summarize(combined_summary, user_prompt, max_words)
        else:
            return combined_summary

    def reply(self, user_prompt):
        chosen_file = self.get_topic(user_prompt)

        file_content = ""
        if chosen_file and chosen_file.upper() != "NONE" and os.path.exists(chosen_file):
            file_content = self.get_file_content(chosen_file)

        if file_content and len(file_content.split()) > 500:
            file_content = self.recursive_summarize(file_content, user_prompt, max_words=500)

        if file_content:
            final_prompt = (
                "You are provided with the content of a file containing detailed information relevant to survival, emergency, "
                "or military topics. Using the file content below along with the user's original request, generate a detailed and helpful answer.\n\n"
                f"File Content:\n{file_content}\n\n"
                f"User Request: {user_prompt}"
            )
        else:
            final_prompt = (
                "No additional file context was found that is relevant. Please generate a detailed answer based solely on the following request.\n\n"
                f"User Request: {user_prompt}"
            )
        final_response = self.connect(final_prompt)
        return final_response.strip()


if __name__ == "__main__":
    user_prompt = input("Enter your survivalist/hiking question: ")
    model = Model(wifi=True)
    answer = model.reply(user_prompt)
    print("\nFinal Answer:\n")
    print(answer)
